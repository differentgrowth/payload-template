import Link from "next/link"

import { SignOut } from "@phosphor-icons/react/dist/ssr"

import { buttonVariants } from "@/components/ui/button"

export const LogoutButton = () => {
	return (
		<Link
			href="/admin/logout"
			className={buttonVariants({
				variant: "outline",
				size: "icon",
				className: "inline-flex"
			})}
		>
			<SignOut />
		</Link>
	)
}
