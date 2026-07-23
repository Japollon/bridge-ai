import ReactMarkdown from "react-markdown";
import type { ChatMessage } from "@/lib/contracts/bridge-ai";

type ChatBubbleProps = {
  role: ChatMessage["role"];
  content: string;
};

export default function ChatBubble({
  role,
  content,
}: ChatBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] rounded-2xl px-5 py-4 leading-7 shadow-sm ${
          isUser
            ? "rounded-br-md bg-blue-600 text-white"
            : "rounded-tl-md bg-blue-50 text-slate-700"
        }`}
      >
        {!isUser && (
          <p className="mb-2 font-semibold text-blue-900">
            🌉 BridgeAI
          </p>
        )}

        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="space-y-3">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="mt-4 text-xl font-bold text-blue-950">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mt-4 font-semibold text-slate-900">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="leading-7">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="ml-5 list-disc space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="ml-5 list-decimal space-y-2">{children}</ol>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-slate-900">
                    {children}
                  </strong>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
