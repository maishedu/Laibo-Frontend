import { SessionProvider } from "next-auth/react";
import RootLayout from "./layout";

export default function App({
                                Component,
                                pageProps: { session, ...pageProps },
                            }) {
    return (
        <SessionProvider session={session}>
            <RootLayout {...pageProps} />
        </SessionProvider>
    )
}
