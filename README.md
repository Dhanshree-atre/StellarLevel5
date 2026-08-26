<<<<<<< HEAD
# Veilmark

Private proof, public confidence. Veilmark is a Midnight Network / Compact dApp concept for proving an eligibility claim without exposing the private information behind it.

## Current status

This repository is a Level 5 project foundation created from an empty workspace. The responsive product UI, onboarding flow, privacy explanation, transaction state model, documentation structure, and environment boundary are ready. Live Lace/Preprod integration and all real-world evidence remain pending and are never fabricated in this repository.

## Product

Veilmark gives a user a simple flow: understand a private claim, connect Lace, submit a Compact-backed proof, and review a public verification receipt. The UI distinguishes public proof results from private user context.

## Why Midnight?

Midnight is intended for applications where a useful result can be verified without publishing the sensitive inputs used to produce it. Compact contract logic is the intended source of truth for the proof.

## Architecture

```text
User -> React/Vite frontend -> Lace Wallet -> Midnight Preprod -> Compact contract -> Private/Public state
```

The integration boundary is `src/midnight.ts`. Add the real Midnight SDK adapter and generated Compact bindings there, then set `VITE_CONTRACT_ADDRESS` in a local environment file.

## Included UX

- Lace connection, connected, and disconnect states
- Transaction pending, success, error, and retry states
- Eight-step onboarding guidance condensed into an in-product flow
- Public/private/contract privacy explanation
- Responsive desktop and mobile layouts
- Honest empty states for missing configuration

## User feedback

Create a Google Form containing name, email, Lace wallet address, connection success, feature success, transaction completion, 1-5 rating, ease of use, likes, problems, requested features, and additional feedback. Set its URL in `VITE_FEEDBACK_FORM_URL`.

Only after real responses exist:

- Export a privacy-safe workbook to `docs/user-feedback.xlsx`.
- Calculate real results in `docs/feedback-analysis.md`.
- Store explorer links and screenshots in `docs/analytics/`.
- Record each implemented improvement with a real commit link.

## Growth strategy

Acquire early testers through Midnight developer communities, university blockchain groups, workshops, hackathons, and product demonstrations. Retain users with saved proof history, clearer reusable claim templates, and transparent status receipts. Encourage community growth through referral invitations and public, verifiable proof results. These are planned acquisition channels, not claimed partnerships.

## Roadmap

1. **Foundation:** React/Vite UI, Compact integration boundary, Preprod configuration, and onboarding.
2. **Validation:** Real Lace integration, user testing, feedback collection, analytics, and error hardening.
3. **Expansion:** More private claim types, reusable proofs, accessibility polish, and ecosystem integrations.
4. **Readiness:** Mainnet review, operational monitoring, security review, and a larger user base.

## Pitch deck and demo

The 12-slide outline is in `docs/pitch-deck/README.md`. Record the actual deployed flow, including a real Lace connection and real Preprod transaction, before adding a demo URL here. Do not publish a fake transaction or placeholder as completed evidence.

## Environment variables

Copy `.env.example` to `.env.local` and provide the real values:

```text
VITE_NETWORK=preprod
VITE_CONTRACT_ADDRESS=
VITE_FEEDBACK_FORM_URL=
VITE_LIVE_APP_URL=
VITE_DEMO_VIDEO_URL=
```

Never place private keys, seeds, or mnemonics in environment files committed to Git.

## Local development

```bash
npm install
npm run dev
```

## Build and test

```bash
npm run build
npm test
```

The current workspace could not run npm during scaffolding because the local npm invocation was canceled. Re-run the commands once Node/npm is available.

## Level 5 evidence checklist

| Requirement | Status | Evidence / remaining action |
|---|---|---|
| Midnight/Compact application | Foundation | Add the real Compact source and generated bindings under `contracts/`. |
| Lace and Preprod | Pending | Implement the adapter in `src/midnight.ts` and configure the contract address. |
| 50+ real users | Pending | Onboard real testnet users; do not fabricate records. |
| Real transactions and analytics | Pending | Capture explorer evidence under `docs/analytics/`. |
| Google Form and dataset | Pending | Create the form, collect responses, anonymize, and export `docs/user-feedback.xlsx`. |
| Feedback analysis | Pending | Populate `docs/feedback-analysis.md` from the real export. |
| Feedback-based commits | Pending | Link actual commits after measured issues lead to fixes. |
| Pitch deck | Outline ready | Complete slides with verified metrics and screenshots. |
| Demo video | Pending | Record the deployed app with a real transaction. |
| Public deployment | Pending | Deploy after live integration and validation. |
| 20+ meaningful commits | Pending | Build history through actual incremental work; never pad commit count. |
