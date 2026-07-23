import type { Dispatch, SetStateAction } from "react";
import type { ChecklistTask } from "@/components/BridgeChecklist";
import type { ResourceGroupKey } from "@/data/resources";

import BridgeChecklist from "@/components/BridgeChecklist";
import ChatActions from "@/components/ChatActions";
import ChatBubble from "@/components/ChatBubble";
import ChatInput from "@/components/ChatInput";
import CrisisBanner from "@/components/CrisisBanner";
import DownloadBridgePlan from "@/components/DownloadBridgePlan";
import ResourceList from "@/components/ResourceList";
import TypingIndicator from "@/components/TypingIndicator";

import { resourceGroups } from "@/data/resources";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Topic = {
  label: string;
  emoji: string;
};

type ChatColumnProps = {
  messages: Message[];
  isLoading: boolean;
  urgency: "normal" | "urgent";
  checklist: ChecklistTask[];
  completedTaskIds: string[];
  selectedResourceGroups: ResourceGroupKey[];
  bridgeProgress: number;
  needs: string[];
  nextBestStep: string;
  latestBridgePlan: string;
  topics: Topic[];
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  onSendMessage: (text?: string) => void;
  onToggleChecklistTask: (taskId: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
};

export default function ChatColumn({
  messages,
  isLoading,
  urgency,
  checklist,
  completedTaskIds,
  selectedResourceGroups,
  bridgeProgress,
  needs,
  nextBestStep,
  latestBridgePlan,
  topics,
  message,
  setMessage,
  onSendMessage,
  onToggleChecklistTask,
  messagesEndRef,
}: ChatColumnProps) {
  return (
    <div className="flex min-h-0 min-w-0 flex-col">
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

        <BridgeChecklist
          tasks={checklist}
          completedTaskIds={completedTaskIds}
          onToggleTask={onToggleChecklistTask}
        />

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
            onSendMessage(`I need help with ${topic}.`)
          }
          onCreatePlan={() =>
            onSendMessage(
              "Create a Bridge Plan for my situation using everything I have shared."
            )
          }
        />

        <ChatInput
          message={message}
          setMessage={setMessage}
          isLoading={isLoading}
          onSubmit={() => onSendMessage()}
        />

        <p className="mt-4 text-center text-xs leading-5 text-slate-400">
          BridgeAI provides general information and does not replace
          professional, medical, legal, or emergency services.
        </p>
      </div>
    </div>
  );
}