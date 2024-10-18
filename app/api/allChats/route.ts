import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import ChatModel from '@/lib/models/Chat';
import UserModel from '@/lib/models/User';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'User not found.' }, { status: 404 });
        }

        const chats = await ChatModel.find({ userEmail: email });

        return NextResponse.json({ chats }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
    }
}