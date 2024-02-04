import { StandardBtn } from '@/components/buttons/standardBtn/StandardBtn';
import styles from '@/components/reviewsGallery/postsFlex/postCard/postCard.module.scss';
import PostDescription from './PostDescription';
import PostImage from './PostImage';

export default function PostCard({post}) {
    return (
        <div className={styles.postCardContainer}>
            <div className={styles.postCardDetails}>
                <PostImage post={post} />
                <PostDescription post={post} />
            </div>
            <StandardBtn path={`/recenzije/${post?.slug}`} content='Pročitaj više →' type='textOnly' newTab={true}/>
        </div>
    )
}
