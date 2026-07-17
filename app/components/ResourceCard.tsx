type ResourceCardProps = {
  name: string;
  description: string;
  phone?: string;
  website: string;
  category: string;
};

export default function ResourceCard({
  name,
  description,
  phone,
  website,
  category,
}: ResourceCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {category}
          </span>

          <h3 className="mt-3 text-lg font-bold text-slate-950">
            {name}
          </h3>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">
          🤝
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {description}
      </p>

      {phone && (
        <a
          href={`tel:${phone.replace(/[^\d+]/g, "")}`}
          className="mt-4 block text-sm font-semibold text-slate-800 hover:text-blue-700"
        >
          ☎️ {phone}
        </a>
      )}

      <a
        href={website}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Open Official Website ↗
      </a>
    </article>
  );
}