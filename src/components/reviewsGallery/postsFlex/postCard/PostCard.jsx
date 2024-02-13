import { StandardBtn } from '@/components/buttons/standardBtn/StandardBtn';
import styles from '@/components/reviewsGallery/postsFlex/postCard/postCard.module.scss';
import PostDescription from './PostDescription';
import PostImage from './PostImage';
import EditDeleteButtons from '@/components/editDeleteButton/EditDeleteButtons';

export default function PostCard({post, handleRefresh, user, mongoUser}) {
    return (
        <div className={styles.postCardContainer}>
            <div className={styles.postCardDetails}>
                <PostImage post={post} />
                <EditDeleteButtons post={post} targetBlank={true} handleRefresh={handleRefresh} user={user} mongoUser={mongoUser}/>
                <PostDescription post={post} />
            </div>
            <StandardBtn path={`/recenzije/${post?.slug}`} content='Pročitaj više →' type='textOnly' newTab={true}/>
        </div>
    )
}
