import draftToHtml from "draftjs-to-html"

export const getRawContent = (content) => {
    if (content) {
        const rawContent = JSON.parse(content)
        const markup = draftToHtml(rawContent)
        return markup
    }
}