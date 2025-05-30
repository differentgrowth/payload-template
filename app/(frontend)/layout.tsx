import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import {
	CheckCircleIcon,
	InfoIcon,
	SpinnerIcon,
	WarningIcon,
	XCircleIcon
} from "@phosphor-icons/react/dist/ssr"

import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { getServerSideURL } from "@/lib/get-url"
import { cn } from "@/lib/utils"

import "./globals.css"

const fontSans = Geist({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono"
})

export const metadata: Metadata = {
	title: {
		default: "Different Growth | Potenciando tu marca con estrategias digitales",
		template: "%s | Different Growth"
	},
	description:
		"En Different Growth, te ayudamos a impulsar el crecimiento de tu marca con soluciones digitales. Desde diseño web a medida hasta estrategias SEO.",
	metadataBase: new URL(getServerSideURL()),
	alternates: {
		canonical: getServerSideURL()
	},
	openGraph: {
		title: "Different Growth",
		description:
			"En Different Growth, te ayudamos a impulsar el crecimiento de tu marca con soluciones digitales. Desde diseño web a medida hasta estrategias SEO.",
		url: `${getServerSideURL()}/`,
		siteName: "Different Growth",
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
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="es-ES"
			className={cn(fontSans.variable, fontMono.variable, "antialiased")}
			suppressHydrationWarning
		>
			<body className="selection:bg-primary selection:text-primary-foreground">
				<ThemeProvider
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster
						richColors
						toastOptions={{
							classNames: {
								error: "bg-destructive-foreground text-destructive",
								success: "bg-success-foreground text-success",
								warning: "bg-warning-foreground text-warning",
								info: "bg-info-foreground text-info"
							}
						}}
						icons={{
							success: <CheckCircleIcon className="size-4" />,
							info: <InfoIcon className="size-4" />,
							warning: <WarningIcon className="size-4" />,
							error: <XCircleIcon className="size-4" />,
							loading: <SpinnerIcon className="size-4" />
						}}
						closeButton
					/>
					<TailwindIndicator position="right" />
				</ThemeProvider>
			</body>
		</html>
	)
}
