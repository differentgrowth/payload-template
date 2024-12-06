import type { CollectionConfig } from "payload"

import { anyone, authenticated, isAdmin } from "@/lib/access"

export const Categories: CollectionConfig = {
	slug: "categories",
	access: {
		create: isAdmin,
		delete: isAdmin,
		read: anyone,
		update: authenticated
	},
	admin: {
		useAsTitle: "title"
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true
		}
	]
}
