export default function CrisisBanner() {
  return (
    <aside
      role="alert"
      className="mt-6 rounded-2xl border-2 border-red-300 bg-red-50 p-5 shadow-sm"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-2xl">
          ❤️
        </div>

        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-red-700">
            Immediate support
          </p>

          <h2 className="mt-1 text-lg font-bold text-red-950">
            You deserve help right now.
          </h2>

          <p className="mt-2 text-sm leading-6 text-red-900">
            If you may hurt yourself or someone else, call emergency services
            now. In the United States, call or text 988 for confidential crisis
            support.
          </p>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <a
              href="tel:988"
              className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Call 988
            </a>

            <a
              href="sms:988"
              className="inline-flex items-center justify-center rounded-xl border border-red-300 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100"
            >
              Text 988
            </a>

            <a
              href="tel:911"
              className="inline-flex items-center justify-center rounded-xl border border-red-300 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100"
            >
              Call 911
            </a>
          </div>

          <p className="mt-3 text-xs leading-5 text-red-700">
            Outside the United States, contact your local emergency number or
            crisis service.
          </p>
        </div>
      </div>
    </aside>
  );
}