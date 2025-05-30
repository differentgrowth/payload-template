import { revalidateTag } from "next/cache"
import type { CollectionAfterChangeHook } from "payload"

import { CACHE_TAGS } from "@/queries/cache-tags"

export const revalidateRedirects: CollectionAfterChangeHook = ({
	doc,
	req: { payload }
}) => {
	payload.logger.info("Revalidating redirects")
	revalidateTag(CACHE_TAGS.REDIRECTS)

	return doc
}
