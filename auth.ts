import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { dbConnect } from "./lib/dbConnect";
import User from "./lib/models/User";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/login'
  },
  ...authConfig,
  callbacks: {
    async signIn({ user }) {
      const email = user.email;
      try {
        await dbConnect();

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
          const newUser = new User({
            email: user.email,
            name: user.name,
            imageUrl: user.image || '',
            membershipType: 'free',
          });

          await newUser.save();
          console.log("New user created:", newUser);
        } else {
          console.log("User already exists:", existingUser);
        }

        return true;

      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
  },
  secret: process.env.AUTH_SECRET
});
