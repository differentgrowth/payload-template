import { revalidatePath } from "next/cache"

import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook
} from "payload"

import type { Post } from "@/payload-types"

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
	doc,
	previousDoc,
	req: { payload, context }
}) => {
	if (!context.disableRevalidate) {
		if (doc._status === "published") {
			const path = `/blog/${doc.slug}`

			payload.logger.info("Revalidating blog layout")
			revalidatePath("/blog", "layout")

			payload.logger.info(`Revalidating post at path: ${path}`)
			revalidatePath(path, "page")
		}

		// If the post was previously published, we need to revalidate the old path
		if (previousDoc._status === "published" && doc._status !== "published") {
			const oldPath = `/blog/${previousDoc.slug}`

			payload.logger.info(`Revalidating old post at path: ${oldPath}`)

			revalidatePath(oldPath)
		}
	}
	return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({
	doc,
	req: { context }
}) => {
	if (!context.disableRevalidate) {
		const path = `/blog/${doc?.slug}`

		revalidatePath(path)
	}

	return doc
}
