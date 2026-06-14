#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const modelPath = path.join(__dirname, 'scorecard', 'law-firm-ops-readiness.json')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

export function scoreResponses(model, responseDoc) {
  const categoryScores = model.categories.map((category) => {
    const values = responseDoc.responses?.[category.id]
    if (!Array.isArray(values)) {
      throw new Error(`Missing response array for category: ${category.id}`)
    }
    if (values.length !== category.questions.length) {
      throw new Error(
        `Category ${category.id} expected ${category.questions.length} responses, received ${values.length}`,
      )
    }

    const actual = values.reduce((sum, value, index) => {
      if (!Number.isInteger(value) || value < 0 || value > 3) {
        throw new Error(`Invalid score for ${category.id}[${index}]: expected integer 0-3`)
      }
      return sum + value
    }, 0)
    const possible = category.questions.length * 3
    const percent = Math.round((actual / possible) * 100)

    return {
      id: category.id,
      title: category.title,
      actual,
      possible,
      percent,
    }
  })

  const actual = categoryScores.reduce((sum, item) => sum + item.actual, 0)
  const possible = categoryScores.reduce((sum, item) => sum + item.possible, 0)
  const percent = Math.round((actual / possible) * 100)
  const band = model.bands.find((item) => percent >= item.minPercent && percent <= item.maxPercent)
  const weakestCategory = [...categoryScores].sort((a, b) => a.percent - b.percent)[0]

  return {
    firm: responseDoc.firm ?? 'Unnamed firm',
    actual,
    possible,
    percent,
    band,
    weakestCategory,
    categories: categoryScores,
  }
}

function printReport(result) {
  console.log(`Law Firm Ops Readiness Score for ${result.firm}`)
  console.log(`${result.actual}/${result.possible} (${result.percent}%) — ${result.band.label}`)
  console.log('')
  console.log(result.band.guidance)
  console.log('')
  console.log(`Next focus area: ${result.weakestCategory.title} (${result.weakestCategory.percent}%)`)
  console.log('')
  console.log('Category scores:')
  for (const category of result.categories) {
    console.log(`- ${category.title}: ${category.actual}/${category.possible} (${category.percent}%)`)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const responsePath = process.argv[2]
  if (!responsePath) {
    console.error('Usage: node score.mjs examples/sample-response.json')
    process.exit(1)
  }

  const model = readJson(modelPath)
  const responseDoc = readJson(path.resolve(responsePath))
  const result = scoreResponses(model, responseDoc)
  printReport(result)
}
