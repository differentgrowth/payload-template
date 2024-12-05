import type { User } from "@/payload-types"
import type { Access, AccessArgs } from "payload"

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const anyone: Access = () => true

export const authenticated: isAuthenticated = ({ req: { user } }) => {
	return Boolean(user)
}

export const isAdmin: isAuthenticated = ({ req: { user } }) => {
	return Boolean(user && user.role === "admin")
}
