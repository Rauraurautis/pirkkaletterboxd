import { NextFunction, Request, Response } from "express"
import fs from "fs"
import userLogger from "../lib/utils/userLogger"

export const logUser = async (req: Request, res: Response, next: NextFunction) => {
    
    const userData = { ip: req.ip, userAgent: req.headers["user-agent"], referer: req.headers["referer"] }
    
    fs.readFile("./log/userlogs.txt", (err, data) => {
        if (err) {
            console.error("Error reading userlog file")
            return next(err)
        }

        if (!data.toString().includes(req.ip)) {
            userLogger.info(userData)
        }
        return next()
    })


}