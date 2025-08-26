
import { format } from "date-fns"
import draftToHtml from "draftjs-to-html"
import mongoose from "mongoose"

export const getRawContent = (content) => {
    if (content) {
        const rawContent = JSON.parse(content)
        const markup = draftToHtml(rawContent)
        return markup
    }
}

export const updateContentAlt = (htmlString, movieTitle, movieYear) => {
    let counter = 1;
    // Define the regular expression pattern
    const regex = /alt="undefined"/g;
    
    // Use replace method with a callback function
    const updatedHtml = htmlString.replace(regex, function(match) {
        // Replace each occurrence of alt="undefined" with alt="undefined{n}"
        const replacement = `alt="Scena iz filma ${movieTitle}(${movieYear}) ${counter}"`;
        counter++; // Increment the counter for next occurrence
        return replacement;
    });
    
    return updatedHtml;
}

export const formatMongoDate = (date) => {
    const newDate = new Date(date)
    const formattedDate = format(newDate, 'dd.MM.yyyy')
    return formattedDate
}

export const getCountAll = async (env) => {
    const res = await fetch(`${process.env.DOMAIN_URL}/api/countAllReviews`, { next: { revalidate: 5 } });
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

export async function getReviewsFromIds(ids) {
    if (!ids || ids.length === 0) {
        return [];
    }

    const params = new URLSearchParams();
    ids.forEach(id => params.append("ids", id));

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/reviewsFromIds?${params.toString()}`
    );

    if (!res.ok) {
        throw new Error("Failed to search Reviews data");
    }

    const json = await res.json();
    return json.reviews;
}

export async function getSlugsFromIds(ids) {
    if (!ids || ids.length === 0) {
        return [];
    }

    const params = new URLSearchParams();
    ids.forEach(id => params.append("ids", id));

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/slugsFromIds?${params.toString()}`
    );

    if (!res.ok) {
        throw new Error("Failed to search Reviews data");
    }

    const json = await res.json();
    return json.reviews;
}

export function toObjectIds(ids=[]) {
    return ids.filter(mongoose.isValidObjectId).map(id => new mongoose.Types.ObjectId(id));
}

export function getCurrentTime() {
    const now = new Date();
    const formattedTime = `${now.toLocaleString()}:${now.getMilliseconds().toString().padStart(3, '0')}`;
    return formattedTime;   
}