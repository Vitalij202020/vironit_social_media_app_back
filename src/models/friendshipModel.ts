import mongoose, {Schema, Document} from "mongoose";

export interface FriendshipModel extends Document {
    users: string[];
}

const FriendshipSchema: Schema = new Schema({
    users: [{type: mongoose.Types.ObjectId, ref: 'User', required: true}],
})

export default mongoose.model<FriendshipModel>('Friendship', FriendshipSchema);