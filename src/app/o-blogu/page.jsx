'use client'

import useAuth from "@/hooks/useAuth";
import useCountReviews from "@/hooks/useCountReviews";
import { compareStorageAndDb } from "@/lib/compareStorageAndDb";

// export const metadata = {
//     title: "O Blogu",
//     description: "O Blogu Description",
// };

const OBloguPage = () => {
    const { count } = useCountReviews()
    const { mongoUser } = useAuth()

    return (
        <div style={{height: "80vh"}}>
            <h1>O Blogu</h1>
            <p>{count.numberOfReviews} objava</p>
            <p>{count.numberOfMovies} filmova</p>
            {mongoUser?._id === process.env.NEXT_PUBLIC_MAINADMIN_EMAIL && <button onClick={compareStorageAndDb}>Check</button>}
        </div>
    );
};

export default OBloguPage;
