"use client"

import {
	Button,
	FieldLabel,
	TextInput,
	useField,
	useFormFields
} from "@payloadcms/ui"

import { formatSlug } from "@/lib/utils"

export const SlugGenerator = () => {
	const { value, setValue } = useField<string>({ path: "slug" })

	const targetFieldValue = useFormFields(([fields]) => {
		return fields.title?.value as string
	})

	const handleClick = () => {
		const formattedSlug = formatSlug(targetFieldValue)

		if (value !== formattedSlug) setValue(formattedSlug)
	}

	return (
		<div>
			<div className="flex items-center justify-between">
				<FieldLabel
					htmlFor="slug"
					label="Slug"
				/>

				<Button
					type="button"
					onClick={handleClick}
				>
					Generate
				</Button>
			</div>

			<TextInput
				path="slug"
				readOnly
				placeholder="Generate a slug"
				value={value}
			/>
		</div>
	)
}
