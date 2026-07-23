import type {
  ChecklistItem,
  ChecklistTimeframe,
} from "@/lib/contracts/bridge-ai";

type BridgeChecklistProps = {
  tasks: ChecklistItem[];
  completedTaskIds: string[];
  onToggleTask: (taskId: string) => void;
};

const timeframeLabels = {
  today: "Today",
  thisWeek: "This Week",
  followUp: "Follow Up",
};

export default function BridgeChecklist({
  tasks,
  completedTaskIds,
  onToggleTask,
}: BridgeChecklistProps) {
  if (tasks.length === 0) {
    return null;
  }

  const completedCount = tasks.filter((task) =>
    completedTaskIds.includes(task.id)
  ).length;

  const completionPercentage = Math.round(
    (completedCount / tasks.length) * 100
  );

  const timeframes: ChecklistTimeframe[] = [
    "today",
    "thisWeek",
    "followUp",
  ];

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Bridge Checklist
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-950">
            Track your next steps
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {completedCount} of {tasks.length} tasks completed
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 px-3 py-2 font-bold text-blue-700">
          {completionPercentage}%
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      <div className="mt-6 space-y-6">
        {timeframes.map((timeframe) => {
          const timeframeTasks = tasks.filter(
            (task) => task.timeframe === timeframe
          );

          if (timeframeTasks.length === 0) {
            return null;
          }

          return (
            <div key={timeframe}>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                {timeframeLabels[timeframe]}
              </h3>

              <div className="space-y-2">
                {timeframeTasks.map((task) => {
                  const isCompleted = completedTaskIds.includes(task.id);

                  return (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => onToggleTask(task.id)}
                      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${
                        isCompleted
                          ? "border-emerald-200 bg-emerald-50"
                          : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs font-bold ${
                          isCompleted
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-slate-300 bg-white text-transparent"
                        }`}
                      >
                        ✓
                      </span>

                      <span
                        className={`font-medium leading-6 ${
                          isCompleted
                            ? "text-slate-500 line-through"
                            : "text-slate-800"
                        }`}
                      >
                        {task.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
