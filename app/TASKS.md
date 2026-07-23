# BridgeAI Task Queue

## TASK-001 — Engineering Documentation System
**Status:** In Progress  
**Priority:** Critical  
**Dependencies:** None  
**Files:** `PROJECT.md`, `ARCHITECTURE.md`, `SPRINT.md`, `TASKS.md`, `DECISIONS.md`, `AGENTS.md`  
**Parallel:** No

Done when all documents exist, distinguish current from target architecture, preserve the Next.js warning, and change no production code.

## TASK-002 — Existing Lint Cleanup
**Status:** Planned  
**Priority:** Critical  
**Dependencies:** TASK-001  
**Files:** Primarily `app/chat/page.tsx`  
**Parallel:** No

Done when ESLint and TypeScript pass with no user-visible behavior changes.

## TASK-003 — Shared Contract Extraction
**Status:** Planned  
**Priority:** Critical  
**Dependencies:** TASK-002  
**Files:** New shared contract module, route, chat page, related components  
**Parallel:** Limited

Done when request, response, checklist, urgency, resource-group, and case-file shapes have one shared definition.

## TASK-004 — Runtime API Validation
**Status:** Planned  
**Priority:** Critical  
**Dependencies:** TASK-003  
**Files:** Validation module and `app/api/chat/route.ts`  
**Parallel:** Yes after the contract is frozen

Done when incoming requests and AI responses are runtime-validated and invalid output is handled safely.

## TASK-005 — Chat State Refactor
**Status:** Planned  
**Priority:** High  
**Dependencies:** TASK-002, TASK-003  
**Files:** `app/chat/page.tsx`, new hook/reducer modules  
**Parallel:** No

Done when the page becomes primarily composition and orchestration while refresh/reset behavior remains intact.

## TASK-006 — Persistence Abstraction
**Status:** Planned  
**Priority:** High  
**Dependencies:** TASK-005  
**Files:** New storage module and chat hook  
**Parallel:** Yes after state interfaces are stable

Done when localStorage keys, parsing, versioning, corruption, and quota handling are centralized.

## TASK-007 — Conversation Memory Domain Model
**Status:** Planned  
**Priority:** High  
**Dependencies:** TASK-003  
**Files:** New domain types, merge utility, tests  
**Parallel:** Yes

Done when memory schema and deterministic merge/correction rules are defined and tested.

## TASK-008 — Conversation Memory Implementation
**Status:** Blocked  
**Priority:** High  
**Dependencies:** TASK-004, TASK-005, TASK-006, TASK-007  
**Files:** API, hook, storage, sidebar  
**Parallel:** Split only after interfaces are frozen

Done when facts persist across turns and refresh, corrections override old facts, and failures do not destroy the conversation.

## TASK-009 — Automated Test Foundation
**Status:** Planned  
**Priority:** High  
**Dependencies:** TASK-003  
**Files:** Test configuration and pure logic tests  
**Parallel:** Yes with dependency approval

Done when contract, validation, and memory tests run without calling the real OpenAI API.

## TASK-010 — Database and Authentication Preparation
**Status:** Blocked  
**Priority:** Medium  
**Dependencies:** TASK-006, TASK-008, product decision  
**Parallel:** Research only

Done when requirements, provider options, retention, ownership, and migration path are documented.
