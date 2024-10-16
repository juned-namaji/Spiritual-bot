import mongoose, { Document, Schema, model } from 'mongoose';

export interface IChat extends Document {
    userEmail: string;
    roomId: string;  
    messages: {
        request: string;
        response: string;
        timestamp: Date;
    }[];
}

const chatSchema = new Schema<IChat>({
    userEmail: { type: String, ref: 'User', required: true },  
    roomId: { type: String, required: true },
    messages: [
        {
            request: { type: String, required: true },
            response: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        },
    ],
});
chatSchema.index({ userEmail: 1, roomId: 1 }, { unique: true });

const ChatModel = mongoose.models.Chat || mongoose.model<IChat>('Chat', chatSchema);

export default ChatModel;
