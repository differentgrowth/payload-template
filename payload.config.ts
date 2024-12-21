import path from "node:path"
import { fileURLToPath } from "node:url"

// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres"
import { payloadCloudPlugin } from "@payloadcms/payload-cloud"
import { redirectsPlugin } from "@payloadcms/plugin-redirects"
import { seoPlugin } from "@payloadcms/plugin-seo"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { buildConfig } from "payload"
import sharp from "sharp"

import { Categories } from "@/collections/Categories"
import { Posts } from "@/collections/Posts"
import { Users } from "@/collections/Users"
import { revalidateRedirects } from "@/hooks/revalidate-redirects"

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
	collections: [Categories, Posts, Users],
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
		payloadCloudPlugin(),
		seoPlugin({}),
		redirectsPlugin({
			collections: ["posts"],
			overrides: {
				// @ts-expect-error
				fields: ({ defaultFields }) => {
					return defaultFields.map((field) => {
						if ("name" in field && field.name === "from") {
							return {
								...field,
								admin: {
									description:
										"You will need to rebuild the website when changing this field."
								}
							}
						}
						return field
					})
				},
				hooks: {
					afterChange: [revalidateRedirects]
				}
			}
		})
	]
})
