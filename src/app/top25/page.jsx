import TitleSubtitle from "@/components/reviewsGallery/titleSubtitle/TitleSubtitle";
import PostsFlex from "@/components/reviewsGallery/postsFlex/PostsFlex";

export const metadata = {
    title: "Top 25 Preporuka",
    description: "Filmovi na ovoj top listi mijenjaju se kako dođe neki novi naslov na blogu koji zaslužuje jednaku pažnju ili ocjenu. Linkove na recenzije možete pronaći na Top 25 popisu.",
};

const getData = async () => {
    const res = await fetch(`${process.env.DOMAIN_URL}/api/reviews/top25`);
    console.log("Top25 Reviews data fetched")
    if (!res.ok) {
        throw new Error('Failed to fetch Top25 Reviews data');
    }
    return res.json();
}

const Top25Page = async () => {
    const reviews = await getData();
    console.log(reviews)

    return (
        <main className="reviewsContainer">
            <TitleSubtitle
                title={metadata.title}
                subtitle={metadata.description}
            />
            <PostsFlex posts={reviews} />
        </main>
    );
};

export default Top25Page;
