import Pagination from "@/components/pagination/Pagination";
import PaginationSSR from "@/components/pagination/PaginationSSR";
import PostsFlex from "@/components/reviewsGallery/postsFlex/PostsFlex";
import TitleSubtitle from "@/components/reviewsGallery/titleSubtitle/TitleSubtitle";
import { sortedTags } from "@/lib/tags";

export const dynamic = 'force-dynamic';


const getData = async (tag, page, perPage) => {
    console.log(tag, page, perPage)
    const res = await fetch(`${process.env.DOMAIN_URL}/api/tags/${tag}?page=${page}&perPage=${perPage}`);
    console.log(`Reviews with ${tag} tag fetched`)
    
    if (!res.ok) {
        throw new Error(`Failed to fetch Reviews with ${tag} tag`);
    }
    return res.json();
}

export const generateMetadata = async ({params, searchParams}) => {
    const {tag} = params;
    const {page} = searchParams;
    const data = await getData(tag, page, 20);

    const tags = sortedTags;
    const filteredTag = tags.filter(tagValue => tagValue.tagValue === tag)
    const currentTag = filteredTag[0].tagLabel

    return {
        title: currentTag,
        description: `Recenzije oznacene s oznakom ${currentTag}: ${data.reviews.map(review => review.reviewTitle).join(', ')}`,
        openGraph: {
        //     images: data.movies[0].singleOgImage,
        //     type: 'article',
        //     title: data?.reviewTitle,
            description: data.reviews.map(review => review.reviewTitle).join(', '),
        },
        // alternates: {
        //     canonical: `https://www.groblje-horora.com/recenzije/${data?.slug}`
        // }
    }
}

const SingleTagPage = async ({params, searchParams}) => {
    const {tag} = params;
    const tags = sortedTags;
    const {page} = searchParams;

    const reviews = await getData(tag, page, 20);
    console.log(page)

    const filteredTag = tags.filter(tagValue => tagValue.tagValue === tag)
    const currentTag = filteredTag[0].tagLabel
    

    return (
        <main className="reviewsContainer smallerContainerHeight">
            <TitleSubtitle
                title={`${currentTag} (${reviews.reviewsCount})`}
                subtitle={`Recenzije oznacene s oznakom ${currentTag}`}
            />
            <PostsFlex posts={reviews.reviews} />
            {reviews.reviews.length !== 0 ? 
                <PaginationSSR tag={tag} page={page == undefined ? 1 : parseInt(page)} totalPages={reviews.totalPages}/>
            : ""} 
        </main>
    );
};

export default SingleTagPage;
