import mongoose, {Schema, Document} from "mongoose";

export interface MessageModel extends Document {
    conversation: string;
    sender: string;
    recipient: string;
    message: string;
}

const MessageSchema: Schema = new Schema({
    conversation: {type: mongoose.Types.ObjectId, ref: 'Conversation'},
    sender: {type: mongoose.Types.ObjectId, ref: 'User'},
    recipient: {type: mongoose.Types.ObjectId, ref: 'User'},
    message: String,
}, {timestamps: true})

export default mongoose.model<MessageModel>('Message', MessageSchema);