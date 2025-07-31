import Footer from "@/components/footer/footer";
import TitleSubtitle from "@/components/reviewsGallery/titleSubtitle/TitleSubtitle";
import Link from "next/link";

export const metadata = {
    title: "Politika privatnosti | Groblje Horora",
    description: "Filmovi na ovoj top listi mijenjaju se kako dođe neki novi naslov na blogu koji zaslužuje jednaku pažnju ili ocjenu. Linkove na recenzije možete pronaći na Top 25 popisu.",
    openGraph: {
        title: "Politika privatnosti | Groblje Horora",
        description: "Filmovi na ovoj top listi mijenjaju se kako dođe neki novi naslov na blogu koji zaslužuje jednaku pažnju ili ocjenu. Linkove na recenzije možete pronaći na Top 25 popisu.",
        images: "https://firebasestorage.googleapis.com/v0/b/groblje-horora-89186.appspot.com/o/openGraph%2Fnaslovna-open-graph-image.jpg?alt=media&token=f3353588-ef68-4322-9b07-81deece6b70d",
    },
    alternates: {
        canonical: `${process.env.DOMAIN_URL}/politika-privatnosti`
    }
};

const PolitikaPrivatnosti = () => {
    
    return (
        <>
            <main className="defaultSection">
                <h1>Politika privatnosti</h1>
                <p>Ovdje ti objašnjavam koje podatke prikupljam kad koristiš moj blog i zašto to radim.</p>

                <section>
                    <h3>1. Općenito</h3>
                    <p>Vodim ovaj blog iz osobnog interesa prema horor filmovima i sve informacije koje prikupljam služe isključivo za poboljšanje sadržaja i korisničkog iskustva. Ne zanimaju me tvoji osobni podaci, niti ih koristim u komercijalne svrhe.</p>
                </section>

                <section>
                    <h3>2. Analitika i statistika</h3>
                    <p>Koristim alat <Link target='_blank' href="https://umami.is/">Umami Analytics</Link> za praćenje posjećenosti bloga. Evo nekoliko važnih stvari koje trebaš znati:</p>
                    <ul>
                        <li>Umami ne prikuplja osobne podatke korisnika.</li>
                        <li>Sve informacije su anonimne i ne mogu se povezati s tobom kao osobom.</li>
                        <li>Ne koristi kolačiće, pa nije potreban cookie banner.</li>
                        <li>Ove podatke koristim samo da razumijem koliko ljudi posjećuje blog i što ih zanima.</li>
                    </ul>
                </section>

                <section>
                    <h3>3. Registracija i korisnički račun</h3>
                    <p>Registracija na blog nije obavezna, ali je potrebna ako želiš ostavljati komentare ili lajkati objave. To služi isključivo za zaštitu od spama i zloupotrebe.</p>
                    <p>Prilikom registracije unosim sljedeće podatke:</p>
                    <ul>
                        <li>korisničko ime (po tvom izboru),</li>
                        <li>email adresu,</li>
                        <li>lozinku, koja se pohranjuje šifrirano i ne može se dešifrirati ni od mene ni od drugih.</li>
                    </ul>
                    <p>Ti se podaci ne koriste ni za kakve druge svrhe i nisu dostupni trećim stranama.</p>
                </section>

                <section>
                    <h3>4. Tvoja prava</h3>
                    <p>U skladu s važećim zakonima (npr. GDPR i CCPA), imaš pravo:</p>
                    <ul>
                        <li>zatražiti pristup podacima koje imam o tebi,</li>
                        <li>ispraviti netočne podatke,</li>
                        <li>zatražiti da obrišem tvoj račun i sve povezane podatke,</li>
                        <li>kontaktirati me u vezi bilo kakvih pitanja vezanih za privatnost.</li>
                    </ul>
                    <p>Za sve upite možeš mi se javiti na <Link href="mailto:bruno.koic1@gmail.com">bruno.koic1@gmail.com</Link>.</p>
                </section>

            </main>
            <Footer />
        </>
    );
};

export default PolitikaPrivatnosti;
