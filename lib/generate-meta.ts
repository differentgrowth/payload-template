import type { Metadata } from "next"

import { getServerSideURL } from "@/lib/get-url"
import type { Post } from "@/payload-types"

const defaultOpenGraph: Metadata["openGraph"] = {
	type: "website",
	description: "An open-source website built with Payload and Next.js.",
	images: [
		{
			url: `${getServerSideURL()}/website-template-OG.webp`
		}
	],
	siteName: "Payload Website Template",
	title: "Payload Website Template"
}

export const mergeOpenGraph = (
	og?: Metadata["openGraph"]
): Metadata["openGraph"] => {
	return {
		...defaultOpenGraph,
		...og,
		images: og?.images ? og.images : defaultOpenGraph.images
	}
}

export const generateMeta = async (args: {
	doc: Partial<Post>
}): Promise<Metadata> => {
	const { doc } = args || {}

	// const ogImage = getImageURL(doc?.meta?.image)
	const ogImage = false

	const title = doc?.meta?.title
		? `${doc?.meta?.title} | Payload Website Template`
		: "Payload Website Template"

	return {
		description: doc?.meta?.description,
		openGraph: mergeOpenGraph({
			description: doc?.meta?.description || "",
			images: ogImage
				? [
						{
							url: ogImage
						}
					]
				: undefined,
			title,
			url: Array.isArray(doc?.slug) ? doc?.slug.join("/") : "/"
		}),
		title
	}
}
