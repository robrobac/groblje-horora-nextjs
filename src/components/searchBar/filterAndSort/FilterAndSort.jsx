import React, { useContext, useEffect, useRef, useState } from 'react'
import buttonStyles from '@/components/buttons/buttons.module.scss'
import SortAndFilterIcon from '@/components/svgComponents/SortAndFilterIcon'
import styles from './filterAndSort.module.scss'
import Filter from '../Filter'
import { FILTERING_OPTIONS, SORTING_OPTIONS } from '@/lib/sortOptions'
import Sort from '../Sort'
import useCountReviews from '@/hooks/useCountReviews'
import { ReviewsGalleryContext } from '@/components/reviewsGallery/ReviewsGallery'

export default function FilterAndSort() {
    const filterAndSortControlsRef = useRef(null);
    const [optionsOpen, setOptionsOpen] = useState(false)

    const {
        search,
        handleFilter,
        filter,
        handleSortAndOrder,
        sort,
        order,
    } = useContext(ReviewsGalleryContext)
    
    const { count } = useCountReviews()

    useEffect(() => {
        function handleClickOutside(event) {
            if (optionsOpen) {
                if (filterAndSortControlsRef.current && !filterAndSortControlsRef.current.contains(event.target)) {
                    setOptionsOpen(false);
                }
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [optionsOpen]);

    return (
        <div className={styles.filterAndSortContainer}>
            <button className={`${buttonStyles.button} ${buttonStyles.sortAndFilterButton} ${optionsOpen && buttonStyles.active}`} onClick={(e) => setOptionsOpen(!optionsOpen)}>
                Filtriranje i Sortiranje
                <SortAndFilterIcon />
            </button>
            {optionsOpen && (
                <div className={styles.filterAndSortControls} ref={filterAndSortControlsRef}>
                    <div className={styles.filterOptions}>
                        <p>Filtriraj</p>
                        <Filter clickFunction={handleFilter} title='Sve' label='' filter={filter} search={search} count={count} counting={count?.numberOfReviews}/>
                        <Filter clickFunction={handleFilter} title='Kratki Pregledi' label='quad' filter={filter} search={search} count={count} counting={count?.quadReviews}/>
                        <Filter clickFunction={handleFilter} title='Recenzije' label='single' filter={filter} search={search} count={count} counting={count?.singleReviews}/>
                        {Object.keys(FILTERING_OPTIONS).map(optionKey => {
                            const option = FILTERING_OPTIONS[optionKey];
                            return (
                                <React.Fragment key={option.dbValue}>
                                    {/* <p>{option.label}</p> */}
                                    <Filter key={option.dbValue} title={option.label} label='...'/>
                                    {option.subCategories && Object.keys(option.subCategories).map(subCategoryKey => {
                                        const subCategory = option.subCategories[subCategoryKey];
                                        return (
                                            <Filter key={subCategory.dbValue} title={subCategory.label} label='...'/>
                                        );
                                    })}
                                </React.Fragment>
                            );
                        })}
                    </div>
                    
                    <div className={styles.sortOptions}>
                        <p>Sortiraj</p>
                        {Object.keys(SORTING_OPTIONS).map(option => (
                            <Sort
                                key={SORTING_OPTIONS[option].dbKey}
                                title={SORTING_OPTIONS[option].label}
                                sortOption={SORTING_OPTIONS[option].dbKey}
                                search={search}
                                clickFunction={handleSortAndOrder}
                                sort={sort}
                                order={order}
                                />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
