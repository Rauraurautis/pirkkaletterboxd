import { exec } from "child_process"
import { NextFunction, Request, Response } from "express"

export const handleWebHookRequest = async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    console.log(payload)
    exec("docker compose pull && docker compose up --build", (err, stdout, stderr) => {
        if (err) {
            console.error(err.message)
            return res.status(500).send("Error happened with updating container")
        }
    })
    console.log('Successfully redeployed the compose');
    res.status(200).send('Compose redeployed successfully').end();

}

