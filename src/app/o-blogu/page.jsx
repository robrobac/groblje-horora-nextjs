import AdminCheckButton from "@/components/adminCheckButton/AdminCheckButton";

export const metadata = {
    title: "O Blogu",
    description: "Opis i stranica dolazi uskoro",
    openGraph: {
        title: "O Blogu",
        description: "Opis i stranica dolazi uskoro",
        images: [
            {
                url: "public/images/openGraph/oblogu-open-graph-image.jpg",
                width: 1200,
                height: 630,
            }
        ],
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
