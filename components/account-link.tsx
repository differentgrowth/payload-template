import Link from "next/link"

import { UserCircle } from "@phosphor-icons/react/dist/ssr"

import { buttonVariants } from "@/components/ui/button"

export const AccountLink = () => {
	return (
		<Link
			href="/admin/account"
			className={buttonVariants({ variant: "secondary", size: "icon" })}
		>
			<UserCircle />
		</Link>
	)
}
