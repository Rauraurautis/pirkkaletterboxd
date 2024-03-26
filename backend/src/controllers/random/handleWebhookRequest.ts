import { exec } from "child_process"
import { NextFunction, Request, Response } from "express"
import Docker from "dockerode"
import DockerodeCompose from "dockerode-compose"

export const handleWebHookRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {

        

        console.log('Successfully redeployed the compose');
        return res.status(200).send('Compose redeployed successfully');
    } catch (error) {
        next(error)
    }
}

