import path from "node:path"
import { fileURLToPath } from "node:url"

// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres"
import { payloadCloudPlugin } from "@payloadcms/payload-cloud"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { buildConfig } from "payload"
import sharp from "sharp"

import { Users } from "@/collections/Users"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname)
		},
		theme: "light",
		avatar: "gravatar",
		components: {
			graphics: {
				Icon: {
					path: "/components/mark",
					exportName: "Mark"
				},
				Logo: {
					path: "/components/logo",
					exportName: "Logo"
				}
			},
			logout: {
				Button: {
					path: "/components/logout",
					exportName: "LogoutButton"
				}
			},
			actions: [
				{
					path: "/components/account-link",
					exportName: "AccountLink"
				}
			]
		}
	},
	collections: [Users],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts")
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || ""
		}
	}),
	sharp,
	plugins: [
		payloadCloudPlugin()
		// storage-adapter-placeholder
	]
})
