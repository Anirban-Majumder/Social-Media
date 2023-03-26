import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { SanityAdapter} from 'next-auth-sanity';
import { sanityClient } from '../../../sanity';

const options = {
  providers: [
    CredentialsProvider({
      name: 'email',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" }
      },async authorize(credentials) {
        const { email, password } = credentials;
        // before these add the password hash field optional field to the sanity database
        // add code to fetch password hash from sanity database of that user/email
        // compare password hash with password
        // if password is correct then return user object  //create api to fetch user object from sanity database
        //const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        const res = await fetch("/your/endpoint", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()

        if (res.ok && user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null or false then the credentials will be rejected
          return null
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/signin'
  },
  session: {
    strategy: 'jwt',
    maxAge: 100 * 24 * 60 * 60, // 100 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: SanityAdapter(sanityClient)
};

export default NextAuth(options);