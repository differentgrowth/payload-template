import type { CollectionConfig } from "payload"

import { anyone, authenticated } from "@/lib/access"
import { formatSlug } from "@/lib/utils"

export const Posts: CollectionConfig<"posts"> = {
	slug: "posts",
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated
	},
	// This config controls what's populated by default when a post is referenced
	// https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
	// Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
	defaultPopulate: {
		title: true,
		slug: true,
		categories: true
		// meta: {
		// 	image: true,
		// 	description: true
		// }
	},
	admin: {
		defaultColumns: ["title", "slug", "updatedAt"]
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
			localized: true
		},
		{
			name: "categories",
			type: "relationship",
			admin: {
				position: "sidebar"
			},
			hasMany: true,
			relationTo: "categories"
		},
		{
			name: "slug",
			type: "text",
			unique: true,
			required: true,
			admin: {
				position: "sidebar",
				components: {
					Field: {
						path: "@/fields/slug-generator#SlugGenerator"
					}
				}
			}
		}
	],
	hooks: {
		beforeChange: [
			({ data }) => {
				if (data.title) {
					data.slug = formatSlug(data.title)
				}

				return data
			}
		]
	}
}
