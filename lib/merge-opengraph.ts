import type { Metadata } from "next"

import { getServerSideURL } from "@/lib/get-url"

const defaultOpenGraph: Metadata["openGraph"] = {
	type: "website",
	description:
		"En Different Growth, te ayudamos a impulsar el crecimiento de tu marca con soluciones digitales. Desde diseño web a medida hasta estrategias SEO.",

	images: [
		{
			url: `${getServerSideURL()}/website-template-OG.webp`
		}
	],
	siteName: "Different Growth Website",
	title: "Different Growth Website"
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
