import mongoose, {Schema, Document} from "mongoose";

export interface FriendRequestModel extends Document {
    from: string;
    to: string;
}

const FriendRequestSchema: Schema = new Schema({
    from: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    to: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
})

export default mongoose.model<FriendRequestModel>('FriendRequest', FriendRequestSchema);