type BridgeProgressProps = {
  progress: number;
  needs: string[];
  nextBestStep: string;
};

export default function BridgeProgress({
  progress,
  needs,
  nextBestStep,
}: BridgeProgressProps) {
  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Bridge Progress
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            {progress}%
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your action plan is becoming more complete.
          </p>
        </div>

        <div className="text-4xl">
          🌉
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-slate-900">
          Needs Identified
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">
          {needs.map((need) => (
            <span
              key={need}
              className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
            >
              ✓ {need}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-slate-50 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Next Best Step
        </p>

        <p className="mt-2 font-medium text-slate-900">
          {nextBestStep}
        </p>
      </div>
    </section>
  );
}