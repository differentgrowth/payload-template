import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Post } from "@/payload-types"

type Props = { posts: PostData[] }
type PostData = Pick<Post, "slug" | "categories" | "meta" | "title" | "id">

export const CollectionArchive = ({ posts }: Props) => {
	return (
		<div className="container">
			<div>
				<div
					className={cn(
						"grid grid-cols-4 gap-x-4 gap-y-4",
						"sm:grid-cols-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-8 xl:gap-x-8"
					)}
				>
					{posts.map(({ id, title, categories, slug }) => (
						<Card
							className="relative col-span-4"
							key={id}
						>
							<CardHeader className="flex-row flex-wrap gap-3 space-y-0">
								{categories?.map((category) => {
									if (typeof category === "object") {
										const { title: titleFromCategory } = category

										const categoryTitle = titleFromCategory || "Untitled category"

										return (
											<Badge
												key={categoryTitle}
												className="font-mono"
											>
												{categoryTitle}
											</Badge>
										)
									}

									return null
								})}
							</CardHeader>
							<CardContent>
								<CardTitle>{title}</CardTitle>
							</CardContent>
							<CardFooter>
								<Link
									href={`/posts/${slug}`}
									aria-label={title}
								>
									<span className="absolute inset-0" />
								</Link>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</div>
	)
}
