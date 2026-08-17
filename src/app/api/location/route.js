import { dbConnect } from "@/src/lib/location";
import { State } from "@/src/models/locations";
import { NextResponse } from "next/server";
export async function GET() {
    try {
        await dbConnect();

        const data = await State.find();
        console.log(data);
        return NextResponse.json(data)

    } catch (error) {
        console.log(error)
    }
}