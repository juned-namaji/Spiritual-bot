import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import ChatModel from '@/lib/models/Chat';
import UserModel from '@/lib/models/User';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const { email, roomId, request, response } = body;

        if (!email || !roomId || !request || !response) {
            return NextResponse.json(
                { message: 'Email, roomId, request, and response are required.' },
                { status: 400 }
            );
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'User not found.' }, { status: 404 });
        }

        let chat = await ChatModel.findOne({ userEmail: email, roomId });

        if (chat) {
            // Push new message to existing chat
            chat.messages.push({ request, response, timestamp: new Date() });
            await chat.save();
        } else {
            const title = request.split(' ').slice(0, 5).join(' ');

            chat = new ChatModel({
                userEmail: email,
                roomId,
                title,
                messages: [{ request, response, timestamp: new Date() }],
            });
            await chat.save();
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
        const roomId = searchParams.get('roomId');

        if (!email || !roomId) {
            return NextResponse.json(
                { message: 'Email and roomId are required.' },
                { status: 400 }
            );
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'User not found.' }, { status: 404 });
        }

        const chat = await ChatModel.findOne({ userEmail: email, roomId });
        if (!chat) {
            return NextResponse.json({ message: 'No chat history found for this user and room.' }, { status: 200 });
        }

        return NextResponse.json({
            id: roomId,
            userId: email,
            title: chat.title,
            messages: chat.messages
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
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

        await ChatModel.deleteMany({ userEmail: email });

        return NextResponse.json({ message: 'All chats deleted successfully.' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
    }
}
