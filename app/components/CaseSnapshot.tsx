type CaseSnapshotProps = {
  needs: string[];
  urgency: "normal" | "urgent";
  nextBestStep: string;
};

export default function CaseSnapshot({
  needs,
  urgency,
  nextBestStep,
}: CaseSnapshotProps) {
  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Case Snapshot
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-950">
            Your current support overview
          </h2>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            urgency === "urgent"
              ? "bg-red-100 text-red-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {urgency === "urgent" ? "Urgent support" : "Normal priority"}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Needs identified
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {needs.length > 0 ? (
            needs.map((need) => (
              <span
                key={need}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700"
              >
                {need}
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              BridgeAI is still learning about your situation.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-5">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Current focus
        </p>

        <p className="mt-2 font-medium leading-6 text-slate-900">
          {nextBestStep || "Share more details so BridgeAI can identify your next step."}
        </p>
      </div>
    </section>
  );
}