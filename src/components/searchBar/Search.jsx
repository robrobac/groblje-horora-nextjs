import React, { useContext, useEffect, useRef } from 'react'
import styles from '@/components/searchBar/search.module.scss';
import SearchIcon from './svg/SearchIcon'
import Filter from './Filter'
import Sort from './Sort'
import useCountReviews from '@/hooks/useCountReviews';
import { SORT_OPTIONS } from '@/lib/sortOptions';
import FilterAndSort from './filterAndSort/FilterAndSort';
import { ReviewsGalleryContext } from '../reviewsGallery/ReviewsGallery';

export default function Search() {
    const inputRef = useRef(null)

    const {
        handleSearch,
        search,
    } = useContext(ReviewsGalleryContext)

    //  event listeners for closing the virtual keyboard on touch outside the input field
    useEffect(() => {
        // Attach scroll event listener when component mounts
        window.addEventListener('touchmove', handleOutsideClick);
        
        // Detach scroll event listener when component unmounts
        return () => {
            window.removeEventListener('touchmove', handleOutsideClick);
        };
    }, []);

    //  function that handles tapping outside the input value in order to close virtual keyboard
    const handleOutsideClick = (e) => {
        // Blur input if the click is outside of the input element
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            inputRef.current.blur();
        }
    };
        
    //  close virtual keyboard on enter
    const onEnter = (e) => {
        console.log('On Enter')
        if (e.key === "Enter") {
            e.target.blur();
        }
    };

    return (
        <div className={styles.searchComp}>
            <div className={styles.searchContainer}>
                <label className={styles.searchIcon} htmlFor='adminSearch'>
                    <SearchIcon />
                </label>
                <input
                    className={styles.searchBar}
                    ref={inputRef}
                    onKeyUp={onEnter}
                    id='adminSearch'
                    type='search'
                    placeholder='Search'
                    value={search}
                    onChange={(e) => handleSearch(e.target.value || '')}
                />
            </div>
                <div className={styles.searchControls}>
                    <FilterAndSort/>
                </div>
        </div>
    )
}
