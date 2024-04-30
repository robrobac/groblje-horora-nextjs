import styles from '@/components/recenzijeComponent/recenzijeComponent.module.scss'
import { getCountAll } from "@/lib/utils"
import image from '../../../public/images/groblje-horora-recenzije-home-image.jpg'
import Link from "next/link"
import { StandardBtn } from "../buttons/standardBtn/StandardBtn"
import Image from 'next/image'


export const RecenzijeComponent = async ({count}) => {
    return (
        <article className={styles.recenzijeHomeCoverContainer}>
            <div className={styles.imageContainer}>
                <Image className={styles.coverImage} src={image} alt='Recenzije section background image, a screaming skeleton'></Image>
            </div>
            <section className={styles.coverContent}>
                <Link href={`/recenzije?page=1&sort=createdAt&order=desc`} target='_blank'>
                    <h3>Recenzije</h3>
                </Link>
                <StandardBtn type='right' path={`/recenzije?page=1&sort=createdAt&order=desc`} content='Pogledaj sve' span={`(${count.numberOfMovies})`} newTab={true}/>
            </section>
        </article>
    )
}