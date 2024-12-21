"use client"

import { useEffect, useState } from "react"

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
	const [tempValue, setTempValue] = useState(value)

	const targetFieldValue = useFormFields(([fields]) => {
		return fields.title?.value as string
	})

	const handleClick = () => {
		const formattedSlug = formatSlug(targetFieldValue)

		if (value !== formattedSlug) setValue(formattedSlug)
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (value !== tempValue) setValue(formatSlug(tempValue))
	}, [tempValue])

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
				placeholder="Generate a slug"
				value={value}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setTempValue(e.target.value)
				}
			/>
		</div>
	)
}
