import mongoose, {Schema, Document} from "mongoose";

export interface UserModel extends Document {
    nickName: string;
    firstName?: string;
    lastName?: string;
    email: string;
    dateOfBirth?: string;
    sex?: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    nickName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    firstName: {
        type: String,
        trim: true,
        maxlength: 25,
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 25,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    dateOfBirth: {
        type: String,
        trim: true,
        maxlength: 15,
    },
    sex: {
        type: String,
        trim: true,
        maxlength: 5,
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


export default mongoose.model<UserModel>('User', UserSchema);