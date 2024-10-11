import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import ChatModel from '@/lib/models/Chat';
import UserModel from '@/lib/models/User';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const { email, request, response } = body;

        if (!email || !request || !response) {
            return NextResponse.json({ message: 'Email, request, and response are required.' }, { status: 400 });
        }
        const user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: 'User not found.' }, { status: 404 });
        }

        const chat = await ChatModel.findOne({ userId: user._id });

        if (chat) {
            chat.messages.push({ request, response, timestamp: new Date() });
            await chat.save();
        } else {
            const newChat = new ChatModel({
                userId: user._id,
                messages: [{ request, response, timestamp: new Date() }],
            });
            await newChat.save();
        }
        return NextResponse.json({ message: 'Chat saved successfully.' }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
    }
}

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

        const chat = await ChatModel.findOne({ userId: user._id });

        if (!chat) {
            return NextResponse.json({ message: 'No chat history found for this user.' }, { status: 404 });
        }

        return NextResponse.json({ messages: chat.messages }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
    }
}
