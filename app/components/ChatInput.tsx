type ChatInputProps = {
  message: string;
  setMessage: (value: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
};

export default function ChatInput({
  message,
  setMessage,
  isLoading,
  onSubmit,
}: ChatInputProps) {
  return (
    <div className="border-t border-slate-200 bg-white px-5 py-5 sm:px-8">
      <textarea
        value={message}
        disabled={isLoading}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
          }
        }}
        rows={2}
        placeholder="Tell me what's going on..."
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
      />

      <button
        type="button"
        disabled={isLoading}
        onClick={onSubmit}
        className="mt-4 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
}