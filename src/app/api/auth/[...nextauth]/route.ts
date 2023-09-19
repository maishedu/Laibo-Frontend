import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {error} from "next/dist/build/output/log";




const handler =  NextAuth({
    session: {
        strategy: "jwt",
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

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
                username: { label: "Email", type: "text", placeholder: "Username, Email or Phone" },
                password: { label: "Password", type: "Password" }
            },
            //logic
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                //get server
                const url = process.env.NEXT_PUBLIC_SERVER_URL;
                const user = await fetch('https://173.214.165.67/laibo/api/customer/login', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "msisdn":"254777591351", //Pass email, phone number or username
                        "password":"tet1234"

                    }),
                })
                    .then((response) => response.json())
                    .catch((error) => {
                        console.error(error);
                        return null;
                    });
console.log(user);
                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return {
                        email:user.email,
                        id:user.email.id,
                        token:user.token
                    }
                } else if (user.status === 0){
                    // @ts-ignore
                    throw new error(user.message);
                }else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ]
})

export {handler as GET, handler as POST};