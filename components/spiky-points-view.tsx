"use client"

import { useMemo, useState } from "react"

type SpikyPoint = {
  id: string
  title: string
  oneLiner: string
  body: string
  tags: string[]
  status: "confirmed" | "proposed"
  links?: { label: string; href: string }[]
}

const points: SpikyPoint[] = [
  {
    id: "shortcuts-over-friction",
    title: "Give people shortcuts.",
    oneLiner:
      "If there is a faster, more native path to action, I want that path instead of making people wade through explanation first.",
    body:
      "I often include Claude artifacts, structured payloads, and copy-pasteable outputs because that is how I personally consume material. I do not enjoy long explanation when the real goal is action. If someone wants to use an agent, brief an assistant, or move straight into execution, I would rather give them a direct path than force them through an essay first.",
    tags: ["ux", "ai", "shortcuts", "consumption"],
    status: "confirmed",
    links: [
      {
        label: "How to do Agentic Development",
        href: "/posts/how-to-do-agentic-development",
      },
    ],
  },
  {
    id: "trusted-sources-beat-total-verification",
    title: "You do not have to verify everything.",
    oneLiner:
      "In a world of fast-moving knowledge, good-enough trust in strong sources is often more rational than pretending you can independently validate everything.",
    body:
      "I learn from people like Andrej Karpathy and many others whose work I trust. That does not mean blind faith. It means being realistic about the limits of time and attention. If I trust the source, and the cost of full independent verification is too high, I will often move forward with good-enough confidence rather than stall in fake rigor.",
    tags: ["learning", "trust", "speed", "judgment"],
    status: "confirmed",
  },
  {
    id: "plan-first",
    title: "Plan first.",
    oneLiner:
      "A surprising number of problems disappear when the work is decomposed properly before execution starts.",
    body:
      "Planning first is not bureaucracy. It is leverage. Once the work is broken into concrete steps with clear dependencies, fewer things get forgotten, fewer agents fake completion, and fewer projects drift into noise. The planning step feels slower only if you ignore how much chaos it removes later.",
    tags: ["planning", "execution", "beads", "systems"],
    status: "confirmed",
    links: [
      {
        label: "How to Build a Perfect Plan",
        href: "https://trilogyai.substack.com/p/cd228290-d784-4451-819b-9ddd2ea1988f",
      },
      {
        label: "How to do Agentic Development",
        href: "/posts/how-to-do-agentic-development",
      },
    ],
  },
  {
    id: "generalists-specialists",
    title: "Generalist humans should build specialist tools.",
    oneLiner:
      "The human should keep range; the software should narrow itself to doing one thing extremely well.",
    body:
      "I do not think the winning move is trying to out-generalize the model. The human should stay broad and strategic. The tool should be narrow, sharp, and designed for repeated use. That is how you get leverage instead of building a vague assistant that competes with its own foundation model.",
    tags: ["tools", "ai", "product", "strategy"],
    status: "proposed",
    links: [
      {
        label: "Generalist Humans, Specialist Tools",
        href: "/posts/generalist-humans-specialist-tools",
      },
    ],
  },
  {
    id: "hide-the-status-play-the-board",
    title: "Hide the status, play the board.",
    oneLiner:
      "Knowing somebody's label, rank, or title often makes your judgment worse rather than better.",
    body:
      "A lot of social and professional distortion comes from over-weighting perceived status. I usually prefer to engage with the actual work, argument, or person in front of me. If the signal is strong, the title is redundant. If the signal is weak, the title is misleading.",
    tags: ["behavior", "status", "judgment", "social"],
    status: "proposed",
    links: [
      {
        label: "Real life Lichess Zen Mode",
        href: "/posts/real-life-lichess-zen-mode",
      },
    ],
  },
  {
    id: "coherence-over-feature-collection",
    title: "Good systems feel coherent before they feel impressive.",
    oneLiner:
      "I trust a system more when its parts fit together cleanly than when it throws every feature at me at once.",
    body:
      "A lot of AI products try to win by feature accumulation. I care more about whether the pieces reinforce one another in a way that makes the system easier to reason about. Coherence scales better than novelty.",
    tags: ["systems", "design", "ai", "taste"],
    status: "proposed",
    links: [
      {
        label: "What Makes OpenClaw Different",
        href: "/posts/what-makes-openclaw-different",
      },
      {
        label: "What Makes Gas Town Different",
        href: "/posts/what-makes-gas-town-different",
      },
    ],
  },
]

const tagStyles = [
  "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
]

function styleForTag(tag: string) {
  const index = tag.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % tagStyles.length
  return tagStyles[index]
}

export function SpikyPointsView() {
  const [activeTag, setActiveTag] = useState<string>("all")
  const [expandedId, setExpandedId] = useState<string | null>(points[0]?.id ?? null)
  const [statusFilter, setStatusFilter] = useState<"all" | "confirmed" | "proposed">("all")

  const tags = useMemo(() => {
    return ["all", ...Array.from(new Set(points.flatMap((point) => point.tags))).sort()]
  }, [])

  const filtered = useMemo(() => {
    return points.filter((point) => {
      const tagMatch = activeTag === "all" || point.tags.includes(activeTag)
      const statusMatch = statusFilter === "all" || point.status === statusFilter
      return tagMatch && statusMatch
    })
  }, [activeTag, statusFilter])

  return (
    <div className="py-6">
      <div className="prose dark:prose-invert mb-8">
        <h1>Spiky Points of View</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          My carefully curated opinions about everything.
        </p>
        <p>
          Short, opinionated, and easy to scan. Each one opens into a cleaner card with a bit more context.
          Some are settled. Some are drafts worth testing.
        </p>
      </div>

      <div className="not-prose space-y-4 mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              statusFilter === "all"
                ? "bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100"
                : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter("confirmed")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              statusFilter === "confirmed"
                ? "bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100"
                : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
            }`}
          >
            Confirmed
          </button>
          <button
            onClick={() => setStatusFilter("proposed")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              statusFilter === "proposed"
                ? "bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100"
                : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
            }`}
          >
            Proposed
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeTag === tag
                  ? "bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100"
                  : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="not-prose overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 px-4 py-3 text-xs uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50">
          <div>Point of view</div>
          <div>Tags</div>
        </div>

        {filtered.map((point) => {
          const open = expandedId === point.id

          return (
            <div key={point.id} className="border-b border-slate-200 dark:border-slate-800 last:border-b-0">
              <button
                onClick={() => setExpandedId(open ? null : point.id)}
                className="w-full text-left px-4 py-4 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-4 items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{point.title}</span>
                      <span
                        className={`text-[10px] uppercase tracking-[0.12em] px-2 py-0.5 rounded-full ${
                          point.status === "confirmed"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                        }`}
                      >
                        {point.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-6">{point.oneLiner}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 md:justify-end">
                    {point.tags.map((tag) => (
                      <span key={tag} className={`text-[10px] px-2 py-1 rounded-full ${styleForTag(tag)}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>

              <div
                className={`grid transition-all duration-300 ease-out ${
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-5">
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">{point.title}</h3>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {point.tags.map((tag) => (
                            <span key={tag} className={`text-[10px] px-2 py-1 rounded-full ${styleForTag(tag)}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">{point.body}</p>
                      </div>

                      {point.links?.length ? (
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                          <div className="text-[11px] uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 font-semibold mb-3">
                            Related links
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {point.links.map((link) => (
                              <a
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-blue-600 dark:text-blue-400 no-underline hover:underline"
                              >
                                {link.label} →
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
