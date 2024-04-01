'use client'

import { compareStorageAndDb } from "@/lib/compareStorageAndDb";

// export const metadata = {
//     title: "O Blogu",
//     description: "O Blogu Description",
// };

const OBloguPage = () => {
    return (
        <>
        <h1>O Blogu</h1>
        <button onClick={compareStorageAndDb}>Check</button>
        </>
    );
};

export default OBloguPage;
