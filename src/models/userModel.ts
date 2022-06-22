import mongoose, {Schema, Document} from "mongoose";

export interface UserModel extends Document {
    nickName: string;
    firstName?: string;
    lastName?: string;
    email: string;
    dateOfBirth?: string;
    story?: string;
    sex?: string;
    password: string;
    avatar: string;
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
        maxlength: 7,
    },
    story: {
        type: String,
        default: 'I am filing good!'
    },
    avatar: {
        type: String,
        default: 'https://alexeykrol.com/wp-content/uploads/2018/12/karolyn-fox-foto.1024x1024.jpg'
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


export default mongoose.model<UserModel>('User', UserSchema);