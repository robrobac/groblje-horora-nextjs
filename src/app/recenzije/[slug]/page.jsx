import draftToHtml from "draftjs-to-html";
import Head from "next/head";
import { notFound } from "next/navigation";

async function getData() {
    const res = await fetch(`${process.env.DOMAIN_URL}/api/review`, {cache: 'no-store'});
    if (!res.ok) {
        return notFound();
    }
    return res.json();
}

function shortenStringTo30Words(str) {
    const words = str.split(' ');
    const shortenedWords = words.slice(0, 30);
    const shortenedString = shortenedWords.join(' ');
    return shortenedString + '</p>';
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
        <Head>
        <meta property="og:title" content={data.reviewTitle} />
        <meta
          property="og:description"
          content={shortenStringTo30Words(data.movies[0].reviewContent)}
        />
      </Head>
        <h1>{data.reviewTitle}</h1>

        {shortenStringTo30Words(getRawContent(data.movies[0].reviewContent))}
        
        </>
    );
};

export default SinglePostPage;
