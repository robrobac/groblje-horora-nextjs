import Footer from "@/components/footer/footer";
import PostsFlex from "@/components/reviewsGallery/postsFlex/PostsFlex";
import TitleSubtitle from "@/components/reviewsGallery/titleSubtitle/TitleSubtitle";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Top 20 smeća | Groblje Horora",
    description: "Filmovi na ovoj top listi su najveće smeće ikada.",
    openGraph: {
        title: "Top 20 smeća | Groblje Horora",
        description: "Filmovi na ovoj top listi su najveće smeće ikada.",
        images: "https://firebasestorage.googleapis.com/v0/b/groblje-horora-89186.appspot.com/o/openGraph%2Ftop20smeca-open-graph-image.jpg?alt=media&token=003f3a59-dc85-4542-9477-b6a67a29cc9d",
    },
    alternates: {
        canonical: `${process.env.DOMAIN_URL}/top20smeca`,
    }
};

const getData = async () => {
    const res = await fetch(`${process.env.DOMAIN_URL}/api/reviews/worse20`);
    // console.log("Worse20 Reviews data fetched") // Keep in Development
    if (!res.ok) {
        throw new Error('Failed to fetch Worse20 Reviews data');
    }
    return res.json();
}

const Top20SmecaPage = async () => {
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

export default Top20SmecaPage;
