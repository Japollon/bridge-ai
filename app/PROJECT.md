# BridgeAI

## Mission
BridgeAI helps people facing difficult life situations understand their options, organize their case, identify next steps, and create an actionable Bridge Plan.

## Current Stage
BridgeAI is a working MVP built with Next.js, React, TypeScript, Tailwind CSS, the OpenAI API, browser localStorage, and client-side PDF generation.

## Current Capabilities
- Landing page and chat experience
- Structured AI responses
- Live case-file sidebar
- Needs and next-step tracking
- Persistent checklist
- Resource cards and urgency handling
- Bridge Plan generation and PDF download
- Browser-local conversation persistence

## Product Principles
1. Clarity over complexity.
2. Action over generic advice.
3. Safety over engagement.
4. Transparency over artificial confidence.
5. Privacy by default.
6. Human control.
7. Maintainability over shortcuts.

## Near-Term Roadmap
1. Establish engineering standards and project documentation.
2. Fix current ESLint errors and warnings.
3. Extract shared TypeScript contracts.
4. Add runtime validation to AI responses.
5. Refactor chat state and persistence out of `app/chat/page.tsx`.
6. Introduce a Conversation Memory domain model.
7. Add automated tests.
8. Prepare for database-backed persistence and authentication.

## Longer-Term Roadmap
- Multiple saved conversations
- User authentication
- Database-backed case files
- Secure document uploads
- Case timeline and auto-generated summaries
- Verified, location-aware resource search
- Application tracking
- Admin tools, analytics, observability, and deployment

## Current Sprint Non-Goals
- Adding a database or authentication
- Rebuilding the UI
- Adding multiple AI providers
- Adding autonomous agents to the end-user product
- Implementing document uploads
- Deploying to production
