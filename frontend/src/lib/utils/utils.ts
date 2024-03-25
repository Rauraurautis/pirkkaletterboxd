import { intervalToDuration } from "date-fns";

export const formatMinutesToHoursAndMinutes = (minutes: number | undefined) => {

    if (!minutes) {
        return "No duration"
    }

    const duration = intervalToDuration({ start: 0, end: minutes * 60 * 1000 })

    const { minutes: mins, hours } = duration

    if (hours && mins) {
        return `${hours} hours, ${mins} minutes`
    }

    if (hours && !mins) {
        return `${hours} hours`
    }

    if (!hours && mins) {
        return `${mins} minutes`
    }

}

export const releaseYear = (date: string) => {
    return date.substring(0, 4)
}

export const capitalizeString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.substring(1)
}