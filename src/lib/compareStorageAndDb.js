import { listAll, ref } from "firebase/storage";
import { storage } from "./firebase/config";

export const getAllMovieCoverImagePaths = async (reviews) => {
    let coverImagePaths = [];
    reviews.forEach((review) => {
        review.movies.forEach((movie) => {
            coverImagePaths.push(movie.coverImagePath);
        });
    });
    
    return coverImagePaths;
};

export const getAllCoverImagePaths = async () => {
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

export const getAllPostContentImagePaths = async (reviews) => {
    let contentImagePaths = [];
    reviews.forEach((review) => {
        review.contentImages.forEach((contentImage) => {
            contentImagePaths.push(contentImage.path);
        });
    });
    
    return contentImagePaths;
};

export const getAllContentImagePaths = async () => {
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

export const getAllPostOgImagePaths = async (reviews) => {
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

export const getAllOgImagePaths = async () => {
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

export const getAllPostsWithoutOGImage = async (reviews) => {
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
    
    return [...noOgSingle, ...noOgQuad];
}

export const getAllMoviesWithoutTag = async (reviews) => {
    let noTagMovies = []

    reviews.forEach((review) => {
        review.movies.forEach((movie) => {
            if (movie.tags.length === 0) {
                noTagMovies.push(movie.title)
            }
        })
    })
    
    return noTagMovies;
}

export const getAllMoviesWithoutImdbLink = async (reviews) => {
    let noLinkMovies = []

    reviews.forEach((review) => {
        review.movies.forEach((movie) => {
            if (!movie.imdbLink) {
                noLinkMovies.push(movie.title)
            }
        })
    })
    
    return noLinkMovies;
}

export const checkLongestTitle = async (reviews) => {
    try {
        let longestTitle = "";
        let longestWord = "";

        for (const review of reviews) {
            if (review.reviewTitle.length > longestTitle.length) {
                longestTitle = review.reviewTitle;
            }
            
            const words = review.reviewTitle.split(' ');
            for (const word of words) {
                if (word.length > longestWord.length) {
                    longestWord = word;
                }
            }
        }

        return {
            longestTitle,
            longestWord
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

export const checkMostTags = async (reviews) => {
    try {
        let reviewWithMostTags = null;
        let maxTagsCount = 0;

        for (const review of reviews) {
            for (const movie of review.movies) {
                const tagsCount = movie.tags.length;
                if (tagsCount > maxTagsCount) {
                    maxTagsCount = tagsCount
                    reviewWithMostTags = movie
                }
            }
        }

        return reviewWithMostTags
    } catch (error) {
        console.error("Error:", error);
    }
}