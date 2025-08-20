/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useState } from 'react';

import styles from './newForm.module.scss';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
// Rich Text Editor
import { EditorState, convertToRaw } from 'draft-js';
// Dynamic import of react-draft-wysiwyg
const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), {
    ssr: false // Set ssr to false to prevent Next.js from trying to render it on the server side
  });
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./editor.scss";

import { getRawContent, shortenStringTo30Words, slugify } from '@/lib/utils';
import { uploadImageToFirebaseStorage } from '@/lib/firebase/firebaseUtils';
import { compressImage, compressOgImage } from '@/lib/compressImage';
import { useRouter } from 'next/navigation';
import ImageRepo from './ImageRepo';
import { FILTERING_OPTIONS } from '@/lib/sortOptions';
import { sortedTags } from '@/lib/tags';
import { LoadingBtn } from '../buttons/loadingBtn';
import AddMoreLikeThis from './addMoreLikeThis/AddMoreLikeThis';


export default function NewForm({ numberOfMovies }) {
    const [reviewTitle, setReviewTitle] = useState(numberOfMovies === 1 ? 'Not required for single movie review' : '');
    const [contentImages, setContentImages] = useState([]);
    const [movies, setMovies] = useState(Array.from({length: numberOfMovies }, () => getInitialMovieState()));

    const [selectedcategory, setSelectedcategory] = useState('')

    const [selectedTab, setSelectedTab] = useState('movie1')

    const [selectedMoreLikeThis, setSelectedMoreLikeThis] = useState([]);

    const [formSubmitted, setFormSubmitted] = useState(false);
    // If form fails checks on backend, change the state to trigger useEffect in PreviewDialog components and that way close the Preview Modal.
    const [formFailed, setFormFailed] = useState(false)

    // State that is recieved from backend to handle errors on empty fields
    const [emptyFields, setEmptyFields] = useState([])

    const [loading, setLoading] = useState(false)
    
    const router = useRouter()

    // console.log(movies[0].tags)

    useEffect(() => {
        const handleBeforeUnload = (event) => {
          // Perform actions before the component unloads
            // console.log('izlazimmmmmmmmmmmmmmmmmmmmm')
          event.preventDefault();
          event.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    

    // Compressing Image to prepare it for upload to Firebase Storage once form is submited
    const handleCompressImage = (e, index) => {
        const image = e.target.files[0];
        if (image) {
        compressImage(image, (compressedResult) => {
            const updatedMovies = [...movies];
            updatedMovies[index].compressedCoverImage = compressedResult;
            setMovies(updatedMovies);
        });
        } else {
        const updatedMovies = [...movies];
        updatedMovies[index].compressedCoverImage = null;
        setMovies(updatedMovies);
        }
    };

    // Handling input changes
    const handleChange = (index, field, value) => {
        const updatedMovies = [...movies];
        updatedMovies[index][field] = value;
        setMovies(updatedMovies);
    };

    const handleTagChange = (index, tag) => {
        const updatedMovies = [...movies];
        const { tagValue, tagKey } = tag;
    
        // Check if the tag is already in the movie's tags array
        const tagIndex = updatedMovies[index].tags.findIndex(t => t.tagValue === tagValue && t.tagKey === tagKey);
    
        if (tagIndex === -1) {
            // If tag is not in the movie's tags array, add it
            updatedMovies[index].tags.push(tag);
        } else {
            // If tag is in the movie's tags array, remove it
            updatedMovies[index].tags.splice(tagIndex, 1);
        }
        
        // Sort the tags alphabetically based on tagLabel
        updatedMovies[index].tags.sort((a, b) => a.tagLabel.localeCompare(b.tagLabel));
    
        setMovies(updatedMovies);
    };
    

    // Handle rich text editor changes
    const handleEditorStateChange = (index, newEditorState) => {
        const updatedMovies = [...movies];
        // Saving editor state as it originaly is
        updatedMovies[index].editorState = newEditorState;
        // Saving editor state converted to raw JSON
        const rawData = JSON.stringify(convertToRaw(newEditorState.getCurrentContent()));
        updatedMovies[index].reviewContent = rawData;
        //  Updating Movies State
        setMovies(updatedMovies);
    }; 

    // Function passed to ImageRepo component to handle uploaded images.
    const handleContentImages = (value) => {
        setContentImages(value);
    };

    // Function to handle clicking on hidden File Input field.
    const handleUploadClick = (index) => {
        const clickedElement = document.getElementById(`coverImage${index}`)
        if (clickedElement) {
            clickedElement.click()
        }
    }

    // Function to handle all logic behind Form Submit.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const requiredInputs = []

        if (!reviewTitle) {
            requiredInputs.push('reviewTitle')
        }

        if (!selectedcategory) {
            requiredInputs.push('category')
        }
    
        movies.forEach((movie, index) => {
            if (!movie.title) {
                requiredInputs.push(`movie${index}title`)
            }
            if (!movie.year) {
                requiredInputs.push(`movie${index}year`)
            }
            if (!movie.rating) {
                requiredInputs.push(`movie${index}rating`)
            }
            if (!movie.reviewContent) {
                requiredInputs.push(`movie${index}reviewContent`)
            }
            if (!movie.compressedCoverImage) {
                requiredInputs.push(`movie${index}coverImage`)
            }
        })

        if (requiredInputs.length > 0) {
            console.log(requiredInputs)
            setEmptyFields(requiredInputs)
            setFormFailed(!formFailed)
            setLoading(false)
            return
        }

        console.log(requiredInputs)

        const movieReviews = movies.map(async (movie, index) => {
            return new Promise(async (resolve, reject) => {
                let url = '';
                let filePath = '';

                // if cover image is uploaded and compressed upload it to firebase storage
                if (movie.compressedCoverImage) {
                    // create firebase storage path
                    const path = `coverImages/${slugify(movie.title, movie.year)}-coverImage-${Date.now()}.jpg`

                    try {
                        // requiredInputs handles checking if there's empty fields in the form, if there is then don't upload cover images to firebase
                        if (requiredInputs.length === 0) {
                            // Uploading compressed cover image to Firebase Storage
                            const uploadResult = await uploadImageToFirebaseStorage(movie.compressedCoverImage, path);
                            // Setting a new URL to save it in MongoDB document as a reference to the uploaded file
                            url = uploadResult.url;
                            // Setting a uploaded image path to save it in MongoDB document as a reference to the path(used mostly for deleting image in the future)
                            filePath = uploadResult.path;
                        }
                    } catch (err) {
                        reject(err);
                        setLoading(false)
                    }
                }

                console.log('--------- OG IMAGE UPLOADING -----------') // Keep in Development
                const ogImageData = {
                    title: movie.title,
                    year: movie.year,
                    reviewContent: shortenStringTo30Words(getRawContent(movie.reviewContent)),
                    rating: movie.rating,
                }
                console.log('ogImageData: ', ogImageData) // Keep in Development
                const ogImageDataCoverUrl = [url];
                console.log('ogImageDataCoverUrl', ogImageDataCoverUrl) // Keep in Development

                const encodedogImageData = encodeURIComponent(JSON.stringify(ogImageData))
                const encodedogImageDataCoverUrl = encodeURIComponent(JSON.stringify(ogImageDataCoverUrl))
                console.log('encoded', [encodedogImageData, encodedogImageDataCoverUrl]) // Keep in Development

                const ogImageRequestUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/og?images=${encodedogImageDataCoverUrl}&data=${encodedogImageData}&type=single`
                console.log('ogImageRequestUrl: ', ogImageRequestUrl) // Keep in Development

                const ogImageResponse = await fetch(ogImageRequestUrl)
                const ogImageBlob = await ogImageResponse.blob();
                console.log('og image blob: ', ogImageBlob); // Keep in Development

                compressOgImage (ogImageBlob, async (compressedResult) => {
                    const ogUploadPath = `ogImages/${slugify(movie.title, movie.year)}-ogImage-${Date.now()}.jpg`;
                    const ogUploadResult = await uploadImageToFirebaseStorage(compressedResult, ogUploadPath);
                    console.log('ogUploadResult', ogUploadResult) // Keep in Development

                    const ogUrl = ogUploadResult.url
                    const ogPath = ogUploadResult.path

                    resolve({
                        title: movie.title,
                        year: movie.year,
                        rating: movie.rating,
                        reviewContent: movie.reviewContent,
                        imdbLink: movie.imdbLink,
                        coverImage: url,
                        coverImagePath: filePath,
                        top25: movie.top25,
                        worse20: movie.worse20,
                        tags: movie.tags,
                        singleOgImage: ogUrl,
                        singleOgImagePath: ogPath,
                    });
                });
                
            });
        });


        // After the document object is prepared, wait for all promises and send it to MongoDB
        Promise.all(movieReviews)
            .then(async (resolvedMovieReviews) => {
                const review = {
                    reviewTitle: resolvedMovieReviews.length === 1 ? resolvedMovieReviews[0].title : reviewTitle,
                    movies: resolvedMovieReviews,
                    contentImages,
                    selectedcategory: selectedcategory,
                    quadOgImage: '',
                    quadOgImagePath: '',
                    moreLikeThis: selectedMoreLikeThis,
                };

                if (resolvedMovieReviews.length === 4) {
                    console.log('---------QUAD OG IMAGE UPLOADING -----------') // Keep in Development
                    const quadOgImageData = review.movies.map((movie, index) => {
                        return {
                            title: movie.title,
                            rating: movie.rating
                        };
                    })
                console.log('quadOgImageData: ', quadOgImageData) // Keep in Development

                const quadOgImageDataCoverUrls = review.movies.map((movie, index) => {
                    return movie.coverImage
                })
                console.log('quadOgImageDataCoverUrls', quadOgImageDataCoverUrls) // Keep in Development
                
                const encodedQuadOgImageData = encodeURIComponent(JSON.stringify(quadOgImageData))
                const encodedQuadOgImageDataCoverUrls = encodeURIComponent(JSON.stringify(quadOgImageDataCoverUrls))
                console.log('encoded', [encodedQuadOgImageData, encodedQuadOgImageDataCoverUrls]) // Keep in Development

                const quadOgImageRequestUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/og?images=${encodedQuadOgImageDataCoverUrls}&data=${encodedQuadOgImageData}&type=quad`
                console.log('quadOgImageRequestUrl: ', quadOgImageRequestUrl) // Keep in Development


                const quadOgImageResponse = await fetch(quadOgImageRequestUrl)
                const quadOgImageBlob = await quadOgImageResponse.blob();
                console.log('quad og image blob: ', quadOgImageBlob); // Keep in Development

                const quadOgUploadResult = await new Promise(resolve => {
                    compressOgImage(quadOgImageBlob, async (compressedResult) => {
                        const quadOgUploadPath = `ogImages/${slugify(review.reviewTitle)}-ogImage-${Date.now()}.jpg`;
                        const quadOgUploadResult = await uploadImageToFirebaseStorage(compressedResult, quadOgUploadPath);
                        console.log('ogUploadResult', quadOgUploadResult) // Keep in Development

                        resolve(quadOgUploadResult)
                    })
                })

                const quadOgUrl = quadOgUploadResult.url
                const quadOgPath = quadOgUploadResult.path

                review.quadOgImage = quadOgUrl;
                review.quadOgImagePath = quadOgPath;

                console.log('PREPARED REVIEW', review) // Keep in Development
                }

                // API Call to post a new Review
                const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/reviews`, {
                    method: 'POST',
                    body: JSON.stringify(review),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const json = await response.json();
                
                if (!response.ok) {
                    setEmptyFields(json.emptyFields)
                    setFormFailed(!formFailed)
                    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                    console.log(json) // Keep in Development

                    setLoading(false)
                }

                if (response.ok) {
                    // If response is OK, restart form states
                    setReviewTitle('');
                    setSelectedcategory('')
                    setEmptyFields([])
                    setMovies(Array.from({ length: numberOfMovies }, () => getInitialMovieState()));

                    // Change FormSubmitted state in order to re render ImageRepo so it will clear its states
                    setFormSubmitted(!formSubmitted);

                    // Clear ContentImages state
                    setContentImages([]);

                    setSelectedMoreLikeThis([])
                    // Navigate to new post
                    router.push(`/recenzije/${json.slug}`);
                }
            });
    };

  return (
        <main className={styles.pageContainer}>
            <div className={styles.formSection}>
                <form className={styles.styledForm} onSubmit={handleSubmit}>
                    {numberOfMovies === 4 ? (
                        <>
                            <div className='inputContainer'>
                                <label className='inputLabel' htmlFor='reviewTitle'>Review Title * {emptyFields.includes('titleExists') ? <span className='error'>Title already exists</span> : ''}</label>
                                <input className={`inputField ${emptyFields.includes('reviewTitle') && reviewTitle === ""  ? 'error' : '' }`} id='reviewTitle' type='text' value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)}/>
                            </div>
                            <div className={styles.categoryContainer}>
                                {Object.values(FILTERING_OPTIONS.QUAD.categories).map(category => (
                                    <div key={category.dbValue} className={styles.checkboxWrapper} style={{width: '170px'}}>
                                        <input id={category.dbValue} type='checkbox' onChange={() => setSelectedcategory(category.dbValue)} checked={selectedcategory === category.dbValue}/>

                                        <label htmlFor={category.dbValue} className={emptyFields.includes('category') && selectedcategory === "" ? styles.error : ''}>{category.label}</label>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className={styles.categoryContainer}>
                            {Object.values(FILTERING_OPTIONS.SINGLE.categories).map(category => (
                                <div key={category.dbValue} className={styles.checkboxWrapper} style={{width: '160px'}}>
                                    <input id={category.dbValue} type='checkbox' onChange={() => setSelectedcategory(category.dbValue)} checked={selectedcategory === category.dbValue}/>
                                    <label htmlFor={category.dbValue} className={emptyFields.includes('category') && selectedcategory === "" ? styles.error : ''}>{category.label}</label>
                                </div>
                            ))}
                        </div>  
                    )}
                                       
                    <div className={styles.tabs}>
                        <div className={styles.tabList}>
                            {movies.map((movie, index) => (
                                <div className={`${styles.tab} ${selectedTab === `movie${index + 1}` && styles.isActive} ${emptyFields.some(str => str.includes(`movie${index}coverImage`)) ? styles.error : ''}`} key={`movie${index + 1}`} onClick={() => setSelectedTab(`movie${index + 1}`)}>Movie {index + 1}</div>
                            ))}
                            

                        </div>
                    </div>
                    {movies.map((movie, index) => (
                        <div className={`${styles.tabPanel} ${selectedTab === `movie${index + 1}` && styles.isActive}`} key={`movie${index + 1}`}>
                            <h3>Cover Image <span>(movie {index + 1})</span></h3>
                            <div className={styles.formContainer}>
                                <div className={styles.formImage}>
                                    <div>
                                        {movie.compressedCoverImage
                                        ?
                                            <img src={URL.createObjectURL(movie.compressedCoverImage)} className={styles.uploadedCoverImage} alt='uploadedImage' onClick={() => handleUploadClick(index)}/>
                                        :
                                            <label className={`${styles.fileLabel} ${emptyFields.includes(`movie${index}coverImage`) ? styles.error : ''}`} htmlFor={`coverImage${index}`}>Cover Image *</label>
                                        }
                                        <input className={styles.file} id={`coverImage${index}`} type='file' accept='image/' onChange={(e) => handleCompressImage(e, index)}/>
                                    </div>
                                </div>
                                <div className={styles.formContent}>
                                    <div className='inputContainer'>
                                        <label className='inputLabel' htmlFor='title'>Title * {emptyFields.includes('titleExists') && numberOfMovies === 1 ? <span className='error'>Title already exists</span> : ''}</label>
                                        <input className={`inputField ${emptyFields.includes(`movie${index}title`) && movie.title === "" ? 'error' : ''}`} id='title' type='text' value={movie.title} onChange={(e) => handleChange(index, 'title', e.target.value)}/>
                                    </div>
                                    <div className='inputContainer'>
                                        <label className='inputLabel' htmlFor='year'>Year *</label>
                                        <input className={`inputField ${emptyFields.includes(`movie${index}year`) && movie.year === "" ? 'error' : '' }`} id='year' type='number' value={movie.year} onChange={(e) => handleChange(index, 'year', e.target.value)}/>
                                    </div>
                                    <div className='inputContainer'>
                                        <label className='inputLabel' htmlFor='rating'>Rating *</label>
                                        <input className={`inputField ${emptyFields.includes(`movie${index}rating`) && movie.rating === "" ? 'error' : '' }`} id='rating' type='number' value={movie.rating} onChange={(e) => handleChange(index, 'rating', parseFloat(e.target.value))} step='0.5' min='1' max='5'/>
                                    </div>
                                    <div className='inputContainer'>
                                        <label className='inputLabel' htmlFor='imdbLink'>Imdb Link</label>
                                        <input className='inputField' id='imdbLink'  type='text' value={movie.imdbLink} onChange={(e) => handleChange(index, 'imdbLink', e.target.value)}/>
                                    </div>
                                    
                                    {numberOfMovies === 1 && (
                                        <div className={styles.topWorseContainer}>
                                            <div className={styles.checkboxWrapper} style={{width: '100px'}}>
                                                <input id='top25' type='checkbox' value={movie.top25} onChange={(e) => handleChange(index, 'top25', !movie.top25)}/>
                                                <label htmlFor='top25'>Top 25</label>
                                            </div>
                                            <div className={styles.checkboxWrapper} style={{width: '160px'}}>
                                                <input id='worse20' type='checkbox' value={movie.worse20} onChange={(e) => handleChange(index, 'worse20', !movie.worse20)}/>
                                                <label htmlFor='worse20'>Top 20 smeća</label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.tagsContainer}>
                                <p>Oznake:</p>
                                <div className={styles.tags}>
                                    {sortedTags.map((tag) => (
                                        <button
                                            onClick={() => handleTagChange(index, tag)}
                                            key={tag.tagLabel}
                                            className={`${styles.tag} ${movie.tags.some(selectedTag => selectedTag.tagValue === tag.tagValue && selectedTag.tagKey === tag.tagKey) ? styles.selected : ''}`}
                                            type='button'
                                        >
                                            {tag.tagLabel}   
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.textEditorContainer}>
                                <label className='inputLabel'>Post Content *</label>
                                <div className='styledEditor'>
                                    <Editor wrapperClassName={emptyFields.includes(`movie${index}reviewContent`) && movie.reviewContent === "" ? 'error' : '' } editorState={movie.editorState} onEditorStateChange={(newEditorState) => handleEditorStateChange(index, newEditorState)}
                                        toolbar={{
                                            options: ['inline', 'image', 'link', 'history'],
                                            inline: {
                                                options: ['bold', 'italic']
                                            },
                                            image: {
                                                urlEnabled: true,
                                                uploadEnabled: false,
                                                alignmentEnabled: true,
                                                className: 'imageButton',
                                                popupClassName: 'imagePopup',
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <AddMoreLikeThis selected={selectedMoreLikeThis} setSelected={setSelectedMoreLikeThis}/>
                    <div className={styles.submitBtnContainer}>
                        <LoadingBtn loading={loading} content="Objavi" type={loading ? 'button' : 'submit'} size={'20px'}/>
                    </div>
                </form>
                <ImageRepo handleContentImages={handleContentImages} contentImages={contentImages} formSubmitted={formSubmitted}/>
            </div>
        </main>
)
}

// Helper function to initialize movie state
function getInitialMovieState() {
  return {
    title: '',
    year: '',
    rating: '',
    reviewContent: '',
    editorState: EditorState.createEmpty(),
    imdbLink: '',
    top25: false,
    worse20: false,
    compressedCoverImage: null,
    tags: [],
    compressedOgImage: null,
  };
}
