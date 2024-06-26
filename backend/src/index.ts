require('dotenv').config();
import express from "express"
import cors from "cors"
import routes from "./routes"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import { deserializeUser } from "./middleware/deserializeUser";
import connect from "./lib/utils/connect";
import { errorHandler } from "./middleware/errorHandler";
import logger from "./lib/utils/logger";
import path from "path";
import { logUser } from "./middleware/logUser";


const app = express()

app.use(cors({ origin: ["http://80.220.95.201", "http://localhost:5173", "http://localhost"], optionsSuccessStatus: 200, credentials: true }))
// app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(cookieParser())
app.use(express.json())
app.use(deserializeUser)
app.use(logUser)
app.use('/api/uploads', express.static('uploads'));

const PORT = process.env.PORT

app.listen(PORT, async () => {
    logger.info(`Listening to PORT ${PORT}`)
    await connect()
    routes(app)
    /*app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
    });  */
    app.use(errorHandler)
})

