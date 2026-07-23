# Current Sprint

## Name
Engineering Foundation and Conversation Memory Preparation

## Status
In progress

## Goals
1. Establish reliable engineering documentation.
2. Resolve existing ESLint errors and warnings.
3. Extract shared TypeScript contracts.
4. Add runtime validation for the chat API.
5. Refactor `app/chat/page.tsx` before adding more state.
6. Design persistent Conversation Memory.
7. Add a small automated-test foundation.

## Definition of Done
- `npm run lint` passes.
- TypeScript passes without emitting files.
- Client and server use one shared API contract.
- AI output is runtime-validated on the server.
- `app/chat/page.tsx` is primarily orchestration.
- localStorage logic is isolated behind a typed interface.
- Conversation Memory has a documented schema and merge strategy.
- Existing user-visible behavior still works.
- No unrelated refactors are included.

## Risks
- State refactoring can break hydration or persistence.
- Contract changes can break the chat UI.
- Parallel agents can conflict in the main page.
- Existing localStorage data may not match future schemas.

## Deferred
Database, authentication, multiple saved conversations, document uploads, production deployment, expanded resource search, analytics, multi-model orchestration, and end-user-visible agents.
