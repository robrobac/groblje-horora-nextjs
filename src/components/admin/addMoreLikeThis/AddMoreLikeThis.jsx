"use client";
import styles from '@/components/admin/addMoreLikeThis/addMoreLikeThis.module.scss';
import SearchIcon from "@/components/searchBar/svg/SearchIcon";
import useDebounce from '@/hooks/useDebounce';
import { useEffect, useRef, useState } from 'react';
import AddMoreLikeThisList from './AddMoreLikeThisList';

export default function AddMoreLikeThis() {
    const inputRef = useRef(null);

    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const [searchResult, setSearchResult] = useState([]);
    const [selected, setSelected] = useState([]);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    

    useEffect(() => {
        // Fetch search results when debounced search term changes 
        const run = async () => {
            const term = debouncedSearch

            if (!term) {
                setSearchResult([]);
                setOpen(false);
                return;
            }
            setLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/quickSearch?search=${term}`);
                const json = await res.json();

                if (!res.ok) throw new Error('Failed to search Reviews data');

                const items = json.reviews

                setSearchResult(items);
                setOpen(true);

            } catch (err) {
                console.error('Error fetching reviews:', err.message);

                setSearchResult([]);
                setOpen(true);

            } finally {
                setLoading(false);
            }
        };

        run();
    }, [debouncedSearch]);

    
    useEffect(() => {
        // Close on outside click/touch
        const handleOutside = (e) => {
            const root = inputRef.current?.closest(`.${styles.addMoreLikeThis}`);

            if (root && !root.contains(e.target)) {
                inputRef.current?.blur();
                setOpen(false);
            }
        };

        window.addEventListener('mousedown', handleOutside);
        window.addEventListener('touchstart', handleOutside, { passive: true });

        return () => {
            window.removeEventListener('mousedown', handleOutside);
            window.removeEventListener('touchstart', handleOutside);
        };
    }, []);

    const handleSelect = (item) => {
        // Handling selection of an item from the dropdown
        setSelected((prev) => (prev.includes(item._id) ? prev : [...prev, item._id]));

        setSearch('');
        setSearchResult([]);
        setOpen(false);
        inputRef.current?.blur();
    };

    const removeSelected = (id) => {
        setSelected((prev) => prev.filter((x) => x !== id));
    };

    return (
        <div className={styles.addMoreLikeThisContainer}>
            <p>Moglo bi vas zanimati...</p>
            <div className={styles.addMoreLikeThis}>
                <div className={styles.addMoreLikeThisSearchContainer}>

                    <label className={styles.addMoreLikeThisSearchIcon} htmlFor='addMoreLikeThisSearch'><SearchIcon /></label>

                    <input
                        ref={inputRef}
                        id='addMoreLikeThisSearch'
                        className={styles.addMoreLikeThisSearchBar}
                        type='search'
                        autoComplete='off'
                        placeholder='Search'
                        value={search}
                        onFocus={() => setOpen(!!search.trim())}
                        onChange={(e) => {
                            setSearch(e.target.value || '');
                            setOpen(true);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                            }
                        }}
                    />

                </div>

                {/* Dropdown */}
                {open && (
                    <div className={styles.addMoreLikeThisDropdown}>
                        {loading && <div className={styles.addMoreLikeThisDropdownStatus}>Searching...</div>}

                        {!loading && search.trim().length > 0 && searchResult.length === 0 && (
                            <div className={styles.addMoreLikeThisDropdownStatus}>No result</div>
                        )}

                        {!loading && searchResult.length > 0 && (
                            <ol className={styles.addMoreLikeThisDropdownList}>
                                {searchResult.map((item, index) => {
                                    return (
                                        <li
                                            key={item._id || index}
                                            className={`${styles.addMoreLikeThisDropdownItem}`}
                                            onClick={() => handleSelect(item)}
                                        >
                                            <h4>{item.reviewTitle} {item.movies.length === 1 && (<span>({item?.movies[0].year})</span>)}</h4>
                                            {item.movies.length === 4 && (
                                                <p className={styles.addMoreLikeThisDescription}>
                                                    {item.movies[0].title} <span>({item?.movies[0].year})</span>, {item?.movies[1].title} <span>({item?.movies[1].year})</span>, {item?.movies[2].title} <span>({item?.movies[2].year})</span>, {item?.movies[3].title} <span>({item?.movies[3].year})</span>
                                                </p>
                                            )}
                                        </li>
                                    );
                                })}
                            </ol>
                        )}
                    </div>
                )}
            </div>

            {/* Selected reviews list */}
            {selected.length > 0 && (
                <AddMoreLikeThisList selectedIds={selected} removeSelected={removeSelected}/>
            )}
        </div>
    );
}

