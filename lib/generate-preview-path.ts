import type { CollectionSlug, PayloadRequest } from "payload"

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
	posts: ""
}

type Props = {
	collection: keyof typeof collectionPrefixMap
	slug: string
	req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug, req }: Props) => {
	const encodedParams = new URLSearchParams({
		slug,
		collection,
		path: `${collectionPrefixMap[collection]}/${slug}`,
		previewSecret: process.env.PREVIEW_SECRET || ""
	})

	const url = `/api/v1/preview?${encodedParams.toString()}`

	return url
}
