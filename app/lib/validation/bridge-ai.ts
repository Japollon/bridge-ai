import type {
  BridgeAIResponse,
  CaseFile,
  ChatMessage,
  ChatRequest,
  ChecklistItem,
  ChecklistTimeframe,
  ResourceGroup,
  Urgency,
} from "@/lib/contracts/bridge-ai";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isChatMessage(value: unknown): value is ChatMessage {
  return (
    isRecord(value) &&
    (value.role === "user" || value.role === "assistant") &&
    typeof value.content === "string" &&
    value.content.trim().length > 0
  );
}

function isResourceGroup(value: unknown): value is ResourceGroup {
  return value === "housing" || value === "food" || value === "mentalHealth";
}

function isUrgency(value: unknown): value is Urgency {
  return value === "normal" || value === "urgent";
}

function isChecklistTimeframe(value: unknown): value is ChecklistTimeframe {
  return value === "today" || value === "thisWeek" || value === "followUp";
}

function isChecklistItem(value: unknown): value is ChecklistItem {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.label === "string" &&
    isChecklistTimeframe(value.timeframe)
  );
}

function isCaseFile(value: unknown): value is CaseFile {
  return (
    isRecord(value) &&
    typeof value.location === "string" &&
    typeof value.goal === "string" &&
    isStringArray(value.documents) &&
    isStringArray(value.applications)
  );
}

export function isChatRequest(value: unknown): value is ChatRequest {
  return (
    isRecord(value) &&
    Array.isArray(value.messages) &&
    value.messages.length > 0 &&
    value.messages.every(isChatMessage)
  );
}

export function isBridgeAIResponse(value: unknown): value is BridgeAIResponse {
  return (
    isRecord(value) &&
    typeof value.reply === "string" &&
    Array.isArray(value.resourceGroups) &&
    value.resourceGroups.every(isResourceGroup) &&
    isUrgency(value.urgency) &&
    typeof value.bridgeScore === "number" &&
    Number.isFinite(value.bridgeScore) &&
    value.bridgeScore >= 0 &&
    value.bridgeScore <= 100 &&
    isStringArray(value.needs) &&
    typeof value.nextBestStep === "string" &&
    Array.isArray(value.checklist) &&
    value.checklist.every(isChecklistItem) &&
    isCaseFile(value.caseFile)
  );
}
