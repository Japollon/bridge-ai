export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatRequest = {
  messages: ChatMessage[];
};

export type ResourceGroup = "housing" | "food" | "mentalHealth";

export type Urgency = "normal" | "urgent";

export type ChecklistTimeframe = "today" | "thisWeek" | "followUp";

export type ChecklistItem = {
  id: string;
  label: string;
  timeframe: ChecklistTimeframe;
};

export type CaseFile = {
  location: string;
  goal: string;
  documents: string[];
  applications: string[];
};

export type BridgeAIResponse = {
  reply: string;
  resourceGroups: ResourceGroup[];
  urgency: Urgency;
  bridgeScore: number;
  needs: string[];
  nextBestStep: string;
  checklist: ChecklistItem[];
  caseFile: CaseFile;
};

export type BridgeAIErrorResponse = {
  error: string;
};
