/* Sunucu bileşenlerinde kullanılan küçük parçalar. `ui.tsx` istemci tarafı;
   oradan import etmek bu basit kutuyu da gereksiz yere tarayıcıya taşırdı. */

export function Notice({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
      {children}
    </p>
  );
}

export function PageTitle({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {lead && <p className="mt-1 max-w-2xl text-sm text-zinc-600">{lead}</p>}
      </div>
      {children}
    </header>
  );
}
