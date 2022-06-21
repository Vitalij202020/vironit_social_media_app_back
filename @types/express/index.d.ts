declare namespace Express {
    interface Request {
        user: {
            _id: string;
            nickName: string;
            email: string;
        }
    }
}