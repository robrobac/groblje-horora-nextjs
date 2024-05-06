import TitleSubtitle from "@/components/reviewsGallery/titleSubtitle/TitleSubtitle";
import PostsFlex from "@/components/reviewsGallery/postsFlex/PostsFlex";
import Footer from "@/components/footer/footer";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Top 25 Preporuka | Groblje Horora",
    description: "Filmovi na ovoj top listi mijenjaju se kako dođe neki novi naslov na blogu koji zaslužuje jednaku pažnju ili ocjenu. Linkove na recenzije možete pronaći na Top 25 popisu.",
    openGraph: {
        title: "Top 25 Preporuka | Groblje Horora",
        description: "Filmovi na ovoj top listi mijenjaju se kako dođe neki novi naslov na blogu koji zaslužuje jednaku pažnju ili ocjenu. Linkove na recenzije možete pronaći na Top 25 popisu.",
        images: "https://firebasestorage.googleapis.com/v0/b/groblje-horora-89186.appspot.com/o/openGraph%2Ftop25-open-graph-image.jpg?alt=media&token=85db0be7-da7d-4f81-bee7-22934ca6909d",
    },
    alternates: {
        canonical: `${process.env.DOMAIN_URL}/top25`
    }
};

const getData = async () => {
    const res = await fetch(`${process.env.DOMAIN_URL}/api/reviews/top25`, { next: { revalidate: 0 } });
    // console.log("Top25 Reviews data fetched") // Keep in Development
    if (!res.ok) {
        throw new Error('Failed to fetch Top25 Reviews data');
    }
    return res.json();
}

const Top25Page = async () => {
    const reviews = await getData();

    return (
        <>
        <main className="reviewsContainer">
            <TitleSubtitle
                title={metadata.title}
                subtitle={metadata.description}
            />
            <PostsFlex posts={reviews} />
        </main>
        <Footer />
        </>
    );
};

export default Top25Page;
