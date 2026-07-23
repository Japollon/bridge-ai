"use client";

import { useEffect, useRef, useState } from "react";
import BridgeHeader from "@/components/BridgeHeader";
import CaseFileSidebar from "@/components/CaseFileSidebar";
import ChatColumn from "@/components/ChatColumn";
import type {
  BridgeAIResponse,
  ChatMessage,
  ChatRequest,
  ChecklistItem,
  ResourceGroup,
  Urgency,
} from "@/lib/contracts/bridge-ai";


const topics = [
  { label: "Housing", emoji: "🏠" },
  { label: "Food", emoji: "🍎" },
  { label: "Mental Health", emoji: "🧠" },
  { label: "Addiction Recovery", emoji: "💊" },
  { label: "New to the U.S.", emoji: "🌎" },
  { label: "Something Else", emoji: "❤️" },
];
const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Hi, I'm BridgeAI. Tell me what's going on, or choose a topic below. We'll work toward a clear next step together.",
  },
];
export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
const [hasLoadedMessages, setHasLoadedMessages] = useState(false);

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedResourceGroups, setSelectedResourceGroups] = useState<
  ResourceGroup[]
>([]);

const [urgency, setUrgency] = useState<Urgency>("normal");
const [bridgeProgress, setBridgeProgress] = useState(0);

const [needs, setNeeds] = useState<string[]>([]);

const [nextBestStep, setNextBestStep] = useState("");
const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
const [caseLocation, setCaseLocation] = useState("");
const [caseGoal, setCaseGoal] = useState("");
const [documents, setDocuments] = useState<string[]>([]);
const [applications, setApplications] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
useEffect(() => {
  /* eslint-disable react-hooks/set-state-in-effect -- Storage hydration must run after mount to preserve the server-rendered initial state. */
  const savedMessages = window.localStorage.getItem("bridgeai-messages");

  if (savedMessages) {
    try {
      setMessages(JSON.parse(savedMessages));
    } catch {
      setMessages(initialMessages);
    }
  }

  setHasLoadedMessages(true);
  /* eslint-enable react-hooks/set-state-in-effect */
}, []);
useEffect(() => {
  /* eslint-disable react-hooks/set-state-in-effect -- Storage hydration must run after mount to preserve the server-rendered initial state. */
  const savedDashboardState = window.localStorage.getItem(
    "bridgeai-dashboard"
  );

  if (!savedDashboardState) {
    return;
  }

  try {
    const parsedState = JSON.parse(savedDashboardState);

    setSelectedResourceGroups(
      Array.isArray(parsedState.selectedResourceGroups)
        ? parsedState.selectedResourceGroups
        : []
    );

    setUrgency(
      parsedState.urgency === "urgent" ? "urgent" : "normal"
    );

    setBridgeProgress(
      typeof parsedState.bridgeProgress === "number"
        ? parsedState.bridgeProgress
        : 0
    );

    setNeeds(Array.isArray(parsedState.needs) ? parsedState.needs : []);

    setNextBestStep(
      typeof parsedState.nextBestStep === "string"
        ? parsedState.nextBestStep
        : ""
    );
    setChecklist(
  Array.isArray(parsedState.checklist)
    ? parsedState.checklist
    : []
);

setCompletedTaskIds(
  Array.isArray(parsedState.completedTaskIds)
    ? parsedState.completedTaskIds
    : []
);
setCaseLocation(
  typeof parsedState.caseLocation === "string"
    ? parsedState.caseLocation
    : ""
);

setCaseGoal(
  typeof parsedState.caseGoal === "string"
    ? parsedState.caseGoal
    : ""
);

setDocuments(
  Array.isArray(parsedState.documents)
    ? parsedState.documents
    : []
);

setApplications(
  Array.isArray(parsedState.applications)
    ? parsedState.applications
    : []
);
  } catch {
    window.localStorage.removeItem("bridgeai-dashboard");
  }
  /* eslint-enable react-hooks/set-state-in-effect */
}, []);
useEffect(() => {
  if (hasLoadedMessages) {
    window.localStorage.setItem(
      "bridgeai-messages",
      JSON.stringify(messages)
    );
  }
}, [messages, hasLoadedMessages]);
useEffect(() => {
  if (!hasLoadedMessages) {
    return;
  }

  window.localStorage.setItem(
    "bridgeai-dashboard",
    JSON.stringify({
      selectedResourceGroups,
      urgency,
      bridgeProgress,
      needs,
      nextBestStep,
      checklist,
completedTaskIds,
caseLocation,
caseGoal,
documents,
applications,
    })
  );
}, [
  selectedResourceGroups,
  urgency,
  bridgeProgress,
  needs,
  nextBestStep,
    checklist,
  completedTaskIds,
    caseLocation,
  caseGoal,
  documents,
  applications,
  hasLoadedMessages,
]);
function clearConversation() {
  setMessages(initialMessages);
  setMessage("");
  setSelectedResourceGroups([]);
  setUrgency("normal");
  setBridgeProgress(0);
setNeeds([]);
setNextBestStep("");
setChecklist([]);
setCompletedTaskIds([]);
setCaseLocation("");
setCaseGoal("");
setDocuments([]);
setApplications([]);
  window.localStorage.removeItem("bridgeai-messages");
  window.localStorage.removeItem("bridgeai-dashboard");
}
function toggleChecklistTask(taskId: string) {
  setCompletedTaskIds((currentTaskIds) =>
    currentTaskIds.includes(taskId)
      ? currentTaskIds.filter((id) => id !== taskId)
      : [...currentTaskIds, taskId]
  );
}
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, isLoading]);
  async function sendMessage(text?: string) {
    const userMessage = (text ?? message).trim();

    if (!userMessage || isLoading) {
      return;
    }

    const updatedMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: userMessage },
    ];

    setMessages(updatedMessages);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        } satisfies ChatRequest),
      });

      if (!response.ok) {
        throw new Error("The request failed.");
      }

      const data: BridgeAIResponse = await response.json();
console.log("BridgeAI API data:", data);
setMessages([
  ...updatedMessages,
  {
    role: "assistant",
    content:
      data.reply ??
      "I’m sorry, but I wasn’t able to generate a response.",
  },
]);

setSelectedResourceGroups(
  Array.isArray(data.resourceGroups) ? data.resourceGroups : []
);

setUrgency(data.urgency === "urgent" ? "urgent" : "normal");
setBridgeProgress(data.bridgeScore ?? 0);

setNeeds(data.needs ?? []);

setNextBestStep(data.nextBestStep ?? "");
const incomingChecklist: ChecklistItem[] = Array.isArray(data.checklist)
  ? data.checklist
  : [];

setChecklist(incomingChecklist);

setCompletedTaskIds((currentTaskIds) =>
  currentTaskIds.filter((taskId) =>
    incomingChecklist.some((task) => task.id === taskId)
  )
);
const incomingCaseFile = data.caseFile ?? {};

setCaseLocation(
  typeof incomingCaseFile.location === "string"
    ? incomingCaseFile.location
    : ""
);

setCaseGoal(
  typeof incomingCaseFile.goal === "string"
    ? incomingCaseFile.goal
    : ""
);

setDocuments(
  Array.isArray(incomingCaseFile.documents)
    ? incomingCaseFile.documents
    : []
);

setApplications(
  Array.isArray(incomingCaseFile.applications)
    ? incomingCaseFile.applications
    : []
);
    } catch (error) {
      console.error(error);

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            "I’m sorry—something went wrong while I was trying to respond. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  

 
}
const latestBridgePlan =
  [...messages]
    .reverse()
    .find(
      (chatMessage) =>
        chatMessage.role === "assistant" &&
        chatMessage.content.includes("Your Bridge Plan")
    )?.content ?? "";
  return (
  <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 px-4 py-6">
    <section className="mx-auto flex min-h-[85vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl border border-white/70 bg-white shadow-xl">
      <BridgeHeader onNewConversation={clearConversation} />

      <div className="grid min-h-0 flex-1 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="border-b border-slate-200 bg-slate-50 p-4 lg:border-b-0 lg:border-r lg:overflow-y-auto">
          <CaseFileSidebar
            progress={bridgeProgress}
            needs={needs}
            urgency={urgency}
            nextBestStep={nextBestStep}
            checklist={checklist}
            completedTaskIds={completedTaskIds}
            caseLocation={caseLocation}
caseGoal={caseGoal}
documents={documents}
applications={applications}
          />
        </div>

        <ChatColumn
          messages={messages}
          isLoading={isLoading}
          urgency={urgency}
          checklist={checklist}
          completedTaskIds={completedTaskIds}
          selectedResourceGroups={selectedResourceGroups}
          bridgeProgress={bridgeProgress}
          needs={needs}
          nextBestStep={nextBestStep}
          latestBridgePlan={latestBridgePlan}
          topics={topics}
          message={message}
          setMessage={setMessage}
          onSendMessage={(text) => void sendMessage(text)}
          onToggleChecklistTask={toggleChecklistTask}
          messagesEndRef={messagesEndRef}
        />
      </div>
    </section>
  </main>
);
}
