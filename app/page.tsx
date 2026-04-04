"use client"

import { useState } from "react"
import { allPosts } from "@/.contentlayer/generated"
import { TransitionLink } from "@/components/transition-link"

const TOPICS = ["all", "ai", "leadership", "behavior", "strategy"] as const
type Topic = typeof TOPICS[number]

const topicStyles: Record<string, string> = {
  ai:         "bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
  leadership: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  behavior:   "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  strategy:   "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
}

const stanceStyles: Record<string, string> = {
  observational: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  contrarian:    "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  debatable:     "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
}

export default function Home() {
  const [activeTopic, setActiveTopic] = useState<Topic>("all")

  const sortedPosts = allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter((post) => activeTopic === "all" || post.topic === activeTopic)

  return (
    <div>
      {/* Topic tabs */}
      <div className="flex flex-wrap gap-1.5 mb-8 not-prose">
        {TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => setActiveTopic(topic)}
            className={`text-[11px] px-3 py-1 rounded-full capitalize transition-colors ${
              activeTopic === topic
                ? topic === "all"
                  ? "bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900"
                  : `${topicStyles[topic]} ring-1 ring-current`
                : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Post list */}
      <div className="prose dark:prose-invert">
        {sortedPosts.map((post) => (
          <article key={post._id}>
            <TransitionLink href={post.slug}>
              <h2>{post.title}</h2>
            </TransitionLink>
            <div className="flex items-center gap-3 mt-[-0.5rem] mb-2 not-prose">
              <time className="text-[11px] text-slate-500 dark:text-slate-400">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <div className="flex gap-1.5">
                {post.topic && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded capitalize ${topicStyles[post.topic] ?? ""}`}>
                    {post.topic}
                  </span>
                )}
                {post.stance && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded capitalize ${stanceStyles[post.stance] ?? ""}`}>
                    {post.stance}
                  </span>
                )}
              </div>
            </div>
            {post.description && <p>{post.description}</p>}
          </article>
        ))}
        {sortedPosts.length === 0 && (
          <p className="text-slate-400 dark:text-slate-500 text-sm">No posts in this category yet.</p>
        )}
      </div>
    </div>
  )
}
