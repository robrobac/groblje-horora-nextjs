import styles from '@/components/rating/rating.module.scss';

const formatRating = (number) => {
    const validRatings = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

    if (!validRatings.includes(number)) {
        return 'rating0';
    }

    return 'rating' + number.toString().replace('.', '');
};

export const Rating = ({rating, detailed}) => {
     
    return (
        <div className={styles.ratingContainer}>
            <img src={`/images/rating/${formatRating(rating)}.png`} alt={`rating: ${rating}/5`}/>
            {detailed ? <span>{rating} / 5</span> : ''}
        </div>
    )
}
