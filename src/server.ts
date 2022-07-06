import express, {Application} from 'express'
import logger from "./utils/logger";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB";
import routes from "./routes";
import cors from 'cors';
import {Socket} from "socket.io";

const io = require("socket.io")(8800, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let onlineUsers: any[] = [];

const app: Application = express()

dotenv.config();

app.use(express.json())
app.use(cors())
app.use('/static', express.static('public'));

app.use('/api', routes)

const PORT = process.env.PORT || 5000



app.listen(PORT, async () => {
    logger.info(`Server is running at http://localhost:${PORT}`)
    await connectDB()
})

// Socket
io.on("connection", (socket: Socket) => {
    logger.info(`Socket Connected ${socket.id}`)
    // add new User
    socket.on("addUser", (newUserId) => {
        // if user is not added previously
        if (!onlineUsers.some((user) => user.userId === newUserId)) {
            onlineUsers.push({ userId: newUserId, socketId: socket.id });
        }
        // send all online users to new user
        io.emit("getUsers", onlineUsers);
    });

    socket.on("disconnect", () => {
        logger.info(`Socket Disconnected ${socket.id}`)
        // remove user from online users
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        // send all active users to all users
        io.emit("getUsers", onlineUsers);
    });

    // send message to a specific user
    socket.on("sendMessage", (data) => {
        const { recipient } = data;
        const user = onlineUsers.find((user) => user.userId === recipient._id);
        if (user) {
            io.to(user.socketId).emit("receiveMessage", data);
        }
    });
});