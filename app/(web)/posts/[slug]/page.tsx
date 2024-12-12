import type { Metadata } from "next"
import { draftMode } from "next/headers"
import { cache } from "react"

import { getPayload } from "payload"

import { PayloadRedirects } from "@/components/payload-redirects"
import { RelatedPosts } from "@/components/related-posts"
import { RichText } from "@/components/rich-text"
import { generateMeta } from "@/lib/generate-meta"
import configPromise from "@payload-config"

export const generateStaticParams = async () => {
	const payload = await getPayload({ config: configPromise })
	const posts = await payload.find({
		collection: "posts",
		draft: false,
		limit: 1000,
		overrideAccess: false,
		pagination: false,
		select: {
			slug: true
		}
	})

	const params = posts.docs.map(({ slug }) => {
		return { slug }
	})

	return params
}

export const generateMetadata = async ({
	params: paramsPromise
}: PageProps): Promise<Metadata> => {
	const { slug = "" } = await paramsPromise
	const post = await queryPostBySlug({ slug })

	return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
	const { isEnabled: draft } = await draftMode()

	const payload = await getPayload({ config: configPromise })

	const result = await payload.find({
		collection: "posts",
		draft,
		limit: 1,
		overrideAccess: draft,
		pagination: false,
		where: {
			slug: {
				equals: slug
			}
		}
	})

	return result.docs?.[0] || null
})

type PageProps = {
	params: Promise<{
		slug?: string
	}>
}

const Page = async ({ params: paramsPromise }: PageProps) => {
	const { slug = "" } = await paramsPromise
	const url = `/posts/${slug}`
	const post = await queryPostBySlug({ slug })

	if (!post) return <PayloadRedirects url={url} />

	return (
		<article className="pt-16 pb-16">
			{/* Allows redirects for valid pages too */}
			<PayloadRedirects
				disableNotFound
				url={url}
			/>

			<div className="flex flex-col items-center gap-4 pt-8">
				<div className="container max-w-4xl">
					<RichText
						data={post.content}
						enableGutter={false}
					/>
					{post.relatedPosts && post.relatedPosts.length > 0 && (
						<RelatedPosts
							className="col-span-3 col-start-1 mt-12 max-w-[52rem] grid-rows-[2fr] lg:grid lg:grid-cols-subgrid"
							docs={post.relatedPosts.filter((post) => typeof post === "object")}
							intro="Posts relacionados"
						/>
					)}
				</div>
			</div>
		</article>
	)
}

export default Page
