import ResourceCard from "@/components/ResourceCard";

type Resource = {
  name: string;
  description: string;
  phone?: string;
  website: string;
  category: string;
};

type ResourceListProps = {
  resources: Resource[];
};

export default function ResourceList({
  resources,
}: ResourceListProps) {
  if (resources.length === 0) {
    return null;
  }

  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Actionable support
        </p>

        <h2 className="mt-1 text-xl font-bold text-slate-950">
          Verified Resources
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Review details on the official website before applying or visiting.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.name}
            name={resource.name}
            description={resource.description}
            phone={resource.phone}
            website={resource.website}
            category={resource.category}
          />
        ))}
      </div>
    </section>
  );
}