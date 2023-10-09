import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        email:string
        accessToken:string
        user: {
            /** The user's postal address. */
            email: object
        } & DefaultSession["user"]
    }
}