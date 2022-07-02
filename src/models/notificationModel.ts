import mongoose, {Schema, Document} from "mongoose";

export interface NotificationModel extends Document {
    from: string;
    to: string;
    content: string;
    isRead: boolean;
}

const NotificationSchema: Schema = new Schema({
    from: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    to: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    content: String,
    isRead: {type: Boolean, default: false}
})

export default mongoose.model<NotificationModel>('Notification', NotificationSchema);