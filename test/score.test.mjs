import assert from 'node:assert/strict'
import fs from 'node:fs'
import { scoreResponses } from '../score.mjs'

const model = JSON.parse(fs.readFileSync(new URL('../scorecard/law-firm-ops-readiness.json', import.meta.url), 'utf8'))
const sample = JSON.parse(fs.readFileSync(new URL('../examples/sample-response.json', import.meta.url), 'utf8'))

const result = scoreResponses(model, sample)

assert.equal(result.firm, 'Sample PI Firm')
assert.equal(result.actual, 43)
assert.equal(result.possible, 96)
assert.equal(result.percent, 45)
assert.equal(result.band.label, 'Automation candidate')
assert.equal(result.weakestCategory.id, 'ai_supervision')
assert.equal(result.categories.length, 8)

assert.throws(
  () => scoreResponses(model, { responses: { ...sample.responses, ai_supervision: [4, 1, 0, 1] } }),
  /expected integer 0-3/,
)

console.log('score.test.mjs passed')
