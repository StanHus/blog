"use client"

import { useState } from "react"
import { allPosts } from "@/.contentlayer/generated"
import { TransitionLink } from "@/components/transition-link"

const tagStyles = {
  topic: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  stance: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
}

type Tab = "personal" | "professional"

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("professional")

  const filteredPosts = allPosts
    .filter((post) => (post.category ?? "professional") === activeTab)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div>
      {/* Toggle */}
      <div className="flex gap-1 mb-8 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit not-prose">
        {(["professional", "personal"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-sm rounded-md capitalize transition-all ${
              activeTab === tab
                ? "bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="prose dark:prose-invert">
        {filteredPosts.map((post) => (
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
                <span className={`text-[10px] w-20 text-center px-1.5 py-0.5 rounded ${tagStyles.topic}`}>
                  {post.topic}
                </span>
                <span className={`text-[10px] w-20 text-center px-1.5 py-0.5 rounded ${tagStyles.stance}`}>
                  {post.stance}
                </span>
              </div>
            </div>
            {post.description && <p>{post.description}</p>}
          </article>
        ))}
      </div>
    </div>
  )
}
