import Link from "next/link"

const projects = [
  {
    name: "Expanova",
    href: "https://www.expanova.io/en",
    description:
      "Venture builder that funds, builds, and scales startups. A core part of Stan's operating footprint and a better anchor for the portfolio than a buried external link.",
    status: "Primary",
  },
  {
    name: "youragent",
    href: "https://www.npmjs.com/package/youragent",
    description:
      "Agent tooling package for building and experimenting with practical AI workflows.",
    status: "Open source",
  },
  {
    name: "wwvcd",
    href: "https://www.npmjs.com/package/wwvcd",
    description:
      "Utility package around reusable agent thinking and workflow patterns.",
    status: "Open source",
  },
]

export default function PortfolioPage() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div className="not-prose mb-10 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-3">
          Portfolio
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 mb-3">
          Work worth clicking into
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
          A tighter view of the companies, tools, and projects behind the writing. This is the operating layer.
        </p>
      </div>

      <div className="not-prose space-y-4">
        {projects.map((project, index) => (
          <article
            key={project.name}
            className={`rounded-xl border p-5 transition-colors ${
              index === 0
                ? "border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/60"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
            }`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 mb-2">
                  {project.status}
                </div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {project.name}
                </h2>
              </div>
              <Link
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-slate-900 dark:text-slate-100 no-underline hover:underline underline-offset-4 whitespace-nowrap"
              >
                Visit ↗
              </Link>
            </div>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-400 m-0 max-w-2xl">
              {project.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
