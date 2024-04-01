"use client"

import { listAll, ref } from "firebase/storage";
import { storage } from "./firebase/config";

const getAllMovieCoverImagePaths = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/reviews`);
    const resJSON = await res.json();
    const reviews = resJSON.reviews;
    
    let coverImagePaths = [];
    reviews.forEach((review) => {
        review.movies.forEach((movie) => {
            coverImagePaths.push(movie.coverImagePath);
        });
    });
    
    return coverImagePaths;
};

const getAllCoverImagePaths = async () => {
    const coverImagesListRef = ref(storage, '/coverImages');
    try {
        const res = await listAll(coverImagesListRef);
        const coverImagesArray = res.items.map((itemRef) => itemRef.fullPath);
        return coverImagesArray;
    } catch (error) {
        console.error("Error fetching cover images:", error);
        return [];
    }
};

const getAllPostContentImagePaths = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/reviews`);
    const resJSON = await res.json();
    const reviews = resJSON.reviews;
    
    let contentImagePaths = [];
    reviews.forEach((review) => {
        review.contentImages.forEach((contentImage) => {
            contentImagePaths.push(contentImage.path);
        });
    });
    
    return contentImagePaths;
};

const getAllContentImagePaths = async () => {
    const contentImagesListRef = ref(storage, '/postImages');
    try {
        const res = await listAll(contentImagesListRef);
        const contentImagesArray = res.items.map((itemRef) => itemRef.fullPath);
        return contentImagesArray;
    } catch (error) {
        console.error("Error fetching content images:", error);
        return [];
    }
};

const getAllPostOgImagePaths = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/reviews`);
    const resJSON = await res.json();
    const reviews = resJSON.reviews;
    
    let ogImagePaths = [];
    reviews.forEach((review) => {
        ogImagePaths.push(review.quadOgImagePath)
        review.movies.forEach((movie) => {
            ogImagePaths.push(movie.singleOgImagePath);
        });
    });

    ogImagePaths = ogImagePaths.filter(path => path !== undefined);
    
    return ogImagePaths;
};

const getAllOgImagePaths = async () => {
    const ogImagesListRef = ref(storage, '/ogImages');
    try {
        const res = await listAll(ogImagesListRef);
        const ogImagesArray = res.items.map((itemRef) => itemRef.fullPath);
        return ogImagesArray;
    } catch (error) {
        console.error("Error fetching OG images:", error);
        return [];
    }
};

const getAllPostsWithoutOGImage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/reviews`);
    const resJSON = await res.json();
    const reviews = resJSON.reviews;

    const singleReviews = reviews.filter((review) => review.reviewType === "single" )
    const quadReviews = reviews.filter((review) => review.reviewType === "quad" )

    let noOgSingle = []
    let noOgQuad = []

    singleReviews.forEach((review) => {
        review.movies.forEach((movie) => {
            if (!movie.singleOgImagePath) {
                noOgSingle.push(movie.title)
            }
        })
    })
    quadReviews.forEach((review) => {
        if (!review.quadOgImagePath) {
            noOgQuad.push(review.reviewTitle)
        }
        review.movies.forEach((movie) => {
            if (!movie.singleOgImagePath) {
                noOgQuad.push(movie.title)
            }
        })
    })

    console.log(noOgSingle)
    console.log(noOgQuad)
    
    return true;
}

export const compareStorageAndDb = async () => {
    console.log("Gathering data...");
    try {
        let coverImagePaths = await getAllCoverImagePaths();
        console.log("Firebase ALL Cover Image Paths:", coverImagePaths);
        let movieCoverImagePaths = await getAllMovieCoverImagePaths();
        console.log("MongoDB ALL Movies Cover Image Paths:", movieCoverImagePaths);

        let contentImagePaths = await getAllContentImagePaths()
        console.log("Firebase ALL Content Image Paths:", contentImagePaths)
        let reviewContentImagePaths = await getAllPostContentImagePaths()
        console.log("MongoDB ALL Content Image Paths:", reviewContentImagePaths)

        let ogImagePaths = await getAllOgImagePaths()
        console.log("Firebase ALL OG Image Paths:", ogImagePaths)
        let reviewOgImagePaths = await getAllPostOgImagePaths()
        console.log("MongoDB ALL OG Image Paths:", reviewOgImagePaths)
        

        let remainingCoverImagePaths = []
        let remainingMovieCoverImagePaths = []

        let remainingContentImagePaths = []
        let remainingReviewContentImagePaths = []

        let remainingOgImagePaths = []
        let remainingReviewOgImagePaths = []

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
        console.log("Cover Image Paths unique to MongoDB:", remainingMovieCoverImagePaths);

        console.log("Content Image Paths unique to Firebase:", remainingContentImagePaths);
        console.log("Content Image Paths unique to MongoDB:", remainingReviewContentImagePaths);

        console.log("OG Image Paths unique to Firebase:", remainingOgImagePaths);
        console.log("OG Image Paths unique to MongoDB:", remainingReviewOgImagePaths);

        console.log(await getAllPostsWithoutOGImage())



    } catch (error) {
        console.error("Error comparing storage and DB:", error);
    }
};