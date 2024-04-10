import AdminCheckButton from "@/components/adminCheckButton/AdminCheckButton";

export const metadata = {
    title: "O Blogu",
    description: "Opis i stranica dolazi uskoro",
    openGraph: {
        title: "O Blogu",
        description: "Opis i stranica dolazi uskoro",
        images: "https://firebasestorage.googleapis.com/v0/b/groblje-horora-89186.appspot.com/o/openGraph%2Foblogu-open-graph-image.jpg?alt=media&token=936d4ba3-ee29-44b9-b67c-66dfc90bf547",
    },
    alternates: {
        canonical: 'https://www.groblje-horora.com/o-blogu'
    }
};

const OBloguPage = () => {
    return (
        <div style={{minHeight: "80vh"}}>
            <AdminCheckButton />
        </div>
    );
};

export default OBloguPage;
