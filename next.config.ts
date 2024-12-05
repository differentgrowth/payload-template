import type { NextConfig } from "next"

import { withPayload } from "@payloadcms/next/withPayload"

const nextConfig: NextConfig = {
	async redirects() {
		return [
			{
				destination: "/ie-incompatible.html",
				has: [
					{
						type: "header",
						key: "user-agent",
						value: "(.*Trident.*)" // all ie browsers
					}
				],
				permanent: false,
				source: "/:path((?!ie-incompatible.html$).*)" // all pages except the incompatibility page
			}
		]
	}
}

export default withPayload(nextConfig)
