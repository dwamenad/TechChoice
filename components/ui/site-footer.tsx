export function SiteFooter() {
  return (
    <footer
      className="border-t px-4 py-10 text-sm text-[color:var(--muted)] sm:px-6 lg:px-8"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>TechChoice is a mock-data product prototype. It does not claim live pricing or live inventory.</p>
        <p>Built to be ready for real product feeds later.</p>
      </div>
    </footer>
  );
}
