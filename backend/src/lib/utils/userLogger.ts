import dayjs from "dayjs";
import pino from "pino";
import logger from "pino"

const transport = pino.transport({
    targets: [
        {
            target: "pino/file",
            options: { destination: `./log/userlogs.txt` },
            level: "info"
        }
    ]
})

const userLogger = logger({
    base: {
        pid: false
    },
    mixin: (_context, level) => {

        return {  }
    },

    timestamp: () => `,"time":"${dayjs().format()}"`
}, transport)

export default userLogger