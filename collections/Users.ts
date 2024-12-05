import type { CollectionConfig } from "payload"

import { anyone, authenticated, isAdmin } from "@/lib/access"

export const Users: CollectionConfig = {
	slug: "users",
	access: {
		admin: authenticated,
		create: anyone,
		delete: isAdmin,
		read: authenticated,
		update: isAdmin
	},
	admin: {
		defaultColumns: ["name", "email", "role"],
		useAsTitle: "name"
	},
	auth: true,
	fields: [
		{
			name: "name",
			type: "text"
		},
		{
			name: "role",
			type: "select",
			options: [
				{ label: "Admin", value: "admin" },
				{ label: "User", value: "user" }
			],
			required: true,
			defaultValue: "user",
			hidden: true
		}
	],
	timestamps: true
}
