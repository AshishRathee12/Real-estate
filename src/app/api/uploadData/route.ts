import { connectCollectionDB } from "@/src/lib/mongo";
import { NextResponse } from "next/server";
import { UserCollection } from "@/src/models/collection";
export async function POST(req:Request) {
  try {
    const data = await req.json();
    console.log(data);
    await connectCollectionDB();
    await UserCollection.create(data);
    return NextResponse.json("created", { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
