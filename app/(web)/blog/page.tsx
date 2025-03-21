import { unstable_cache } from "next/cache"
import { notFound } from "next/navigation"
import type { Metadata } from "next/types"

import { getPayload } from "payload"

import { CollectionArchive } from "@/components/collection-archive"
import { PageRange } from "@/components/page-range"
import { PostsPagination } from "@/components/posts-pagination"
import configPromise from "@payload-config"

export const generateMetadata = (): Metadata => {
	return {
		title: "DifferentGrowth Blog"
	}
}

const getData = unstable_cache(
	async () => {
		const payload = await getPayload({ config: configPromise })
		const posts = await payload.find({
			collection: "posts",
			depth: 1,
			limit: 12,
			overrideAccess: false,
			select: {
				slug: true,
				title: true,
				caption: true,
				categories: true,
				meta: true
			}
		})

		return posts
	},
	["posts"],
	{
		tags: ["posts"]
	}
)

export default async function Page() {
	const posts = await getData()

	if (!posts.totalDocs) notFound()

	return (
		<div className="pt-24 pb-24">
			<div className="container mb-16">
				<div>
					<h1>Posts</h1>
				</div>
			</div>

			<div className="container mb-8">
				<PageRange
					collection="posts"
					currentPage={posts.page}
					limit={12}
					totalDocs={posts.totalDocs}
				/>
			</div>

			<CollectionArchive posts={posts.docs} />

			{posts.totalPages > 1 && posts.page ? (
				<PostsPagination
					page={posts.page}
					totalPages={posts.totalPages}
				/>
			) : null}
		</div>
	)
}
