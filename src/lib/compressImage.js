import Compressor from "compressorjs";


export const compressImage = (image, successCallback) => {
    if (image) {
        new Compressor(image, {
            quality: 0.8,
            height: 770,
            convertSize: Infinity,
            mimeType: 'image/webp',
            success: successCallback,
        });
    } else {
        successCallback(null)
    }
};
