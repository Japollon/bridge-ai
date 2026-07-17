export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl rounded-tl-md bg-blue-50 px-5 py-4 shadow-sm">
        <p className="mb-2 font-semibold text-blue-900">
          🌉 BridgeAI
        </p>

        <div className="flex items-center gap-2 text-slate-500">
          <span>Thinking</span>

          <div className="flex gap-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
}