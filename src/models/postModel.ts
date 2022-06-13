import mongoose, {Schema, Document} from "mongoose";

export interface PostModel extends Document {
    content: string;
    images: string[];
    user: string[];
}

const PostSchema: Schema = new Schema({
    content: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
    likes: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    user: {type: mongoose.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
})


export default mongoose.model<PostModel>('Post', PostSchema);