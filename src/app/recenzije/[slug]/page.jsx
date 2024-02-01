import draftToHtml from "draftjs-to-html";
import { notFound } from "next/navigation";

async function getData() {
    const res = await fetch('http://localhost:3000/api/review', {cache: 'no-store'});
    if (!res.ok) {
        return notFound();
    }
    return res.json();
}

function getRawContent(content) {
    if (content) {
        const rawContent = JSON.parse(content)
        const markup = draftToHtml(rawContent)
        return markup
    }
}

const SinglePostPage = async ({params}) => {
    const data = await getData();
    console.log(data)

    return (
        <>
        <h1>{data.reviewTitle}</h1>
        <p>{data.movies[0].reviewContent}</p>
        </>
    );
};

export default SinglePostPage;
