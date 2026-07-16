"use client";

import { FormEvent, useState } from "react";

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

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I’m BridgeAI. Tell me what’s going on, or choose a topic below. We’ll work toward a clear next step together.",
    },
  ]);

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
          message: userMessage,
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 px-4 py-8 sm:px-6">
      <section className="mx-auto flex min-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl shadow-slate-300/50">
        <header className="border-b border-slate-200 px-6 py-6 text-center sm:px-10">
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">🌉</span>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              BridgeAI
            </h1>
          </div>

          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            You don&apos;t have to figure it out alone.
          </p>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-6 sm:px-8">
          {messages.map((chatMessage, index) => {
            const isUser = chatMessage.role === "user";

            return (
              <div
                key={`${chatMessage.role}-${index}`}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-5 py-4 leading-7 shadow-sm ${
                    isUser
                      ? "rounded-br-md bg-blue-600 text-white"
                      : "rounded-tl-md bg-blue-50 text-slate-700"
                  }`}
                >
                  {!isUser && (
                    <p className="mb-1 font-semibold text-blue-900">
                      🌉 BridgeAI
                    </p>
                  )}

                  <p className="whitespace-pre-wrap">{chatMessage.content}</p>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-tl-md bg-blue-50 px-5 py-4 text-slate-500 shadow-sm">
                BridgeAI is thinking...
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 bg-white px-5 py-5 sm:px-8">
          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {topics.map((topic) => (
              <button
                key={topic.label}
                type="button"
                disabled={isLoading}
                onClick={() =>
                  void sendMessage(`I need help with ${topic.label}.`)
                }
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="mr-2">{topic.emoji}</span>
                {topic.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-3">
            <textarea
              value={message}
              disabled={isLoading}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tell me what’s going on..."
              rows={2}
              className="min-h-14 flex-1 resize-none rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
            />

            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="rounded-2xl bg-blue-600 px-6 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </form>

          <p className="mt-4 text-center text-xs leading-5 text-slate-400">
            BridgeAI provides general information and does not replace
            professional, medical, legal, or emergency services.
          </p>
        </div>
      </section>
    </main>
  );
}