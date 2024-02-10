import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './config';

export const uploadImageToFirebaseStorage = async (file, path) => {
    try {
        const fileRef = ref(storage, path);
        const snapshot = await uploadBytes(fileRef, file);
        const url = await getDownloadURL(snapshot.ref);
        return { url, path };
    } catch (error) {
        console.error('Error uploading image to Firebase Storage:', error);
        throw error;
    }
}

export const deleteImageFromFirebaseStorage = async (path) => {

    if (path) {
        const oldFileRef = ref(storage, path)

        deleteObject(oldFileRef).then(() => {

        }).catch((error) => {
            console.log(error)
        });
    }
}