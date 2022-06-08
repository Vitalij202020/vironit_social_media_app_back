import express, {Application, Request, Response} from 'express'
import logger from "./utils/logger";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB";
import routes from "./routes";
import cors from 'cors';


const app: Application = express()

dotenv.config();

app.use(express.json())
app.use(cors())

app.use('/api', routes)

const PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
    logger.info(`Server is running at http://localhost:${PORT}`)

    await connectDB()
})