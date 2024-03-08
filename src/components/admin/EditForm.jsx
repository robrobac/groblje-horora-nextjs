'use client'
import { compressImage } from '@/lib/compressImage'
import { deleteImageFromFirebaseStorage, uploadImageToFirebaseStorage } from '@/lib/firebase/firebaseUtils'
import { slugify, stringFormatting } from '@/lib/utils'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import PreviewDialog from './PreviewDialog'
import ImageRepo from './ImageRepo'
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
// Dynamic import of react-draft-wysiwyg
const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), {
    ssr: false // Set ssr to false to prevent Next.js from trying to render it on the server side
});
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./editor.scss";
import styles from './newForm.module.scss';
import { FILTERING_OPTIONS } from '@/lib/sortOptions'
import { sortedTags } from '@/lib/tags'

export default function EditForm({slug}) {
    const [postPreview, setPostPreview] = useState(null)
    const [selectedTab, setSelectedTab] = useState('movie1')

    const [post, setPost] = useState({})
    const [reviewTitle, setReviewTitle] = useState('')
    const [contentImages, setContentImages] = useState([])
    const [selectedcategory, setSelectedcategory] = useState('')
    const [movies, setMovies] = useState([
        {
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
            
        },
        {
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
            
        },
        {
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
            
        },
        {
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
            
        }
    ])

    const [formSubmitted, setFormSubmitted] = useState(false)
    // If form fails checks on backend, change the state to trigger useEffect in PreviewDialog components and that way close the Preview Modal.
    const [formFailed, setFormFailed] = useState(false)

    // State that is recieved from backend to handle errors on empty fields.
    // unlike NewForm component, emptyFields in this component is handled on client side
    const [emptyFields, setEmptyFields] = useState([])

    const [loading, setLoading] = useState(false)

    const router = useRouter();

    // Fetching editing document by ID
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/reviews/${slug}`)
                const data = await response.json()
                
                if (response.ok) {
                    setPost(data)
                    setReviewTitle(data.reviewTitle)
                    setContentImages(data.contentImages)
                    setSelectedcategory(data.category)

                    setMovies(data.movies.map((movie) => {
                        return {
                            title: movie.title || '',
                            year: movie.year || '',
                            rating: movie.rating || '',
                            reviewContent: movie.reviewContent || '',
                            editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(movie.reviewContent))),
                            imdbLink: movie.imdbLink || '',
                            coverImage: movie.coverImage || '',
                            coverImagePath: movie.coverImagePath || '',
                            top25: movie.top25,
                            worse20: movie.worse20,
                            compressedCoverImage: movie.compressedCoverImage,
                            tags: movie.tags,
                        }
                    }))
                } else {
                    console.log(response.status)
                }
            } catch (err) {
                console.log(err)
            }   
        }
        fetchPost()
    }, [slug])

    // Creating State for Preview Screen before Submitting the Form
    useEffect(() => {
        const reviewPreview = {
            reviewTitle: reviewTitle,
            movies: movies.map((movie) => {
                return {
                    title: movie.title,
                    year: movie.year,
                    rating: movie.rating,
                    compressedCoverImage: movie.compressedCoverImage,
                    reviewContent: convertToRaw(movie.editorState.getCurrentContent()),
                    imdbLink: movie.imdbLink,
                    top25: movie.top25,
                    worse20: movie.worse20,
                    coverImage: movie.coverImage,
                    coverImagePath: movie.coverImagePath,
                }
            }),
            contentImages: contentImages,
        }
        setPostPreview(reviewPreview)
    }, [contentImages, movies, reviewTitle])

    // Compressing Image to prepare it for upload to Firebase Storage once form is submited
    const handleCompressImage = (e, index) => {
        const image = e.target.files[0];
        if (image) {
            compressImage(image, (compressedResult) => {
                const updatedMovies = [...movies]
                updatedMovies[index].compressedCoverImage = compressedResult
                setMovies(updatedMovies)
            })
        } else {
            const updatedMovies = [...movies]
            updatedMovies[index].compressedCoverImage = null
            setMovies(updatedMovies)
        }
    };

    // Handling input changes
    const handleChange = (index, field, value) => {
        const updatedMovies = [...movies];
        updatedMovies[index][field] = value;
        setMovies(updatedMovies);
    }

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
        const updatedMovies = [...movies]
        // Saving editor state as it originaly is
        updatedMovies[index].editorState = newEditorState
        // Saving editor state converted to raw JSON
        const rawData = JSON.stringify(convertToRaw(newEditorState.getCurrentContent()))
        updatedMovies[index].reviewContent = rawData
        //  Updating Movies State
        setMovies(updatedMovies)
    }

    // Function passed to ImageRepo component to handle uploaded images.
    const handleContentImages = (value) => {
        setContentImages(value)
    }

    // Function to handle clicking on hidden File Input field.
    const handleUploadClick = (index) => {
        const clickedElement = document.getElementById(`coverImage${index}`)
        if (clickedElement) {
            clickedElement.click()
        }
    }

    // Function to handle all logic behind Edit Form Submit.
    const handleSubmit = async (e) => {
        e.preventDefault()

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

        const movieReviews = movies.map( async (movie) => {
            return new Promise(async (resolve, reject) => {
                let url = movie.coverImage
                let filePath = movie.coverImagePath
                // Old Cover Image path will be stored here in order to be used in delete from firebase storage function once the new cover image is uploaded
                let oldCoverPath = movie.coverImagePath

                // if cover image is uploaded and compressed upload it to firebase storage
                if (movie.compressedCoverImage) {
                    console.log("ima compressedCoverImage")
                    // create firebase storage path
                    const path = `coverImages/${slugify(movie.title, movie.year)}-coverImage-${Date.now()}.jpg`

                    try {
                        // requiredInputs handles checking if there's empty fields in the form, if there is then don't upload cover images to firebase
                        if (requiredInputs.length === 0) {
                            //  Remove old cover image from storage
                            console.log("Deleting old cover image from storage")
                            await deleteImageFromFirebaseStorage(oldCoverPath)
                            console.log("Old cover image deleted from storage")
                            // Upload new cover image to storage
                            const result = await uploadImageToFirebaseStorage(movie.compressedCoverImage, path)
                            // Setting a new URL to save it in MongoDB document as a reference to the uploaded file
                            url = result.url
                            // Setting a uploaded image path to save it in MongoDB document as a reference to the path(used mostly for deleting image in the future)
                            filePath = result.path
                        }
                        
                    } catch (err) {
                        reject(err)
                        setLoading(false)
                    }
                }

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
                })
            })
        })
        
        // After the document object is prepared, wait for all promises and send it to MongoDB
        Promise.all(movieReviews)
            .then(async(resolvedMovieReviews) => {
                const review = {
                    reviewTitle: resolvedMovieReviews.length === 1 ? resolvedMovieReviews[0].title : reviewTitle,
                    movies: resolvedMovieReviews,
                    contentImages: contentImages,
                    selectedcategory: selectedcategory,
                }

                // API Call to post a new Review
                const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/reviews/${post.slug}?id=${post._id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(review),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const json = await response.json()

                if (!response.ok) {
                    setEmptyFields(json.emptyFields)
                    setFormFailed(!formFailed)
                    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                    console.log(json)
                    setLoading(false)
                }
                if(response.ok) {
                    // If response is OK, restart form states
                    setReviewTitle('')
                    setEmptyFields([])
                    setSelectedcategory('')
                    setMovies([
                        {
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
                            
                        },
                        {
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
                            
                        },
                        {
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
                            
                        },
                        {
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
                        }
                    ])

                    // Change FormSubmitted state in order to re render ImageRepo so it will clear its states
                    setFormSubmitted(!formSubmitted)

                    // Delete images from tempImages, Images in ImageRepo are saved to TempImages in case user uploaded images through ImageRepo but never finished the form.
                    // That way we know what images are uploaded to firebase storage but are not used for anything in the posts
                    contentImages.forEach(async(image) => {
                        const deleteResponse = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/tempMedia/${image.id}`, {
                            method: 'DELETE'
                        })
                        const deleteJson = await deleteResponse.json()

                        if (response.ok) {
                            console.log("deleted from tempImages", deleteJson)
                        }
                    })
                    // Clear ContentImages state
                    setContentImages([])
                    setLoading(false)

                    // Navigate to edited post
                    router.push(`/recenzije/${json.slug}`)
                }
            })
    }


    return (
        <main className={styles.pageContainer}>
            <div className={styles.formSection}>
                <form className={styles.styledForm} onSubmit={handleSubmit}>
                    {movies.length === 4 ? (
                        <>
                            <div className='inputContainer'>
                                <label className='inputLabel' htmlFor='reviewTitle'>Review Title {emptyFields.includes('titleExists') ? <span className='error'>Title already exists</span> : ''}</label>
                                <input className={`inputField ${emptyFields.includes('reviewTitle') ? 'error' : '' }`} id='reviewTitle' type='text' value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)}/>
                            </div>
                            <div className={styles.categoriesAndTags}>
                                <p>Kategorije:</p>
                                <div className={styles.categoryContainer}>
                                    {Object.values(FILTERING_OPTIONS.QUAD.categories).map(category => (
                                        <div key={category.dbValue} className={styles.checkboxWrapper} style={{width: '170px'}}>
                                            <input id={category.dbValue} type='checkbox' onChange={() => setSelectedcategory(category.dbValue)} checked={selectedcategory === category.dbValue}/>
                                            <label htmlFor={category.dbValue} className={emptyFields.includes('category') ? styles.error : ''}>{category.label}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                            <div className={styles.categoryContainer}>
                                {Object.values(FILTERING_OPTIONS.SINGLE.categories).map(category => (
                                    <div key={category.dbValue} className={styles.checkboxWrapper} style={{width: '160px'}}>
                                        <input id={category.dbValue} type='checkbox' onChange={() => setSelectedcategory(category.dbValue)} checked={selectedcategory === category.dbValue}/>
                                        <label htmlFor={category.dbValue} className={emptyFields.includes('category') ? styles.error : ''}>{category.label}</label>
                                    </div>
                                ))}
                            </div>
                    )}
                    <div className={styles.tabs}>
                        <div className={styles.tabList}>
                            {movies.map((movie, index) => (
                                <div className={`${styles.tab} ${selectedTab === `movie${index + 1}` && styles.isActive}`} key={`movie${index + 1}`} onClick={() => setSelectedTab(`movie${index + 1}`)}>Movie {index + 1}</div>
                            ))}
                        </div>
                    </div>
                    {movies.map((movie, index) => (
                        <div className={`${styles.tabPanel} ${selectedTab === `movie${index + 1}` && styles.isActive}`} key={`movie${index + 1}`}>
                            <h3>Cover Image <span>(movie {index + 1})</span></h3>
                            <div className={styles.formContainer}>
                                <div className={styles.formImage}>
                                    <div>
                                        {movie.compressedCoverImage || movie.coverImage
                                        ?
                                            <img src={movie.compressedCoverImage ? URL.createObjectURL(movie.compressedCoverImage) : movie.coverImage} alt='uploadedImage' onClick={() => handleUploadClick(index)}/>
                                        :
                                            <label className={`${styles.fileLabel} ${emptyFields.includes(`movie${index}coverImage`) ? 'error' : ''}`} htmlFor={`coverImage${index}`}>Cover Image</label>
                                        }
                                        <input className={styles.file} id={`coverImage${index}`} type='file' accept='image/' onChange={(e) => handleCompressImage(e, index)}/>
                                    </div>
                                </div>
                                <div className={styles.formContent}>
                                    <div className='inputContainer'>
                                        <label className='inputLabel' htmlFor='title'>Title {emptyFields.includes('titleExists') && movies.length === 1 ? <span className='error'>Title already exists</span> : ''}</label>
                                        <input className={`inputField ${emptyFields.includes(`movie${index}title`) ? 'error' : ''}`} id='title' type='text' value={movie.title} onChange={(e) => handleChange(index, 'title', e.target.value)}/>
                                    </div>
                                    <div className='inputContainer'>
                                        <label className='inputLabel' htmlFor='year'>Year</label>
                                        <input className={`inputField ${emptyFields.includes(`movie${index}year`) ? 'error' : '' }`} id='year' type='number' value={movie.year} onChange={(e) => handleChange(index, 'year', e.target.value)}/>
                                    </div>
                                    <div className='inputContainer'>
                                        <label className='inputLabel' htmlFor='rating'>Rating</label>
                                        <input className={`inputField ${emptyFields.includes(`movie${index}rating`) ? 'error' : '' }`} id='rating' type='number' value={movie.rating} onChange={(e) => handleChange(index, 'rating', parseFloat(e.target.value))} step='0.5' min='1' max='5'/>
                                    </div>
                                    <div className='inputContainer'>
                                        <label className='inputLabel' htmlFor='imdbLink'>Imdb Link</label>
                                        <input className='inputField' id='imdbLink'  type='text' value={movie.imdbLink} onChange={(e) => handleChange(index, 'imdbLink', e.target.value)}/>
                                    </div>

                                    {movies.length === 1 && (
                                        <div className={styles.topWorseContainer}>
                                            <div className={styles.checkboxWrapper} style={{width: '100px'}}>
                                                <input id='top25' type='checkbox' value={movie.top25} checked={movie.top25} onChange={(e) => handleChange(index, 'top25', !movie.top25)}/>
                                                <label htmlFor='top25'>Top25</label>
                                            </div>
                                            <div className={styles.checkboxWrapper} style={{width: '160px'}}>
                                                <input id='worse20' type='checkbox' value={movie.worse20} checked={movie.worse20} onChange={(e) => handleChange(index, 'worse20', !movie.worse20)}/>
                                                <label htmlFor='worse20'>Worse20</label>
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
                                <label className='inputLabel'>Post Content</label>
                                <div className='styledEditor'>
                                    <Editor wrapperClassName={emptyFields.includes(`movie${index}reviewContent`) ? 'error' : '' } editorState={movie.editorState} onEditorStateChange={(newEditorState) => handleEditorStateChange(index, newEditorState)}
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
                    {postPreview ? <PreviewDialog loading={loading} postPreview={postPreview} formFailed={formFailed}/> : ''}
                </form>
                <ImageRepo handleContentImages={handleContentImages} contentImages={contentImages} formSubmitted={formSubmitted}/>
            </div>
        </main>
    )
}
