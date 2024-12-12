import type { DefaultNodeTypes } from "@payloadcms/richtext-lexical"
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import {
	type JSXConvertersFunction,
	RichText as RichTextWithoutBlocks
} from "@payloadcms/richtext-lexical/react"

import { cn } from "@/lib/utils"

type NodeTypes = DefaultNodeTypes
// | SerializedBlockNode<>

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
	defaultConverters
}) => ({
	...defaultConverters,
	blocks: {}
})

type Props = {
	data: SerializedEditorState
	enableGutter?: boolean
	enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const RichText = (props: Props) => {
	const { className, enableProse = true, enableGutter = true, ...rest } = props
	return (
		<RichTextWithoutBlocks
			converters={jsxConverters}
			className={cn(
				{
					"container ": enableGutter,
					"max-w-none": !enableGutter,
					"prose md:prose-md dark:prose-invert mx-auto": enableProse
				},
				className
			)}
			{...rest}
		/>
	)
}
