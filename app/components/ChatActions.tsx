type Topic = {
  label: string;
  emoji: string;
};

type ChatActionsProps = {
  topics: Topic[];
  isLoading: boolean;
  hasConversation: boolean;
  onSelectTopic: (topic: string) => void;
  onCreatePlan: () => void;
};

export default function ChatActions({
  topics,
  isLoading,
  hasConversation,
  onSelectTopic,
  onCreatePlan,
}: ChatActionsProps) {
  return (
    <>
      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {topics.map((topic) => (
          <button
            key={topic.label}
            type="button"
            disabled={isLoading}
            onClick={() => onSelectTopic(topic.label)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="mr-2">{topic.emoji}</span>
            {topic.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={isLoading || !hasConversation}
        onClick={onCreatePlan}
        className="mb-4 w-full rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-800 transition hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        📋 Create My Bridge Plan
      </button>
    </>
  );
}