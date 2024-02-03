
import { format } from "date-fns"
import draftToHtml from "draftjs-to-html"

export const getRawContent = (content) => {
    if (content) {
        const rawContent = JSON.parse(content)
        const markup = draftToHtml(rawContent)
        return markup
    }
}

export const formatMongoDate = (date) => {
    const newDate = new Date(date)
    const formattedDate = format(newDate, 'dd.MM.yyyy')
    return formattedDate
}