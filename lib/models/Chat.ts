import mongoose, { Document, Schema, model } from 'mongoose';

export interface IChat extends Document {
    userEmail: string;
    roomId: string;
    title?: string;
    messages: {
        request: string;
        response: string;
        timestamp: Date;
    }[];
}

const chatSchema = new Schema<IChat>({
    userEmail: { type: String, ref: 'User', required: true },
    roomId: { type: String, required: true },
    title: { type: String },  // Add title field
    messages: [
        {
            request: { type: String, required: true },
            response: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        },
    ],
});
chatSchema.index({ userEmail: 1, roomId: 1 }, { unique: true });

chatSchema.pre('save', function (next) {
    const chat = this as IChat;
    if (!chat.title && chat.messages.length > 0) {
        const firstRequest = chat.messages[0].request;
        chat.title = firstRequest.split(' ').slice(0, 5).join(' ');
    }

    next();
});

const ChatModel = mongoose.models.Chat || mongoose.model<IChat>('Chat', chatSchema);

export default ChatModel;