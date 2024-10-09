import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import Twitter from "next-auth/providers/twitter"
import type { NextAuthConfig } from "next-auth"
import Instagram from "next-auth/providers/instagram"
 
export default { 
    providers: [Google,Facebook,
        Twitter({
            clientId: process.env.AUTH_TWITTER_ID,
            clientSecret: process.env.AUTH_TWITTER_SECRET,
            authorization: {
                params: {
                    redirect_uri: 'http:localhost:3000/api/auth/callback/twitter',
                },
            },
        }),
        Instagram,
    ] 
} satisfies NextAuthConfig