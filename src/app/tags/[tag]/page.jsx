import Footer from "@/components/footer/footer";
import PaginationSSR from "@/components/pagination/PaginationSSR";
import PaginationRedirectLoading from "@/components/PaginationRedirectLoading";
import PostsFlex from "@/components/reviewsGallery/postsFlex/PostsFlex";
import TitleSubtitle from "@/components/reviewsGallery/titleSubtitle/TitleSubtitle";
import { sortedTags } from "@/lib/tags";

export const dynamic = 'force-dynamic';


const getData = async (tag, page, perPage) => {
    // console.log(tag, page, perPage) // Keep in Development
    const res = await fetch(`${process.env.DOMAIN_URL}/api/tags/${tag}?page=${page}&perPage=${perPage}`);
    // console.log(`Reviews with ${tag} tag fetched`) // Keep in Development
    
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
        title: `Oznaka: ${currentTag} | Groblje Horora`,
        description: `Recenzije označene s oznakom ${currentTag} (${data.reviewsCount})`,
        openGraph: {
            title: `Oznaka: ${currentTag} | Groblje Horora`,
            description: `Recenzije označene s oznakom ${currentTag} (${data.reviewsCount})`,
            images: "https://firebasestorage.googleapis.com/v0/b/groblje-horora-89186.appspot.com/o/openGraph%2Fnaslovna-open-graph-image.jpg?alt=media&token=f3353588-ef68-4322-9b07-81deece6b70d",
        },
        alternates: {
            canonical: `${process.env.DOMAIN_URL}/tags/${tag}`
        }
    }
}

const SingleTagPage = async ({params, searchParams}) => {
    const {tag} = params;
    const tags = sortedTags;
    const {page} = searchParams;

    const reviews = await getData(tag, page, 20);
    // console.log(page) // Keep in Development

    const filteredTag = tags.filter(tagValue => tagValue.tagValue === tag)
    const currentTag = filteredTag[0].tagLabel

    if (page == "0" || page > reviews.totalPages) {
        return (
            <PaginationRedirectLoading currentPage={page} totalPages={reviews.totalPages}/>
        );
    }

    
    return (
        <>
        <main className="reviewsContainer smallerContainerHeight">
            <TitleSubtitle
                title={`${currentTag} (${reviews.reviewsCount})`}
                subtitle={`Recenzije označene s oznakom ${currentTag}`}
                link={`${process.env.DOMAIN_URL}/tags`}
                linkText={"← Sve oznake"}
            />
            <PostsFlex posts={reviews.reviews} />
            {reviews.reviews.length !== 0 ? 
                <PaginationSSR tag={tag} page={page == undefined ? 1 : parseInt(page)} totalPages={reviews.totalPages}/>
            : ""}
        </main>
        <Footer/>
        </>
    );
};

export default SingleTagPage;
