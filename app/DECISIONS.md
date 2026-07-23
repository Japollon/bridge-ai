# Architecture Decision Log

## ADR-001 — Keep Next.js App Router
Continue using the existing framework because it is functional and changing frameworks would not solve the current coupling.

## ADR-002 — Preserve TypeScript Strict Mode
Strict typing remains required for shared contracts, persistence, and structured AI data.

## ADR-003 — Keep localStorage Temporarily
Use localStorage during the engineering-foundation sprint, but isolate it behind a typed persistence interface.

## ADR-004 — No Database During Engineering Foundation
Fix contracts, validation, state separation, persistence abstraction, and tests before adding a database.

## ADR-005 — Refactor ChatPage Before Adding Major State
Do not add full Conversation Memory directly to the current large page controller.

## ADR-006 — Shared Runtime-Validated API Contracts
Client and server must use one shared contract, and AI output must be validated at runtime.

## ADR-007 — Keep AI Provider Access Server-Side
The OpenAI key and provider calls remain server-side for security and control.

## ADR-008 — Isolated Task Scope
Agents must not refactor unrelated code while completing a focused task.

## ADR-009 — Focused Agent Tasks
Assignments should be small, reviewable, and recoverable because long Codex tasks experienced repeated transport disconnections.
