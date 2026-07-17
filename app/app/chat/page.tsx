"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import TypingIndicator from "@/components/TypingIndicator";
import BridgeHeader from "@/components/BridgeHeader";
import ChatBubble from "@/components/ChatBubble";
import ChatInput from "@/components/ChatInput";
import ChatActions from "@/components/ChatActions";
import ResourceList from "@/components/ResourceList";
import CrisisBanner from "@/components/CrisisBanner";
import BridgeProgress from "@/components/BridgeProgress";
import CaseSnapshot from "@/components/CaseSnapshot";
import DownloadBridgePlan from "@/components/DownloadBridgePlan";
import {
  resourceGroups,
  type ResourceGroupKey,
} from "@/data/resources";
type Message = {
  role: "user" | "assistant";
  content: string;
};


const topics = [
  { label: "Housing", emoji: "🏠" },
  { label: "Food", emoji: "🍎" },
  { label: "Mental Health", emoji: "🧠" },
  { label: "Addiction Recovery", emoji: "💊" },
  { label: "New to the U.S.", emoji: "🌎" },
  { label: "Something Else", emoji: "❤️" },
];
const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Hi, I'm BridgeAI. Tell me what's going on, or choose a topic below. We'll work toward a clear next step together.",
  },
];
export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
const [hasLoadedMessages, setHasLoadedMessages] = useState(false);

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedResourceGroups, setSelectedResourceGroups] = useState<
  ResourceGroupKey[]
>([]);

const [urgency, setUrgency] = useState<"normal" | "urgent">("normal");
const [bridgeProgress, setBridgeProgress] = useState(0);

const [needs, setNeeds] = useState<string[]>([]);

const [nextBestStep, setNextBestStep] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
useEffect(() => {
  const savedMessages = window.localStorage.getItem("bridgeai-messages");

  if (savedMessages) {
    try {
      setMessages(JSON.parse(savedMessages));
    } catch {
      setMessages(initialMessages);
    }
  }

  setHasLoadedMessages(true);
}, []);
useEffect(() => {
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
  } catch {
    window.localStorage.removeItem("bridgeai-dashboard");
  }
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
    })
  );
}, [
  selectedResourceGroups,
  urgency,
  bridgeProgress,
  needs,
  nextBestStep,
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
  window.localStorage.removeItem("bridgeai-messages");
  window.localStorage.removeItem("bridgeai-dashboard");
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

    const updatedMessages: Message[] = [
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
        }),
      });

      if (!response.ok) {
        throw new Error("The request failed.");
      }

      const data = await response.json();

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
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 px-4 py-8 sm:px-6">
      <section className="mx-auto flex min-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl shadow-slate-300/50">
        <BridgeHeader onNewConversation={clearConversation} />

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-6 sm:px-8">
         {messages.map((chatMessage, index) => (
  <ChatBubble
    key={`${chatMessage.role}-${index}`}
    role={chatMessage.role}
    content={chatMessage.content}
  />
))}

          {isLoading && <TypingIndicator />}
<div ref={messagesEndRef} />
{urgency === "urgent" && <CrisisBanner />}
{bridgeProgress > 0 && (
  <BridgeProgress
    progress={bridgeProgress}
    needs={needs}
    nextBestStep={nextBestStep}
  />
)}
{bridgeProgress > 0 && (
  <CaseSnapshot
    needs={needs}
    urgency={urgency}
    nextBestStep={nextBestStep}
  />
)}
{bridgeProgress > 0 && (
  <DownloadBridgePlan
    progress={bridgeProgress}
    needs={needs}
    nextBestStep={nextBestStep}
    planText={latestBridgePlan}
  />
)}
{selectedResourceGroups.map((groupKey) => (
  <ResourceList
    key={groupKey}
    resources={resourceGroups[groupKey].resources}
  />
))}
        </div>

        <div className="border-t border-slate-200 bg-white px-5 py-5 sm:px-8">
<ChatActions
  topics={topics}
  isLoading={isLoading}
  hasConversation={messages.length > 1}
  onSelectTopic={(topic) =>
    void sendMessage(`I need help with ${topic}.`)
  }
  onCreatePlan={() =>
    void sendMessage(
      "Create a Bridge Plan for my situation using everything I have shared."
    )
  }
/>
          <ChatInput
  message={message}
  setMessage={setMessage}
  isLoading={isLoading}
  onSubmit={() => void sendMessage()}
/>

          <p className="mt-4 text-center text-xs leading-5 text-slate-400">
            BridgeAI provides general information and does not replace
            professional, medical, legal, or emergency services.
          </p>
        </div>
      </section>
    </main>
  );
}