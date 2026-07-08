export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-6">
      <h1 className="text-6xl font-bold text-slate-900">
        🌉 BridgeAI
      </h1>

      <p className="mt-6 max-w-xl text-xl text-slate-600">
        Helping people navigate community resources with AI.
      </p>

      <p className="mt-4 max-w-2xl text-slate-500">
        Whether you're looking for food assistance, mental health resources,
        housing support, addiction recovery, or local services,
        BridgeAI helps you find the right help—without the confusion.
      </p>

      <button className="mt-10 rounded-xl bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-700 transition">
        Start Conversation
      </button>
    </main>
  );
}