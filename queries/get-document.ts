import { unstable_cache } from "next/cache"
import { getPayload } from "payload"

import type { Config } from "@/payload-types"
import configPromise from "@payload-config"

type Collection = keyof Config["collections"]

async function getDocument(collection: Collection, slug: string, depth = 0) {
	const payload = await getPayload({ config: configPromise })
	const { docs } = await payload.find({
		collection,
		depth,
		limit: 1,
		where: {
			slug: {
				equals: slug
			}
		}
	})

	return docs.at(0)
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedDocument = (collection: Collection, slug: string) =>
	unstable_cache(async () => getDocument(collection, slug), [collection, slug], {
		tags: [`${collection}_${slug}`]
	})
