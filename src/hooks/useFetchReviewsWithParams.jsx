"use client"
import { SORTING_OPTIONS } from '@/lib/sortOptions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function useFetchReviewsWithParams(initialSort, initialOrder, initialPerPage) {
    // console.log('----------')

    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [totalItems, setTotalItems] = useState()

    const [totalPages, setTotalPages] = useState([])

    const [perPage, setPerPage] = useState(initialPerPage);

    const [refresh, setRefresh] = useState(false);

    const router = useRouter();
    const pathname = usePathname();
    var searchParams = useSearchParams();

    // Page States and Params
    const urlPage = searchParams.get('page');
    const [page, setPage] = useState(urlPage ? parseInt(urlPage) : 1);
    // console.log('page: ', page)

    const urlSort = searchParams.get('sort');
    const [sort, setSort] = useState(urlSort ? urlSort : initialSort)
    // console.log('sort: ', sort)

    const urlOrder = searchParams.get('order');
    const [order, setOrder] = useState(urlOrder ? urlOrder : initialOrder)
    // console.log('order: ', order)

    const urlSelectedFilterKey = searchParams.get('key')
    const [selectedFilterKey, setSelectedFilterKey] = useState(urlSelectedFilterKey ? urlSelectedFilterKey : '')
    // console.log('Selected Filter Key: ', selectedFilterKey)

    const urlSelectedFilterVal = searchParams.get('filter')
    const [selectedFilterVal, setSelectedFilterVal] = useState(urlSelectedFilterVal ? urlSelectedFilterVal : '')
    // console.log('Selected Filter Val: ', selectedFilterVal)

    const urlSearch = searchParams.get('search')
    const [search, setSearch] = useState(urlSearch ? urlSearch : '')
    // console.log('search: ', search)


    useEffect(() => {
        // Initialize new search parameters
        const newSearchParams = new URLSearchParams(searchParams);

        // Set default values if not present in the URL
        if (!newSearchParams.has('page')) {
            newSearchParams.set('page', '1');
            setPage(1)
        }

        // Set default values if not present in the URL
        if (!newSearchParams.has('sort')) {
            newSearchParams.set('sort', initialSort);
            setSort(initialSort)
        }

        // Set default values if not present in the URL
        if (!newSearchParams.has('order')) {
            newSearchParams.set('order', initialOrder);
            setOrder(initialOrder)
        }

        // Update searchParams with default values if needed
        router.push(pathname + '?' + newSearchParams.toString(), { scroll: false });
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    
    const fetchReviews = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/reviews?search=${search}&sort=${sort}&order=${order}&page=${page}&perPage=${perPage}&selectedFilterKey=${selectedFilterKey}&selectedFilterVal=${selectedFilterVal}`);
            const json = await res.json()
            if (!res.ok) {
                throw new Error('Failed to fetch Reviews data');
            }
            if (res.ok) {
                setReviews(json.reviews);
                const pagesArray = Array.from({ length: json.totalPages }, (_, index) => index + 1);
                setTotalPages(pagesArray);
                setTotalItems(json.totalItems)
            }
        } catch (err) {
            console.error('Error fetching reviews:', err.message);
        } finally {
            setLoading(false);
        }   
    }

    useEffect(() => {
        fetchReviews();
    }, [page, selectedFilterKey, selectedFilterVal, sort, order, search, refresh]);


    useEffect(() => {
        const pageNumber = parseInt(searchParams.get('page'), 10) || 1;
        const filterKey = searchParams.get('key' || '')
        const filterValue = searchParams.get('filter') || '';
        const sortValue = searchParams.get('sort') || '';
        const orderValue = searchParams.get('order') || '';
        const searchValue = searchParams.get('search') || '';
        setPage(pageNumber);
        setSelectedFilterKey(filterKey)
        setSelectedFilterVal(filterValue)
        setSort(sortValue)
        setOrder(orderValue)
        setSearch(searchValue)
        
    }, [searchParams.get('page'), searchParams.get('key'), searchParams.get('filter'), searchParams.get('sort'), searchParams.get('order'), searchParams.get('search')])


    const handlePageChange = (num) => {
        setPage(num)
        // Create a new URLSearchParams object before modifying it
        const newSearchParams = new URLSearchParams(searchParams);
        // Update the 'page' parameter
        newSearchParams.set('page', num);
        newSearchParams.delete('search');
        // Use setSearchParams to apply the changes
        router.push(pathname + '?' + newSearchParams.toString());
    }

    const handleSearch = (value) => {
        setSearch(value)
        setPage(1)

        // Create a new URLSearchParams object before modifying it
        const newSearchParams = new URLSearchParams(searchParams);

        if (value) {
            // Update the 'page' parameter
            newSearchParams.set('search', value);
            newSearchParams.set('page', 1);
        }
        if (!value) {
            // Update the 'page' parameter
            newSearchParams.delete('search');
            newSearchParams.set('page', 1);
        }
        // Use setSearchParams to apply the changes
        router.push(pathname + '?' + newSearchParams.toString(), { scroll: false });

    }

    const handleFilter = (filterKey, filterValue) => {
        setSelectedFilterKey(filterKey)
        setSelectedFilterVal(filterValue)
        setPage(1)

        // Create a new URLSearchParams object before modifying it
        const newSearchParams = new URLSearchParams(searchParams);

        if (filterKey && filterValue) {
            // Update the 'page' parameter
            newSearchParams.set('key', filterKey)
            newSearchParams.set('filter', filterValue)
            newSearchParams.set('page', 1);
            newSearchParams.delete('search');
            // Use setSearchParams to apply the changes
            router.push(pathname + '?' + newSearchParams.toString(), { scroll: false });
        } else {
            // Update the 'page' parameter
            newSearchParams.delete('key')
            newSearchParams.delete('filter')
            newSearchParams.set('page', 1);
            newSearchParams.delete('search');
            // Use setSearchParams to apply the changes
            router.push(pathname + '?' + newSearchParams.toString(), { scroll: false });
        }
    }

    const handleSortAndOrder = (sortOption, orderVal) => {
        if (sort === sortOption) {
            const newOrder = orderVal === 'asc' ? 'desc' : 'asc';
            setOrder(newOrder)
            setPage(1)

            // Create a new URLSearchParams object before modifying it
            const newSearchParams = new URLSearchParams(searchParams);
            // Update the 'page' parameter
            newSearchParams.set('order', newOrder);
            newSearchParams.set('page', 1);
            newSearchParams.delete('search');
            // Use setSearchParams to apply the changes
            router.push(pathname + '?' + newSearchParams.toString(), { scroll: false });
            return
        } else {
            setSort(sortOption)

            // Create a new URLSearchParams object before modifying it
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('sort', sortOption);
            newSearchParams.delete('search');

            const selectedSortingOption = Object.values(SORTING_OPTIONS).find(option => option.dbKey === sortOption)
            // console.log(selectedSortingOption)

            if (selectedSortingOption) {
                setOrder(selectedSortingOption.defaultOrder);
                setPage(1);

                // Update the 'page' parameter
                newSearchParams.set('order', selectedSortingOption.defaultOrder);
                newSearchParams.set('page', 1);
                // Use setSearchParams to apply the changes
                router.push(pathname + '?' + newSearchParams.toString(), { scroll: false });
                return
            }

            setOrder('desc')
            setPage(1)

            // Update the 'page' parameter
            newSearchParams.set('order', 'desc');
            newSearchParams.set('page', 1);
            // Use setSearchParams to apply the changes
            router.push(pathname + '?' + newSearchParams.toString(), { scroll: false });
        }

    }

    const handleRefresh = () => {
        setRefresh(!refresh)
    }

    return {
        totalItems,
        reviews,
        page,
        totalPages,
        handlePageChange,
        search,
        handleSearch,
        selectedFilterKey,
        selectedFilterVal,
        handleFilter,
        sort,
        order,
        handleSortAndOrder,
        loading,
        handleRefresh,
        
    }
}
