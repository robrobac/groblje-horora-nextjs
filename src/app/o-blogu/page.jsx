import AdminCheckButton from "@/components/adminCheckButton/AdminCheckButton";
import Footer from "@/components/footer/footer";

export const metadata = {
    title: "O Blogu | Groblje Horora",
    description: "Opis i stranica dolazi uskoro",
    openGraph: {
        title: "O Blogu | Groblje Horora",
        description: "Opis i stranica dolazi uskoro",
        images: "https://firebasestorage.googleapis.com/v0/b/groblje-horora-89186.appspot.com/o/openGraph%2Foblogu-open-graph-image.jpg?alt=media&token=936d4ba3-ee29-44b9-b67c-66dfc90bf547",
    },
    alternates: {
        canonical: `${process.env.DOMAIN_URL}/o-blogu`,
    }
};

const OBloguPage = () => {
    return (
        <>
        <div style={{minHeight: "80vh"}}>
            <AdminCheckButton />
        </div>
        <Footer />
        </>
    );
};

export default OBloguPage;