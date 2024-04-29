import styles from '@/components/reviewsGallery/postsFlex/postsFlex.module.scss';
import PostCard from './postCard/PostCard';
import GhostSpinner from '@/components/ghostSpinner/GhostSpinner';

export default function PostsFlex({posts, handleRefresh, user, mongoUser, loading}) {
    return (
        <section className={styles.postsFlexContainer}>
            <div className={styles.postsFlexRow}>
                {posts && posts?.map((post) => (
                    <PostCard post={post} key={post._id} handleRefresh={handleRefresh} user={user} mongoUser={mongoUser}/>
                ))}
            </div>
            {loading && (
                <div className={styles.loadingContainer}>
                    <GhostSpinner />
                </div>
            )}
        </section>
    )
}
