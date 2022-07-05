import mongoose, {Schema, Document} from "mongoose";

export interface ConversationModel extends Document {
    recipients: any[];
    message: string;
}

const ConversationSchema: Schema = new Schema({
    recipients: [{type: mongoose.Types.ObjectId, ref: 'User', required: true}],
    message: String,
}, {timestamps: true})

export default mongoose.model<ConversationModel>('Conversation', ConversationSchema);