import { SignOut } from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"

export const LogoutButton = () => {
	return (
		<Button
			variant="secondary"
			size="icon"
		>
			<SignOut />
		</Button>
	)
}