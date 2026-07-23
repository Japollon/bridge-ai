import type { ChecklistTask } from "@/components/BridgeChecklist";

type CaseFileSidebarProps = {
  progress: number;
  needs: string[];
  urgency: "normal" | "urgent";
  nextBestStep: string;
  checklist: ChecklistTask[];
  completedTaskIds: string[];
  caseLocation: string;
  caseGoal: string;
  documents: string[];
  applications: string[];
};

export default function CaseFileSidebar({
  progress,
  needs,
  urgency,
  nextBestStep,
  checklist,
  completedTaskIds,
  caseLocation = "",
  caseGoal = "",
  documents = [],
  applications = [],
}: CaseFileSidebarProps) {
  const completedCount = checklist.filter((task) =>
    completedTaskIds.includes(task.id)
  ).length;

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
      <div className="border-b border-slate-200 pb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Live Case File
        </p>

        <div className="mt-2 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-950">
            Support Overview
          </h2>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              urgency === "urgent"
                ? "bg-red-100 text-red-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {urgency === "urgent" ? "Urgent" : "Normal"}
          </span>
        </div>
      </div>

      <div className="py-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Bridge Progress
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-950">
              {progress}%
            </p>
          </div>

          <span className="text-3xl" aria-hidden="true">
            🌉
          </span>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
<div className="border-b border-slate-200 py-5">
  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
    Location
  </p>

  <p className="mt-2 text-sm font-medium text-slate-900">
    {caseLocation || "Not provided yet"}
  </p>

  <p className="mt-5 text-xs font-bold uppercase tracking-wide text-slate-500">
    Current Goal
  </p>

  <p className="mt-2 text-sm font-medium leading-6 text-slate-900">
    {caseGoal || "BridgeAI is still identifying your primary goal."}
  </p>
</div>
      <div className="border-t border-slate-200 py-5">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Needs
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {needs.length > 0 ? (
            needs.map((need) => (
              <span
                key={need}
                className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
              >
                {need}
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No needs identified yet.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-slate-200 py-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Checklist
          </p>

          <span className="text-sm font-semibold text-slate-700">
            {completedCount}/{checklist.length}
          </span>
        </div>

        <p className="mt-2 text-sm text-slate-600">
          {checklist.length > 0
            ? `${completedCount} tasks completed`
            : "No checklist created yet."}
        </p>
      </div>

      <div className="border-t border-slate-200 py-5">
  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
    Documents
  </p>

  <div className="mt-3 space-y-2">
    {documents.length > 0 ? (
      documents.map((document) => (
        <p
          key={document}
          className="flex items-start gap-2 text-sm text-slate-700"
        >
          <span aria-hidden="true">□</span>
          <span>{document}</span>
        </p>
      ))
    ) : (
      <p className="text-sm text-slate-500">
        No documents identified yet.
      </p>
    )}
  </div>
</div>

<div className="border-t border-slate-200 py-5">
  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
    Applications
  </p>

  <div className="mt-3 space-y-2">
    {applications.length > 0 ? (
      applications.map((application) => (
        <p
          key={application}
          className="flex items-start gap-2 text-sm text-slate-700"
        >
          <span aria-hidden="true">□</span>
          <span>{application}</span>
        </p>
      ))
    ) : (
      <p className="text-sm text-slate-500">
        No applications identified yet.
      </p>
    )}
  </div>
</div>

<div className="border-t border-slate-200 pt-5">
  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
    Next Best Step
  </p>

  <p className="mt-2 text-sm font-medium leading-6 text-slate-900">
    {nextBestStep ||
      "Share your situation so BridgeAI can identify a next step."}
  </p>
</div>
    </aside>
  );
}