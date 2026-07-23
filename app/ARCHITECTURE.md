# BridgeAI Architecture

## Current Stack
- Next.js App Router 16.2.10
- React 19.2.4
- TypeScript 5.9.3, strict mode
- Tailwind CSS 4.3.2
- OpenAI Node SDK 6.47.0
- `react-markdown` 10.1.0
- `jsPDF` 4.2.1
- ESLint 9.39.4

## Current Structure
```text
app/
├── api/chat/route.ts
├── chat/page.tsx
├── globals.css
├── layout.tsx
└── page.tsx

components/
├── BridgeChecklist.tsx
├── BridgeHeader.tsx
├── BridgeProgress.tsx
├── CaseFileSidebar.tsx
├── CaseSnapshot.tsx
├── ChatActions.tsx
├── ChatBubble.tsx
├── ChatColumn.tsx
├── ChatInput.tsx
├── CrisisBanner.tsx
├── DownloadBridgePlan.tsx
├── ResourceCard.tsx
├── ResourceList.tsx
└── TypingIndicator.tsx

data/
└── resources.ts
```

## Current Chat Flow
1. User submits text through `ChatInput` or a predefined action.
2. `app/chat/page.tsx` appends the user message optimistically.
3. The complete conversation is sent to `POST /api/chat`.
4. The route prepends the BridgeAI system prompt and calls OpenAI.
5. The model returns structured JSON.
6. The server parses the response and returns it.
7. The client appends `reply` and replaces the dashboard snapshot.
8. Effects persist conversation and dashboard state to localStorage.

## Current API Contract
```ts
type BridgeAIResponse = {
  reply: string;
  resourceGroups: Array<"housing" | "food" | "mentalHealth">;
  urgency: "normal" | "urgent";
  bridgeScore: number;
  needs: string[];
  nextBestStep: string;
  checklist: Array<{
    id: string;
    label: string;
    timeframe: "today" | "thisWeek" | "followUp";
  }>;
  caseFile: {
    location: string;
    goal: string;
    documents: string[];
    applications: string[];
  };
};
```

## Current Persistence
- `bridgeai-messages`
- `bridgeai-dashboard`

The browser stores one conversation and one dashboard snapshot. There is no database, authentication, server-side conversation identity, retention policy, or cross-device synchronization.

## Main Bottleneck
`app/chat/page.tsx` currently owns conversation state, dashboard state, checklist completion, localStorage hydration and persistence, API calls, reset behavior, scrolling, Bridge Plan lookup, layout composition, and prop wiring. It should become primarily a composition/orchestration file.

## Current Risks
- No runtime validation of AI output
- No tests
- Browser-only persistence and shared-device privacy risk
- Shallow request validation
- Duplicated data shapes
- Large client controller
- No observability
- Unused legacy components may remain

## Target Architecture
```text
features/chat/
├── hooks/
│   ├── useBridgeChat.ts
│   └── useConversationPersistence.ts
├── services/
│   └── bridgeChatClient.ts
├── domain/
│   ├── chat.types.ts
│   ├── conversation-memory.types.ts
│   └── conversation-memory.ts
└── storage/
    └── localConversationRepository.ts

lib/
├── contracts/
│   └── bridge-ai.contract.ts
├── validation/
│   └── bridge-ai.validation.ts
└── server/
    └── openai.ts
```

## Conversation Memory Direction
Conversation Memory should be a structured domain object that accumulates facts across turns and preserves older facts unless the user corrects them. It should support location, employment, household, housing, transportation, benefits, documents, applications, needs, goals, fact source, and update time.

## Parallel Work Boundaries
Safe parallel tasks include documentation, tests, UI-only work, persistence abstraction, and server validation after interfaces are frozen. Conflict-prone files include `app/chat/page.tsx`, `app/api/chat/route.ts`, `package.json`, shared contracts, and architecture documents.
