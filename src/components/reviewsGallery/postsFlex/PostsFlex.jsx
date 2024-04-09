import styles from '@/components/reviewsGallery/postsFlex/postsFlex.module.scss';
import PostCard from './postCard/PostCard';

export default function PostsFlex({posts, handleRefresh, user, mongoUser}) {
    return (
        <section className={styles.postsFlexContainer}>
            <div className={styles.postsFlexRow}>
                {posts && posts?.map((post) => (
                    <PostCard post={post} key={post._id} handleRefresh={handleRefresh} user={user} mongoUser={mongoUser}/>
                ))}
            </div>
        </section>
    )
}
