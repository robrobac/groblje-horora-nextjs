import PostsFlex from "@/components/reviewsGallery/postsFlex/PostsFlex";
import TitleSubtitle from "@/components/reviewsGallery/titleSubtitle/TitleSubtitle";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Top 20 smeća",
    description: "Filmovi na ovoj top listi su najveće smeće ikada.",
};

const getData = async () => {
    const res = await fetch(`${process.env.DOMAIN_URL}/api/reviews/worse20`);
    console.log("Worse20 Reviews data fetched")
    if (!res.ok) {
        throw new Error('Failed to fetch Worse20 Reviews data');
    }
    return res.json();
}

const Top20SmecaPage = async () => {
    const reviews = await getData();

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

export default Top20SmecaPage;
