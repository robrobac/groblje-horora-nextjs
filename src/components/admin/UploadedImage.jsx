import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import styles from './imageRepo.module.scss';

export default function UploadedImage({image, index, handleDeleteUploaded}) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, '900')
    }


    return (
        <CopyToClipboard text={image.url} onCopy={handleCopy}>
            <div className={styles.uploadedImage} onClick={() => console.log('copy')}>
                <span className={styles.deleteButton} onClick={(e) => handleDeleteUploaded(e, image, index)}>X</span>
                {copied ? <span className={styles.copySuccess}>COPIED</span> : ''}
                <img key={index} src={image.url} alt='UploadedImage'/>
                <p>Copy URL</p>
            </div>
        </CopyToClipboard>
    )
}
