
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

export const getCountAll = async (env) => {
    const res = await fetch(`${process.env.DOMAIN_URL}/api/countAllReviews`);
    if (!res.ok) {
        throw new Error('Failed to fetch countAllReviews data');
    }
    return res.json();
}

export const handleLastVisitedURL = (pathname, searchParams) => {
    var path = pathname
    if (searchParams.size === 0) {
        path = pathname
    } else {
        path = pathname + '?' + searchParams.toString()
    }
    sessionStorage.setItem('lastVisitedUrl', path);
}