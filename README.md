# Law Firm Ops Readiness Scorecard

Maintained by [FirmOps](https://firmops.io/), this public scorecard helps law firm owners and operators evaluate whether their operations are ready for supervised automation, connected systems, and AI-agent workflows.

The scorecard is intentionally generic and public-safe. It does not include private client data, law-firm case details, internal prompts, credentials, or proprietary implementation code.

## What it measures

The model scores eight operational areas:

1. Intake & case launch
2. Case management, technology & integrations
3. AI supervision & agent readiness
4. Client communication
5. Documents & e-signature
6. Finance, billing & trust operations
7. Staffing, SOPs & accountability
8. Reporting & KPIs

Each question is scored from `0` to `3`:

- `0`: Not in place
- `1`: Ad hoc / inconsistent
- `2`: Documented but not fully measured
- `3`: Reliable, owned, measured, and improvable

## Quick start

Run the sample score with Node 18+:

```bash
node score.mjs examples/sample-response.json
```

Expected output shape:

```text
Law Firm Ops Readiness Score for Sample PI Firm
43/96 (45%) — Automation candidate

Pick one read-only visibility workflow first, then add supervised write actions after approval rules are clear.

Next focus area: AI Supervision & Agent Readiness (25%)
```

## Use the JSON model manually

The scoring model lives at:

```text
scorecard/law-firm-ops-readiness.json
```

A firm can use it without code:

1. Review each category.
2. Score every question from `0` to `3`.
3. Add the scores for each category.
4. Divide by the maximum possible score to find the readiness percentage.
5. Start with the weakest category before adding more automation.

## Readiness bands

- `0–39%`: Fragile operations — document ownership and make the current queue visible first.
- `40–69%`: Automation candidate — start with read-only visibility, then supervised write actions.
- `70–100%`: Agent-OS ready — the firm likely has enough ownership, source data, and review discipline to pilot supervised AI-agent workflows safely.

## Safety principles

This project assumes law-firm automation should start with guardrails:

- Read before write.
- Cite the source system behind recommendations.
- Require human approval before external messages or system-of-record updates.
- Keep attorney judgment, confidentiality, and trust-sensitive actions out of unsupervised automation.

## Repository status

This is a lightweight open-source template and scoring utility. It is not legal advice and is not a substitute for professional judgment, ethics review, security review, or jurisdiction-specific compliance work.

## License

MIT
