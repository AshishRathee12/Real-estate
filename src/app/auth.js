import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/src/lib/mongo";
import { User } from "../models/users";

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {

                await dbConnect();

                const user = await User.findOne({
                    email: credentials.email
                });

                if (!user) {
                    throw new Error("User not found");
                }

                const isMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isMatch) {
                    throw new Error("wrong password");
                }
                console.log(user, "user return")
                return user;
            }
        }),
    ]
})
