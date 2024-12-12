import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import type { Post } from "@/payload-types"

export type Props = {
	docs?: Post[]
	className?: string
	intro: string
}

export const RelatedPosts = ({ docs, intro, className }: Props) => {
	return (
		<div className={className}>
			<h3 className="mb-6">{intro}</h3>
			<div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 md:gap-8">
				{docs?.map(({ id, title, categories, slug }) => (
					<Card
						className="relative"
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
	)
}
