export function Panel({
  children,
  header,
  footer,
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      {header && (
        <div className="text-sm font-semibold uppercase text-gray-400">
          {header}
        </div>
      )}
      <div className="flex flex-col px-2">{children}</div>
    </div>
  );
}
