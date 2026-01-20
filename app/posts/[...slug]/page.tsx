import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import { Metadata } from "next"
import { Mdx } from "@/components/mdx-components"

interface PostProps {
  params: {
    slug: string[]
  }
}

const tagStyles = {
  topic: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  stance: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <article className="py-6 prose dark:prose-invert">
      <h1 className="mb-2">{post.title}</h1>
      <div className="flex gap-1.5 mb-3 not-prose">
        <span className={`text-[10px] w-20 text-center px-1.5 py-0.5 rounded ${tagStyles.topic}`}>
          {post.topic}
        </span>
        <span className={`text-[10px] w-20 text-center px-1.5 py-0.5 rounded ${tagStyles.stance}`}>
          {post.stance}
        </span>
      </div>
      {post.description && (
        <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
          {post.description}
        </p>
      )}
      <hr className="my-4" />
      <Mdx code={post.body.code} />
    </article>
  )
}
