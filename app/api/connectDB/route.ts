import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import "server-only";

export async function GET(): Promise<NextResponse> {
    try {
        await dbConnect();
        return new NextResponse('connected');
    } catch (err) {
        console.error(err);
        return new NextResponse('Unable to connect', { status: 500 });
    }
}
