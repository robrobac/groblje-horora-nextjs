'use client'

import React, { useState } from 'react'
import useAuth from "@/hooks/useAuth";
import useCountReviews from "@/hooks/useCountReviews";
import { checkLongestTitle, getAllPostsWithoutOGImage, compareStorageAndDb, getAllContentImagePaths, getAllCoverImagePaths, getAllMovieCoverImagePaths, getAllOgImagePaths, getAllPostContentImagePaths, getAllPostOgImagePaths, getAllMoviesWithoutTag, getAllMoviesWithoutImdbLink, checkMostTags } from "@/lib/compareStorageAndDb";

export default function AdminCheckButton() {
    const [checkFunctionStarted, setCheckFunctionStarted] = useState(false)
    const [functionProcess, setFunctionProcess] = useState([])
    const { count } = useCountReviews()
    const { mongoUser } = useAuth()

    const compareStorageAndDb = async () => {
        
        setCheckFunctionStarted(true)
        setFunctionProcess([])

        setFunctionProcess(prevProcess => [...prevProcess, "Fetching all posts from MongoDB..."])
        setFunctionProcess(prevProcess => [...prevProcess, `----------`])
        const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/reviews`);
        const resJSON = await res.json();
        const reviews = resJSON.reviews;
        setFunctionProcess(prevProcess => [...prevProcess, `${reviews.length} posts successfully fetched from MongoDB`])
        setFunctionProcess(prevProcess => [...prevProcess, `----------`])
        try {
            setFunctionProcess(prevProcess => [...prevProcess, "Fetching all cover image paths from Firebase..."])
            let coverImagePaths = await getAllCoverImagePaths();
            console.log("Firebase ALL Cover Image Paths:", coverImagePaths);
            setFunctionProcess(prevProcess => [...prevProcess, `${coverImagePaths.length} cover image paths successfully fetched from Firebase`])
            setFunctionProcess(prevProcess => [...prevProcess, `----------`])

            setFunctionProcess(prevProcess => [...prevProcess, "Extracting all movie cover image paths from MongoDB posts..."])
            let movieCoverImagePaths = await getAllMovieCoverImagePaths(reviews);
            console.log("MongoDB ALL Movies Cover Image Paths:", movieCoverImagePaths);
            setFunctionProcess(prevProcess => [...prevProcess, `${movieCoverImagePaths.length} movie cover image paths extracted from MongoDB posts...`])
            setFunctionProcess(prevProcess => [...prevProcess, `----------`])


            setFunctionProcess(prevProcess => [...prevProcess, "Fetching all content image paths from Firebase..."])
            let contentImagePaths = await getAllContentImagePaths()
            console.log("Firebase ALL Content Image Paths:", contentImagePaths)
            setFunctionProcess(prevProcess => [...prevProcess, `${contentImagePaths.length} content image paths successfully fetched from Firebase`])
            setFunctionProcess(prevProcess => [...prevProcess, `----------`])

            setFunctionProcess(prevProcess => [...prevProcess, "Extracting all movie content image paths from MongoDB posts..."])
            let reviewContentImagePaths = await getAllPostContentImagePaths(reviews)
            console.log("MongoDB ALL Content Image Paths:", reviewContentImagePaths)
            setFunctionProcess(prevProcess => [...prevProcess, `${reviewContentImagePaths.length} movie content image paths extracted from MongoDB posts...`])
            setFunctionProcess(prevProcess => [...prevProcess, `----------`])
    


            setFunctionProcess(prevProcess => [...prevProcess, "Fetching all open graph image paths from Firebase..."])
            let ogImagePaths = await getAllOgImagePaths()
            console.log("Firebase ALL OG Image Paths:", ogImagePaths)
            setFunctionProcess(prevProcess => [...prevProcess, `${ogImagePaths.length} open graph image paths successfully fetched from Firebase`])
            setFunctionProcess(prevProcess => [...prevProcess, `----------`])

            setFunctionProcess(prevProcess => [...prevProcess, "Extracting all graph image paths from MongoDB posts..."])
            let reviewOgImagePaths = await getAllPostOgImagePaths(reviews)
            console.log("MongoDB ALL OG Image Paths:", reviewOgImagePaths)
            setFunctionProcess(prevProcess => [...prevProcess, `${reviewOgImagePaths.length} graph image paths extracted from MongoDB posts...`])
            setFunctionProcess(prevProcess => [...prevProcess, `----------`])

            let remainingCoverImagePaths = []
            let remainingMovieCoverImagePaths = []
    
            let remainingContentImagePaths = []
            let remainingReviewContentImagePaths = []
    
            let remainingOgImagePaths = []
            let remainingReviewOgImagePaths = []


            const longest = await checkLongestTitle(reviews)
            const mostTags = await checkMostTags(reviews)
            console.log(mostTags)
            console.log(await checkLongestTitle(reviews))
            setFunctionProcess(prevProcess => [...prevProcess, `<span style="color: white; font-size: 14px; line-height: 21px;">Longest Post Title: ${longest.longestTitle}</span>`])
            setFunctionProcess(prevProcess => [...prevProcess, `<span style="color: white; font-size: 14px; line-height: 21px;">Longest Word in Post Title: ${longest.longestWord}</span>`])
            setFunctionProcess(prevProcess => [...prevProcess, `<span style="color: white; font-size: 14px; line-height: 21px;">Most tags movie: ${mostTags.title}</span>`])
            setFunctionProcess(prevProcess => [...prevProcess, `----------`])


            setFunctionProcess(prevProcess => [...prevProcess, `Comparing Firebase and MongoDB data...`])
            setFunctionProcess(prevProcess => [...prevProcess, `----------`])
    


            // Finding paths unique to coverImagePaths
            remainingCoverImagePaths = coverImagePaths.filter(path => !movieCoverImagePaths.includes(path));
            

            // Finding paths unique to movieCoverImagePaths
            remainingMovieCoverImagePaths = movieCoverImagePaths.filter(path => !coverImagePaths.includes(path));
    

            // Finding paths unique to contentImagePaths
            remainingContentImagePaths = contentImagePaths.filter(path => !reviewContentImagePaths.includes(path));

            // Finding paths unique to movieCoverImagePaths
            remainingReviewContentImagePaths = reviewContentImagePaths.filter(path => !contentImagePaths.includes(path));
    

            // Finding paths unique to contentImagePaths
            remainingOgImagePaths = ogImagePaths.filter(path => !reviewOgImagePaths.includes(path));

            // Finding paths unique to movieCoverImagePaths
            remainingReviewOgImagePaths = reviewOgImagePaths.filter(path => !ogImagePaths.includes(path));
    


            console.log("Cover Image Paths unique to Firebase:", remainingCoverImagePaths);
            setFunctionProcess(prevProcess => [
                ...prevProcess, 
                `<span style="${remainingCoverImagePaths.length === 0 ? 'color: green' : 'color: red'}; font-size: 14px; line-height: 21px;">
                    ${remainingCoverImagePaths.length} Cover Image Paths unique to Firebase
                </span>`
            ])
            remainingCoverImagePaths.forEach((remainingCoverImage) => {
                setFunctionProcess(prevProcess => [...prevProcess, `<li style="color: white; font-size: 14px; line-height: 21px;">${remainingCoverImage}</li>`])
            })
            setFunctionProcess(prevProcess => [...prevProcess, `----------`])

            console.log("Cover Image Paths unique to MongoDB:", remainingMovieCoverImagePaths);
            setFunctionProcess(prevProcess => [
                ...prevProcess, 
                `<span style="${remainingMovieCoverImagePaths.length === 0 ? 'color: green' : 'color: red'}; font-size: 14px; line-height: 21px;">
                    ${remainingMovieCoverImagePaths.length} Cover Image Paths unique to MongoDB
                </span>`
            ])
            remainingMovieCoverImagePaths.forEach((remainingCoverImage) => {
                setFunctionProcess(prevProcess => [...prevProcess, `<li style="color: white; font-size: 14px; line-height: 21px;">${remainingCoverImage}</li>`])
            })
            setFunctionProcess(prevProcess => [...prevProcess, `----------`])
    

            console.log("Content Image Paths unique to Firebase:", remainingContentImagePaths);
            setFunctionProcess(prevProcess => [
                ...prevProcess, 
                `<span style="${remainingContentImagePaths.length === 0 ? 'color: green' : 'color: red'}; font-size: 14px; line-height: 21px;">
                    ${remainingContentImagePaths.length} Content Image Paths unique to Firebase
                </span>`
            ])
            remainingContentImagePaths.forEach((remainingContentImage) => {
                setFunctionProcess(prevProcess => [...prevProcess, `<li style="color: white; font-size: 14px; line-height: 21px;">${remainingContentImage}</li>`])
            })
            setFunctionProcess(prevProcess => [...prevProcess, `----------`])

            console.log("Content Image Paths unique to MongoDB:", remainingReviewContentImagePaths);
            setFunctionProcess(prevProcess => [
                ...prevProcess, 
                `<span style="${remainingReviewContentImagePaths.length === 0 ? 'color: green' : 'color: red'}; font-size: 14px; line-height: 21px;">
                    ${remainingReviewContentImagePaths.length} Content Image Paths unique to MongoDB
                </span>`
            ])
            remainingReviewContentImagePaths.forEach((remainingContentImage) => {
                setFunctionProcess(prevProcess => [...prevProcess, `<li style="color: white; font-size: 14px; line-height: 21px;">${remainingContentImage}</li>`])
            })
            setFunctionProcess(prevProcess => [...prevProcess, `----------`])
    

            console.log("OG Image Paths unique to Firebase:", remainingOgImagePaths);
            setFunctionProcess(prevProcess => [
                ...prevProcess, 
                `<span style="${remainingOgImagePaths.length === 0 ? 'color: green' : 'color: red'}; font-size: 14px; line-height: 21px;">
                    ${remainingOgImagePaths.length} OG Image Paths unique to Firebase
                </span>`
            ])
            remainingOgImagePaths.forEach((remainingOgImage) => {
                setFunctionProcess(prevProcess => [...prevProcess, `<li style="color: white; font-size: 14px; line-height: 21px;">${remainingOgImage}</li>`])
            })
            setFunctionProcess(prevProcess => [...prevProcess, `----------`])

            console.log("OG Image Paths unique to MongoDB:", remainingReviewOgImagePaths);
            setFunctionProcess(prevProcess => [
                ...prevProcess, 
                `<span style="${remainingReviewOgImagePaths.length === 0 ? 'color: green' : 'color: red'}; font-size: 14px; line-height: 21px;">
                    ${remainingReviewOgImagePaths.length} OG Image Paths unique to MongoDB
                </span>`
            ])
            remainingReviewOgImagePaths.forEach((remainingOgImage) => {
                setFunctionProcess(prevProcess => [...prevProcess, `<li style="color: white; font-size: 14px; line-height: 21px;">${remainingOgImage}</li>`])
            })
            setFunctionProcess(prevProcess => [...prevProcess, `----------`])
    

            const postsWithoutOgImage = await getAllPostsWithoutOGImage(reviews)
            console.log("posts without Og Image: ", postsWithoutOgImage)
            setFunctionProcess(prevProcess => [
                ...prevProcess, 
                `<span style="${postsWithoutOgImage.length === 0 ? 'color: green' : 'color: red'}; font-size: 14px; line-height: 21px;">
                    ${postsWithoutOgImage.length} Posts without Open Graph Image
                </span>`
            ])
            postsWithoutOgImage.forEach((noOgImage) => {
                setFunctionProcess(prevProcess => [...prevProcess, `<li style="color: white; font-size: 14px; line-height: 21px;">${noOgImage}</li>`])
            })
            setFunctionProcess(prevProcess => [...prevProcess, `----------`])


            const moviesWithoutTags = await getAllMoviesWithoutTag(reviews)
            console.log("Movies without Tags: ", moviesWithoutTags)
            setFunctionProcess(prevProcess => [
                ...prevProcess, 
                `<span style="${moviesWithoutTags.length === 0 ? 'color: green' : 'color: red'}; font-size: 14px; line-height: 21px;">
                    ${moviesWithoutTags.length} Movies without Tags
                </span>`
            ])
            moviesWithoutTags.forEach((noOgImage) => {
                setFunctionProcess(prevProcess => [...prevProcess, `<li style="color: white; font-size: 14px; line-height: 21px;">${noOgImage}</li>`])
            })
            setFunctionProcess(prevProcess => [...prevProcess, `----------`])

            const moviesWithoutImdbLink = await getAllMoviesWithoutImdbLink(reviews)
            console.log("Movies without Imdb Link: ", moviesWithoutImdbLink)
            setFunctionProcess(prevProcess => [
                ...prevProcess, 
                `<span style="${moviesWithoutImdbLink.length === 0 ? 'color: green' : 'color: red'}; font-size: 14px; line-height: 21px;">
                    ${moviesWithoutImdbLink.length} Movies without IMDB link
                </span>`
            ])
            moviesWithoutImdbLink.forEach((noLink) => {
                setFunctionProcess(prevProcess => [...prevProcess, `<li style="color: white; font-size: 14px; line-height: 21px;">${noLink}</li>`])
            })


            // ---------- NEW STEP: verify reciprocity of `moreLikeThis` links ----------
            // AI GENERATED logic
            setFunctionProcess(prev => [...prev, `----------`]);
            setFunctionProcess(prev => [...prev, `Checking reciprocity of moreLikeThis links...`]);

            // Helper to normalize various ID shapes (string / {_id} / ObjectId-like)
            const normalizeId = (v) => {
                if (!v) return "";
                if (typeof v === "string") return v;
                if (typeof v === "object") {
                    if (typeof v._id === "string") return v._id;
                    if (v._id && v._id.toString) return v._id.toString();
                    if (v.toString) return v.toString();
                }
                try { return String(v); } catch { return ""; }
            };

            // Build fast lookup map: id -> review
            const byId = new Map(reviews.map((r) => [normalizeId(r._id), r]));

            // Collect docs that actually have moreLikeThis entries
            const docsWithMlt = reviews.filter((r) => Array.isArray(r.moreLikeThis) && r.moreLikeThis.length > 0);

            setFunctionProcess(prev => [...prev, `${docsWithMlt.length} posts have at least one moreLikeThis reference`]);
            setFunctionProcess(prev => [...prev, `----------`]);

            // Track results
            const missingReciprocals = [];
            const danglingRefs = [];

            // Avoid duplicate logs for the same directed pair
            const seenDirected = new Set();

            for (const doc of docsWithMlt) {
                const sourceId = normalizeId(doc._id);
                const sourceTitle = doc.reviewTitle || sourceId;

                const targets = doc.moreLikeThis
                    .map((x) => normalizeId(x))
                    .filter(Boolean);

                for (const targetId of targets) {
                    const key = `${sourceId}->${targetId}`;
                    if (seenDirected.has(key)) continue;
                    seenDirected.add(key);

                    console.log(targetId)

                    const targetDoc = byId.get(targetId);
                    console.log(targetDoc)
                    if (!targetDoc) {
                        // Reference points to a document we didn't fetch / doesn't exist
                        danglingRefs.push({
                            sourceId,
                            sourceTitle,
                            targetId
                        });
                        continue;
                    }
                    console.log(danglingRefs)

                    const targetMlt = Array.isArray(targetDoc.moreLikeThis)
                        ? targetDoc.moreLikeThis.map((x) => normalizeId(x)).filter(Boolean)
                        : [];

                    if (!targetMlt.includes(sourceId)) {
                        missingReciprocals.push({
                            sourceId: doc._id,
                            sourceTitle: doc.reviewTitle,
                            targetId: targetDoc._id,
                            targetTitle: targetDoc.reviewTitle
                        });
                    }
                }
            }

            // Log non-reciprocal links
            setFunctionProcess(prev => [
                ...prev,
                `<span style="${missingReciprocals.length === 0 ? 'color: green' : 'color: red'}; font-size: 14px; line-height: 21px;">
                    ${missingReciprocals.length} non-reciprocal moreLikeThis links
                </span>`
            ]);

            missingReciprocals.forEach(({ sourceId, sourceTitle, targetId, targetTitle }) => {
                setFunctionProcess(prev => [
                    ...prev,
                    `<li style="color: white; font-size: 14px; line-height: 21px;">
                    ${sourceTitle} <i>(${sourceId})</i> → ${targetTitle} <i>(${targetId})</i>
                    </li>`
                ]);
            });

            setFunctionProcess(prev => [...prev, `----------`]);

            // Log dangling references (targets not found)
            setFunctionProcess(prev => [
                ...prev,
                `<span style="${danglingRefs.length === 0 ? 'color: green' : 'color: orange'}; font-size: 14px; line-height: 21px;">
                    ${danglingRefs.length} dangling moreLikeThis references (target not found)
                </span>`
            ]);

            danglingRefs.forEach(({ sourceId, sourceTitle, targetId }) => {
                setFunctionProcess(prev => [
                    ...prev,
                    `<li style="color: white; font-size: 14px; line-height: 21px;">
                    ${sourceTitle} (<i>${sourceId}</i>) → <i>${targetId}</i> not found
                    </li>`
                ]);
            });
            // ---------- END NEW STEP ----------

    
        } catch (error) {
            console.error("Error comparing storage and DB:", error);
        } finally {
            setCheckFunctionStarted(false)
        }
    };
    
    return (
        <div>
            <h1>O Blogu</h1>
            <p>{count.numberOfReviews} objava</p>
            <p>{count.numberOfMovies} filmova</p>
            {
                mongoUser?.role === "admin" &&
                (
                    <div>
                        <button onClick={compareStorageAndDb}>Check</button>
                        {functionProcess?.map((process, index) => (
                            <p style={{color: "#444444", fontSize: "14px", lineHeight: "21px"}} key={index} dangerouslySetInnerHTML={{ __html: process }}></p>
                        ))}
                    </div>
                    
                )   
            }
        </div>
    )
}
