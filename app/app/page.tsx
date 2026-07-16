import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <h1 className="text-6xl font-bold text-slate-900">
        🌉 BridgeAI
      </h1>

      <p className="mt-6 max-w-xl text-xl text-slate-600">
        Helping people navigate community resources with AI.
      </p>

      <p className="mt-4 max-w-2xl text-slate-500">
        Whether you&apos;re looking for food assistance, mental health
        resources, housing support, addiction recovery, or local services,
        BridgeAI helps you find the right help without the confusion.
      </p>

      <Link
        href="/chat"
        className="mt-10 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
      >
        Start Conversation
      </Link>
    </main>
  );
}