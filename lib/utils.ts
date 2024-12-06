import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const formatSlug = (str: string): string => {
	return str
		.normalize("NFD") // Normalize to decompose diacritical marks
		.replace(/\u0300-\u036f/g, "") // Remove diacritical marks (accents)
		.replace(/[^a-zA-Z0-9\s-]/g, "") // Remove any non-alphanumeric or space/dash characters
		.trim() // Remove whitespace from start and end
		.replace(/\s+/g, "-") // Replace spaces with a single dash
		.replace(/-+/g, "-") // Remove multiple dashes
		.toLowerCase() // Convert to lowercase
}
