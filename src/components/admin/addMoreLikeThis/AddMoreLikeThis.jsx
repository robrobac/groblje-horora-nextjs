"use client";
import styles from '@/components/admin/addMoreLikeThis/addMoreLikeThis.module.scss';
import SearchIcon from "@/components/searchBar/svg/SearchIcon";
import useDebounce from '@/hooks/useDebounce';
import { useEffect, useRef, useState } from 'react';

export default function AddMoreLikeThis() {
    const inputRef = useRef(null);

    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const [searchResult, setSearchResult] = useState([]);
    const [selected, setSelected] = useState([]);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const labelFor = (item) => item?.title || item?.name || item?.slug || 'Untitled';

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
                            <ul className={styles.addMoreLikeThisDropdownList}>
                                {searchResult.map((item, index) => {
                                    return (
                                        <li
                                            key={item._id || index}
                                            className={`${styles.addMoreLikeThisDropdownItem}`}
                                            onClick={() => handleSelect(item)}
                                        >
                                            {item._id}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                )}
            </div>

            {/* Selected reviews list */}
            {selected.length > 0 && (
                <div className={styles.selectedChips}>
                    {selected.map((item, index) => {
                        
                        return (
                            <span className={styles.chip} key={item}>
                                <span className={styles.chipText}>{item}</span>
                                <button className={styles.chipRemove} onClick={() => removeSelected(item)}>×</button>
                            </span>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

