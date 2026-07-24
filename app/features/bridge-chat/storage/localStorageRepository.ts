import type {
  ChatMessage,
  ChecklistItem,
  ResourceGroup,
  Urgency,
} from "@/lib/contracts/bridge-ai";

const MESSAGES_STORAGE_KEY = "bridgeai-messages";
const DASHBOARD_STORAGE_KEY = "bridgeai-dashboard";

export type PersistedDashboardState = {
  selectedResourceGroups: ResourceGroup[];
  urgency: Urgency;
  bridgeProgress: number;
  needs: string[];
  nextBestStep: string;
  checklist: ChecklistItem[];
  completedTaskIds: string[];
  caseLocation: string;
  caseGoal: string;
  documents: string[];
  applications: string[];
};

export function readPersistedMessages(
  fallbackMessages: ChatMessage[]
): ChatMessage[] | null {
  const savedMessages = window.localStorage.getItem(MESSAGES_STORAGE_KEY);

  if (!savedMessages) {
    return null;
  }

  try {
    return JSON.parse(savedMessages);
  } catch {
    return fallbackMessages;
  }
}

export function readPersistedDashboard(): PersistedDashboardState | null {
  const savedDashboardState = window.localStorage.getItem(
    DASHBOARD_STORAGE_KEY
  );

  if (!savedDashboardState) {
    return null;
  }

  try {
    const parsedState = JSON.parse(savedDashboardState);

    return {
      selectedResourceGroups: Array.isArray(parsedState.selectedResourceGroups)
        ? parsedState.selectedResourceGroups
        : [],
      urgency: parsedState.urgency === "urgent" ? "urgent" : "normal",
      bridgeProgress:
        typeof parsedState.bridgeProgress === "number"
          ? parsedState.bridgeProgress
          : 0,
      needs: Array.isArray(parsedState.needs) ? parsedState.needs : [],
      nextBestStep:
        typeof parsedState.nextBestStep === "string"
          ? parsedState.nextBestStep
          : "",
      checklist: Array.isArray(parsedState.checklist)
        ? parsedState.checklist
        : [],
      completedTaskIds: Array.isArray(parsedState.completedTaskIds)
        ? parsedState.completedTaskIds
        : [],
      caseLocation:
        typeof parsedState.caseLocation === "string"
          ? parsedState.caseLocation
          : "",
      caseGoal:
        typeof parsedState.caseGoal === "string" ? parsedState.caseGoal : "",
      documents: Array.isArray(parsedState.documents)
        ? parsedState.documents
        : [],
      applications: Array.isArray(parsedState.applications)
        ? parsedState.applications
        : [],
    };
  } catch {
    window.localStorage.removeItem(DASHBOARD_STORAGE_KEY);
    return null;
  }
}

export function writePersistedMessages(messages: ChatMessage[]): void {
  window.localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
}

export function writePersistedDashboard(
  dashboardState: PersistedDashboardState
): void {
  window.localStorage.setItem(
    DASHBOARD_STORAGE_KEY,
    JSON.stringify(dashboardState)
  );
}

export function clearPersistedBridgeChat(): void {
  window.localStorage.removeItem(MESSAGES_STORAGE_KEY);
  window.localStorage.removeItem(DASHBOARD_STORAGE_KEY);
}
