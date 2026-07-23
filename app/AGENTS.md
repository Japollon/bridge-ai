<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# BridgeAI Engineering Rules

## Required Reading
Before editing, read `PROJECT.md`, `ARCHITECTURE.md`, `SPRINT.md`, the relevant task in `TASKS.md`, `DECISIONS.md`, and the applicable installed Next.js 16 documentation. Inspect the actual files and run `git status --short`.

## Architecture Boundaries
- Keep `app/chat/page.tsx` as composition/orchestration.
- Prefer hooks, reducers, utilities, services, domain modules, and persistence adapters for new logic.
- Use one shared API contract across client and server.
- Keep OpenAI access server-side.
- Isolate localStorage behind a typed persistence interface.
- Do not duplicate domain contracts in UI components.

## Coding Standards
- Keep modules small and focused.
- Prefer composition over expanding large files.
- Avoid hidden side effects and unrelated formatting.
- Preserve existing user-visible behavior unless the task says otherwise.
- Do not perform broad cleanup during an isolated task.

## TypeScript Rules
- Preserve strict mode.
- Avoid `any`; justify unavoidable uses.
- Do not replace runtime validation with type assertions.
- Do not duplicate shared data shapes.
- Do not weaken compiler settings.

## React and Next.js Rules
- Verify whether a file truly needs `"use client"`.
- Keep state close to its owner.
- Avoid adding unrelated state directly to `app/chat/page.tsx`.
- Guard browser-only APIs against hydration problems.
- Follow installed Next.js 16 guidance.
- Do not silently change rendering, caching, or route behavior.

## Security and Privacy
- Never expose `OPENAI_API_KEY` to client code.
- Never print secrets in logs, tests, fixtures, output, or docs.
- Do not log private conversations or case details.
- Treat localStorage as sensitive.
- Validate untrusted requests and AI responses.
- Do not add analytics, telemetry, or new data providers without approval.

## Dependency Policy
Do not install, update, or remove dependencies without explicit approval. Explain the problem, benefits, costs, risks, and no-new-dependency alternative before recommending one.

## Validation Requirements
Before claiming completion:
1. Run TypeScript without emitting files.
2. Run ESLint.
3. Run relevant tests.
4. Run a production build when allowed.
5. Review `git diff` and `git status --short`.

Report commands, results, existing failures, introduced failures, and anything not run.

## Git and Scope Rules
- Do not commit or push unless explicitly requested.
- Do not modify unrelated files.
- Do not rewrite history, force push, discard user changes, or run destructive Git commands without approval.
- Keep every task easy to review and roll back.

## API Contract Rules
Do not silently change request or response contracts. Contract changes require shared type, validation, client, documentation, and test updates.

## Definition of Done
A task is complete only when behavior works, architecture rules are followed, TypeScript and ESLint pass, relevant tests pass, no secrets are exposed, no unrelated files changed, and architecture/contract documentation is current.

## Parallel Agent Rules
- Assign non-overlapping files whenever possible.
- One agent owns conflict-prone files at a time.
- Freeze shared interfaces before parallel implementation.
- State allowed and forbidden files in each task.
- Do not merge broad refactors simultaneously.

Conflict-prone files include `app/chat/page.tsx`, `app/api/chat/route.ts`, `package.json`, `package-lock.json`, shared contracts, `AGENTS.md`, and `ARCHITECTURE.md`.

## Prohibited Without Approval
- Installing dependencies
- Adding a database or authentication
- Changing AI providers or models
- Exposing secrets
- Logging private conversations
- Modifying unrelated code
- Committing or pushing
- Deleting stored user data
- Changing the API contract
- Adding a state-management framework
- Rewriting the UI
- Performing large cleanup refactors

## Task Report Format
Before implementation: goal, approach, expected files, risks, validation plan.

After implementation: files changed, summary, commands and results, remaining risks, recommended next task.
