type BridgeHeaderProps = {
  onNewConversation: () => void;
};

export default function BridgeHeader({
  onNewConversation,
}: BridgeHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-slate-200 bg-white px-6 py-6 sm:px-8">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500" />

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-2xl shadow-lg shadow-blue-200">
              🌉
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                  BridgeAI
                </h1>

                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  AI Navigator
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Clear guidance for life&apos;s difficult moments.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onNewConversation}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
        >
          <span aria-hidden="true">＋</span>
          New Conversation
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
          Personalized next steps
        </span>

        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
          Conversation memory
        </span>

        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
          Verified resources
        </span>
      </div>
    </header>
  );
}