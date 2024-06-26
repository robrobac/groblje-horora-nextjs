import Compressor from "compressorjs";


export const compressImage = (image, successCallback) => {
    if (image) {
        new Compressor(image, {
            quality: 0.8,
            height: 770,
            convertSize: 102400,
            mimeType: 'image/jpeg',
            success: successCallback,
        });
    } else {
        successCallback(null)
    }
};

export const compressOgImage = (image, successCallback) => {
    if (image) {
        new Compressor(image, {
            quality: 0.8,
            width: 1200,
            convertSize: Infinity,
            mimeType: 'image/jpeg',
            success: successCallback,
        });
    } else {
        successCallback(null)
    }
};

