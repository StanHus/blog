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
  relatedIds: [string, string]
}

const points: SpikyPoint[] = [
  {
    id: "shortcuts-over-friction",
    title: "Give people shortcuts.",
    oneLiner:
      "If there is a faster path to action, I want that path instead of making people earn it through explanation.",
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
    relatedIds: ["trust-strong-sources", "build-something-now"],
  },
  {
    id: "trust-strong-sources",
    title: "Trust strong sources and move.",
    oneLiner:
      "If I trust the source, I would rather move with good-enough conviction than pretend I can independently verify everything.",
    body:
      "I learn from people like Andrej Karpathy and from teams whose work I trust. That does not mean blind faith. It means being realistic about the limits of time and attention. If I start trying to deconstruct everything from first principles every time, I will never get anything done. In fast-moving technical domains, judgment often means knowing when trust is rational.",
    tags: ["learning", "trust", "speed", "judgment"],
    status: "confirmed",
    relatedIds: ["what-would-vin-claudel-do", "build-something-now"],
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
    relatedIds: ["build-something-now", "what-would-vin-claudel-do"],
  },
  {
    id: "generalists-specialists",
    title: "Generalist humans should build specialist tools.",
    oneLiner:
      "The human should keep range; the software should narrow itself to doing one thing extremely well.",
    body:
      "I do not think the winning move is trying to out-generalize the model. The human should stay broad and strategic. The tool should be narrow, sharp, and designed for repeated use. That is how you get leverage instead of building a vague assistant that competes with its own foundation model.",
    tags: ["tools", "ai", "product", "strategy"],
    status: "confirmed",
    links: [
      {
        label: "Generalist Humans, Specialist Tools",
        href: "/posts/generalist-humans-specialist-tools",
      },
    ],
    relatedIds: ["coherence-over-feature-collection", "build-something-now"],
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
    relatedIds: ["trust-strong-sources", "make-it-resonate-with-you"],
  },
  {
    id: "coherence-over-feature-collection",
    title: "Good systems should feel coherent before they feel impressive.",
    oneLiner:
      "I trust a system more when its parts fit together cleanly than when it throws every feature at me at once.",
    body:
      "A lot of AI products try to win by feature accumulation. I care more about whether the pieces reinforce one another in a way that makes the system easier to reason about. Coherence scales better than novelty. If the architecture feels clean, I will trust it more than a loud product demo with too many moving parts.",
    tags: ["systems", "design", "ai", "taste"],
    status: "confirmed",
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
    relatedIds: ["generalists-specialists", "what-would-vin-claudel-do"],
  },
  {
    id: "what-would-vin-claudel-do",
    title: "When a great team has already solved the problem, steal their pattern instead of improvising your own mediocrity.",
    oneLiner:
      "If Claude Code people already found the best pattern, my default move is to learn it and use it, not argue with it for sport.",
    body:
      "This is not neutrality. I think the Claude Code team has already solved a lot of the hardest architectural problems better than most people building agents from scratch. If I can inspect those patterns, extract them, and reuse them, that is the obvious move. Trying to reinvent everything from my own half-formed intuitions is often just ego disguised as rigor.",
    tags: ["ai", "patterns", "trust", "architecture"],
    status: "confirmed",
    links: [
      {
        label: "What Would Vin Claudel Do",
        href: "https://trilogyai.substack.com/p/what-would-vin-claudel-do?utm_source=profile&utm_medium=reader2",
      },
    ],
    relatedIds: ["trust-strong-sources", "plan-first"],
  },
  {
    id: "build-something-now",
    title: "Build something now. Improve it later.",
    oneLiner:
      "A real thing that exists beats a more sophisticated thing you are still thinking about.",
    body:
      "I would rather publish the package, ship the prototype, or put the idea into the world than spend too long trying to make it perfect in private. A fast, opinionated first version creates feedback, momentum, and actual use. You can improve what exists. You cannot improve the thing you never made.",
    tags: ["shipping", "speed", "making", "execution"],
    status: "confirmed",
    relatedIds: ["plan-first", "make-it-resonate-with-you"],
  },
  {
    id: "make-it-resonate-with-you",
    title: "Make things that resonate with you, not just things that look strategically correct.",
    oneLiner:
      "A project gets better when I actually enjoy it, even if that makes it more opinionated, stranger, or less optimized for broad approval.",
    body:
      "I do not mind if a name is a little stupid, funny, or overly specific, if it genuinely feels like mine. Personality is not always the maximally optimized growth strategy, but it is often the thing that makes me care enough to keep building. I would rather make something alive and resonant than something sanitized and forgettable.",
    tags: ["taste", "personality", "making", "creative"],
    status: "confirmed",
    relatedIds: ["build-something-now", "shortcuts-over-friction"],
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
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [tagsOpen, setTagsOpen] = useState(false)

  const pointsById = useMemo(() => new Map(points.map((point) => [point.id, point])), [])

  const tags = useMemo(() => {
    return Array.from(new Set(points.flatMap((point) => point.tags))).sort()
  }, [])

  const filtered = useMemo(() => {
    return points.filter((point) => {
      return activeTag === "all" || point.tags.includes(activeTag)
    })
  }, [activeTag])

  const expandedPoint = expandedId ? pointsById.get(expandedId) ?? null : null
  const expandedRelated = expandedPoint
    ? expandedPoint.relatedIds.map((id) => pointsById.get(id)).filter(Boolean) as SpikyPoint[]
    : []

  return (
    <div className="py-6">
      <div className="prose dark:prose-invert mb-8">
        <h1>Spiky Points of View</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          My carefully curated opinions about everything.
        </p>
      </div>

      <div className="not-prose mb-6 relative">
        <button
          onClick={() => setTagsOpen((open) => !open)}
          className="inline-flex items-center justify-between min-w-[200px] rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <span>{activeTag === "all" ? "Filter by tag..." : `Tag: ${activeTag}`}</span>
          <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${tagsOpen ? "rotate-180" : "rotate-0"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {tagsOpen ? (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setTagsOpen(false)} 
            />
            <div className="absolute left-0 top-[calc(100%+8px)] z-20 w-[240px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden py-1 max-h-[60vh] overflow-y-auto">
              <button
                onClick={() => {
                  setActiveTag("all")
                  setTagsOpen(false)
                }}
                className="w-full flex items-center px-4 py-2.5 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className={`w-4 h-4 mr-3 rounded border flex items-center justify-center ${activeTag === "all" ? "bg-blue-500 border-blue-500" : "border-slate-300 dark:border-slate-600"}`}>
                  {activeTag === "all" && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className="text-slate-700 dark:text-slate-300">All tags</span>
              </button>
              
              {tags.filter(t => t !== "all").map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setActiveTag(tag)
                    setTagsOpen(false)
                  }}
                  className="w-full flex items-center px-4 py-2.5 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className={`w-4 h-4 mr-3 rounded border flex items-center justify-center ${activeTag === tag ? "bg-blue-500 border-blue-500" : "border-slate-300 dark:border-slate-600"}`}>
                    {activeTag === tag && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">{tag}</span>
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>

      <div className="not-prose overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40">
        <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_auto] gap-4 px-4 py-3 text-xs uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50">
          <div>Spiky point of view</div>
          <div>Tags</div>
          <div className="text-right">Open</div>
        </div>

        {filtered.map((point) => {
          const open = expandedId === point.id

          return (
            <div key={point.id} className="border-b border-slate-200 dark:border-slate-800 last:border-b-0">
              <button
                onClick={() => setExpandedId(open ? null : point.id)}
                className="w-full text-left px-4 py-4 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_auto] gap-4 items-start">
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5">{point.title}</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-6">{point.oneLiner}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 md:justify-start">
                    {point.tags.map((tag) => (
                      <span key={tag} className={`text-[10px] px-2 py-1 rounded-full ${styleForTag(tag)}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-950">
                      Expand
                      <span className="transition-transform">›</span>
                    </span>
                  </div>
                </div>
              </button>
            </div>
          )
        })}
      </div>

      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          expandedPoint ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setExpandedId(null)}
          className={`absolute inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 ${
            expandedPoint ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
          <div
            className={`w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl transition-all duration-300 ${
              expandedPoint ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
            }`}
          >
            {expandedPoint ? (
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {expandedPoint.tags.map((tag) => (
                        <span key={tag} className={`text-[10px] px-2 py-1 rounded-full ${styleForTag(tag)}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                      {expandedPoint.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setExpandedId(null)}
                    className="rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
                  >
                    Close
                  </button>
                </div>

                <p className="text-base md:text-lg leading-8 text-slate-700 dark:text-slate-300 mb-8">
                  {expandedPoint.body}
                </p>

                {expandedPoint.links?.length ? (
                  <div className="pt-5 border-t border-slate-200 dark:border-slate-800">
                    <div className="text-[11px] uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 font-semibold mb-3">
                      Related links
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {expandedPoint.links.map((link) => (
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

                <div className="pt-5 mt-5 border-t border-slate-200 dark:border-slate-800">
                  <div className="text-[11px] uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 font-semibold mb-3">
                    Related SPVs
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {expandedRelated.map((related) => (
                      <button
                        key={related.id}
                        onClick={() => setExpandedId(related.id)}
                        className="text-left rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:border-slate-300 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                      >
                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5">{related.title}</div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-6">{related.oneLiner}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
