
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


export function stringFormatting(inputString, sufix) {
    const formattedString = inputString.replace(/\s+/g, '-');
    const result = formattedString + sufix;
    return result;
}

export const slugify = (input, year) => {
    if (!input)
        return '';

    // make lower case and trim
    var slug = input.toLowerCase().trim();

    // remove accents from charaters
    slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    // replace invalid chars with spaces
    slug = slug.replace(/[^a-z0-9\s-]/g, ' ').trim();

    // replace multiple spaces or hyphens with a single hyphen
    slug = slug.replace(/[\s-]+/g, '-');

    // add year at the end of the slug if year is provided
    if (year) {
        slug = slug + '-' + year;
    }

    return slug;
}

export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

export function shortenStringTo30Words(str) {
    const cleanedString = str.replace(/<\/?[^>]+(>|$)/g, "");
    const cleanedStringWithoutTags = cleanedString.replace(/<\/?(p|b|strong|em|i|u|strike)>/g, "");
    const words = cleanedStringWithoutTags.split(' ');
    const shortenedWords = words.slice(0, 30);
    const shortenedString = shortenedWords.join(' ');
    return shortenedString;
}