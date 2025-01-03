/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react'
import Compressor from 'compressorjs';
import UploadedImage from './UploadedImage';
import { stringFormatting } from '@/lib/utils';
import { deleteImageFromFirebaseStorage, uploadImageToFirebaseStorage } from '@/lib/firebase/firebaseUtils';
import styles from './imageRepo.module.scss';
import { LoadingBtn } from '../buttons/loadingBtn';

export default function ImageRepo({handleContentImages, contentImages, formSubmitted, isEditing}) {
    // State that holds compressed images that are later uploaded to Firebase Storage, once upload is successful clear the state.
    const [compressedImages, setCompressedImages] = useState([])
    const imagesInputRef = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null)

    const [uploadingImages, setUploadingImages] = useState(false)

    useEffect(() => {
        setCompressedImages([])
    }, [formSubmitted])


    // COmpressing images once uploaded to frontend in order to send them to Firebase Storage
    const handleCompressImage = (e) => {
        setUploadingImages(true)
        // Getting all files uploaded to Input Type: File
        const files = e.target.files;
        // IF there's files uploaded proceed with compression
        if (files) {
            // Compress each uploaded file and push it to CompressedImages state.
            Array.from(files).forEach((file) => {
                // Compress only if file is of image type
                if (file.type.startsWith('image/')) {
                    new Compressor(file, {
                        quality: 0.8,
                        width: 700,
                        mimeType: 'image/webp',
                        convertSize: Infinity,
                        success: (compressedResult) => {
                            setCompressedImages(prev => [...prev, compressedResult]);
                        }
                    });
                    // Don't compress if file is not of image type
                } else {
                    // console.log('file is not an image, skipped', file.name) // Keep in Development
                }
            });
            setUploadingImages(false)
        } else {
            setCompressedImages(null)
            setUploadingImages(false)
        }
    };

    const getCurrentTime = () => {
        const now = new Date();
        const formattedTime = `${now.toLocaleString()}:${now.getMilliseconds().toString().padStart(3, '0')}`;
        return formattedTime;
    };

    const setLogsFunction = (message) => {
        const timestamp = getCurrentTime();
        return `[${timestamp}] ${message}`
    }

    const downloadLogs = (logsArray) => {
        const timestamp = Date.now();
        console.log("LOGS", logsArray)
        // const logText = logs.join('\n'); // Join all logs with newlines
        const logText = JSON.stringify(logsArray, null, 2); // Pretty print the logs
        console.log("LOGTEXT", logText)
        const blob = new Blob([logText], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `console-logs_${timestamp}.txt`; // The name of the downloaded file
        link.click(); // Trigger the download
    };


    // Uploading compressed images to Firebase Storage and retrieveing its url path
    const getLinks = async () => {
        setUploadingImages(true)

        const localLogs = [];

        console.log("Upload images to firebase storage, started")
        localLogs.push(setLogsFunction("Upload images to firebase storage, started"))
        for (const image of compressedImages) {
            let url = '';
            let path = '';
    
            // create firebase storage path
            path = `postImages/${stringFormatting('post-image-', Date.now())}`;
            console.log("Image firebase storage path created:", path)
            localLogs.push(setLogsFunction(`Image firebase storage path created: ${path}`))
    
            try {
                // Upload to Firebase and retrieve image's url and path
                const result = await uploadImageToFirebaseStorage(image, path);
                url = result.url;
                path = result.path;
                console.log("Image uploaded, URL:", url)
                localLogs.push(setLogsFunction(`Image uploaded, URL: ${url}`))
                console.log("Image uploaded, path:", path)
                localLogs.push(setLogsFunction(`Image uploaded, path: ${path}`))

            } catch (error) {
                console.log("Error uploading image to firebase storage:", error.message)
                localLogs.push(setLogsFunction(`Error uploading image to firebase storage: ${error.message}`))
                console.log(error);
                setError(error);
            }
    
            // Creating Uploaded Image object in order to save it to MongoDB
            const uploadedImage = {
                url: url,
                path: path,
            };
            console.log("Uploaded image object created:", JSON.stringify(uploadedImage))
            localLogs.push(setLogsFunction(`Uploaded image object created: ${JSON.stringify(uploadedImage)}`))
    
            // Saving uploaded image to MongoDB collection
            console.log("Saving image to MongoDB, started")
            localLogs.push(setLogsFunction("Saving image to MongoDB, started"))
            const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/tempMedia`, {
                method: 'POST',
                body: JSON.stringify(uploadedImage),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const json = await response.json();
    
            if (!response.ok) {
                console.log("Error saving image to MongoDB", json)
                localLogs.push(setLogsFunction(`Error saving image to MongoDB: ${json}`))
                localLogs.push(setLogsFunction(`Error saving image to MongoDB: ${JSON.stringify(json)}`))
                setError(json.error);
                localLogs.push(setLogsFunction(`Error saving image to MongoDB: ${json.error}`))
            }
    
            if (response.ok) {
                console.log("Image saved to MongoDB", json)
                localLogs.push(setLogsFunction(`Image saved to MongoDB: ${JSON.stringify(json)}`))
                // Retrieving new MongoDB data
                const uploaded = {
                    url,
                    path,
                    id: json._id,
                };
    
                // setting uploaded images state and clearing compressed images state because all compressed images are uploaded to Storage.
                setCompressedImages([]);
                imagesInputRef.current.value = null;
                handleContentImages((prev) => [...prev, uploaded]);
            }
    
            // Introduce a 500ms delay before processing the next image
            await new Promise((resolve) => setTimeout(resolve, 500));
        }
        setUploadingImages(false)
        console.log("Upload images to firebase storage, finished")
        localLogs.push(setLogsFunction("Upload images to firebase storage, finished"))

        await new Promise((resolve) => setTimeout(resolve, 200));
        console.log(localLogs)
        downloadLogs(localLogs);
    };
    
    const handleDeleteCompressed = (imageToDelete) => {
        const newArray = compressedImages.filter((image) => image !== imageToDelete)
        setCompressedImages(newArray)
    };

    const handleDeleteUploaded = async (e, imageToDelete, indexToDelete) => {
        e.stopPropagation()
        const path = imageToDelete.path
        deleteImageFromFirebaseStorage(path)

        handleContentImages(contentImages.filter((image) => image.path !== imageToDelete.path))
        
        const deleteResponse = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/tempMedia/${imageToDelete.id}`, {
            method: 'DELETE'
        })
        const json = await deleteResponse.json()

        if (deleteResponse.ok) {
            console.log("deleted from tempImages", json)
        }
    }
 
  return (
    <div className={styles.stickyContainer}>
        <div className={styles.repo}>
            <div className={styles.repoSection}>
                <LoadingBtn loading={uploadingImages} content="Odaberi slike" size={'20px'} label={true} htmlFor='contentImage' width='200px'/>
                <input className={styles.repoFile} multiple={true} ref={imagesInputRef} id='contentImage' type='file' accept='image/' onChange={handleCompressImage}/>
            </div>
            <div className={styles.repoImages}>
                {compressedImages.map((image, index) => (
                    
                    <img className={styles.compressedImage} key={`image${index}`} src={URL.createObjectURL(image)} alt='CompressedImage' onClick={() => handleDeleteCompressed(image)}/>
                    
                ))}
            </div>
            {compressedImages.length  !== 0 ? (
                <div className={styles.repoSection}>
                    <LoadingBtn onClick={getLinks} loading={uploadingImages} content="Uploadaj slike" type='button' size={'20px'} width='200px'/>
                </div>
            ) : ''}
            {contentImages.length !== 0 ? (
                <>
                    {isEditing && <p style={{color: 'red', textAlign: 'center'}}>Koja brate ovo je upozorenje!<br></br><br></br>Znam da uredjujes post pa te molim da kad obrises jednu ili vise slika ispod ovog teksta, OBAVEZNO spremis promjene kako bi se URLovi obrisanih slika maknuli iz baze.<br></br><br></br><i>(trenutno je ovako, sredit cemo nekad mf)</i></p>}
                    
                    <div className={styles.repoImages}>
                    {contentImages.map((image, index) => (
                        <UploadedImage key={`uploadedimage${index}`} image={image} index={index} handleDeleteUploaded={handleDeleteUploaded}/>
                    ))}
                    </div>
                </>
            ) : ''}
            
        </div>
    </div>
  )
}
