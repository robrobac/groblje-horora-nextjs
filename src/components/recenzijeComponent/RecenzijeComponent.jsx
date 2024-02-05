import styles from '@/components/recenzijeComponent/recenzijeComponent.module.scss'
import { getCountAll } from "@/lib/utils"
import image from '../../../public/images/groblje-horora-recenzije-home-image.webp'
import Link from "next/link"
import { StandardBtn } from "../buttons/standardBtn/StandardBtn"


export const RecenzijeComponent = async () => {
    const count = await getCountAll()

    return (
        <div className={styles.recenzijeHomeCoverContainer} >
            <img className={styles.coverImage} src={image.src} alt='movie-cover'></img>
            <div className={styles.coverContent}>
                <Link href={`/recenzije?page=1&sort=createdAt&order=desc`} target='_blank'>
                    <h2>Recenzije</h2>
                </Link>
                <StandardBtn type='right' path={`/recenzije?page=1&sort=createdAt&order=desc`} content='Pogledaj sve' span={`(${count.numberOfMovies})`} newTab={true}/>
            </div>
        </div>
    )
}