import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {error} from "next/dist/build/output/log"
import {login} from "../../../../lib/api-util";

const authOptions = {
    session:{
        jwt:true,
        maxAge: 6 * 60 * 60 // 6 hours
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Email/Phone",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Username, Email or Phone" },
                password: { label: "Password", type: "Password" }

            },
            //logic
            async authorize(credentials,req) {
                // Add logic here to look up the user from the credentials supplied
                //get server
                if (credentials) {
                    // Any object returned will be saved in `user` property of the JWT
                    return {
                        //we are saving under email then set session values below
                        email:{
                            email:credentials.email,
                            id:credentials.id,
                            token:credentials.token
                        },
                    }
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.accessToken = token.email.token
            session.user.id = token.email.id
            session.email = token.email.email
            return session
        }
    }
}


const handler =  NextAuth(authOptions);

export {handler as GET, handler as POST};