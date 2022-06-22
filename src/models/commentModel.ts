import mongoose, {Schema, Document} from "mongoose";

export interface CommentModel extends Document {
    content: string;
    user: string;
    postId: string;
    postUserId: string;
}

const CommentSchema: Schema = new Schema({
    content: {
        type: String,
        required: true,
    },
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    postId: mongoose.Types.ObjectId,
    postUserId: mongoose.Types.ObjectId,
}, {
    timestamps: true
})


export default mongoose.model<CommentModel>('Comment', CommentSchema);