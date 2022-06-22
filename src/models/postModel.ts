import mongoose, {Schema, Document} from "mongoose";

export interface PostModel extends Document {
    content: string;
    images: string;
    user: string;
    likes: string[];
    comments: string[];
}

const PostSchema: Schema = new Schema({
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: 'https://3.bp.blogspot.com/-Wdtjfs2hm9w/V33YW6LFPZI/AAAAAAAAaA8/KqBjOA4BBmkanB-TPslcsxkxvAcXpzNmwCLcB/s400/buyers_guide_-_abarth_500_2014_-_rear_quarter.jpg'
    },
    likes: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    comments: [{type: mongoose.Types.ObjectId, ref: 'Comment'}],
    user: {type: mongoose.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
})


export default mongoose.model<PostModel>('Post', PostSchema);