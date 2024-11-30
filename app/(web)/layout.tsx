import type { Metadata, Viewport } from "next"

import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { COMPANY_DATA } from "@/config/company"
import { cn } from "@/lib/utils"

import "@/app/(web)/globals.css"

export const metadata: Metadata = {
	title: {
		default: "Different Growth | Potenciando tu marca con estrategias digitales",
		template: `%s | ${COMPANY_DATA.NAME}`
	},
	description:
		"En Different Growth, te ayudamos a impulsar el crecimiento de tu marca con soluciones digitales. Desde diseño web a medida hasta estrategias SEO.",
	metadataBase: new URL(COMPANY_DATA.URL),
	alternates: {
		canonical: COMPANY_DATA.URL
	},
	openGraph: {
		title: COMPANY_DATA.NAME,
		description:
			"En Different Growth, te ayudamos a impulsar el crecimiento de tu marca con soluciones digitales. Desde diseño web a medida hasta estrategias SEO.",
		url: `${COMPANY_DATA.URL}/`,
		siteName: COMPANY_DATA.NAME,
		locale: "es_ES",
		type: "website"
	},
	formatDetection: {
		email: false,
		address: false,
		telephone: false
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1
		}
	}
}

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	minimumScale: 1,
	maximumScale: 1,
	userScalable: false,
	colorScheme: "light dark",
	themeColor: [
		{
			media: "(prefers-color-scheme: light)",
			color: "#fafaf9"
		},
		{
			media: "(prefers-color-scheme: dark)",
			color: "#0c0a09"
		}
	]
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang="es-ES"
			className={cn("antialiased", GeistSans.variable, GeistMono.variable)}
		>
			<body>{children}</body>
		</html>
	)
}
