import mongoose, { Document, Schema, model } from 'mongoose';

export interface IChat extends Document {
    userId: Schema.Types.ObjectId; 
    messages: {
        request: string;     
        response: string;    
        timestamp: Date;     
    }[];
}

const chatSchema = new Schema<IChat>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    messages: [
        {
            request: { type: String, required: true },
            response: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        },
    ],
});
const ChatModel = mongoose.models.Chat || mongoose.model<IChat>('Chat', chatSchema);

export default ChatModel;
