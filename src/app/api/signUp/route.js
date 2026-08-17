import { NextResponse } from "next/server";
import { dbConnect } from "@/src/lib/mongo";
import { User } from "@/src/models/users";
import bcrypt from "bcryptjs";

export async function POST(request) {

    try {
        const { email, name, password } = await request.json();

        if (!email || !name || !password) {
            return new NextResponse("all field required", { status: 400 })
        }


        await dbConnect()

        const emailexist = await User.findOne({ email })
        if (emailexist) {
            return new NextResponse("Email already exists", { status: 400 })
        }


        const hashedPassword = await bcrypt.hash(password,6)

        await User.create({
            name,
            email,
            password: hashedPassword
        });

        return new NextResponse("user has been created", { status: 200 })
    } catch (error) {
        console.log(error)
    }

}