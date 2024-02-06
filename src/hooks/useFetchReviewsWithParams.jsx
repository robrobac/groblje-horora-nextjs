"use client"
import { SORT_OPTIONS } from '@/lib/sortOptions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function useFetchReviewsWithParams(pageName, initialSort, initialOrder, initialPerPage) {
    console.log('----------')

    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [totalItems, setTotalItems] = useState()
    const [totalPages, setTotalPages] = useState([])
    const [perPage, setPerPage] = useState(initialPerPage);

    const router = useRouter();
    const pathname = usePathname();
    var searchParams = useSearchParams();

    // Page States and Params
    const urlPage = searchParams.get('page');
    const [page, setPage] = useState(urlPage ? parseInt(urlPage) : 1);
    console.log('page: ', page)

    const urlSort = searchParams.get('sort');
    const [sort, setSort] = useState(urlSort ? urlSort : initialSort)
    console.log('sort: ', sort)

    const urlOrder = searchParams.get('order');
    const [order, setOrder] = useState(urlOrder ? urlOrder : initialOrder)
    console.log('order: ', order)

    const urlFilter = searchParams.get('filter')
    const [filter, setFilter] = useState(urlFilter ? urlFilter : '')
    console.log('filter: ', filter)

    const urlSearch = searchParams.get('search')
    const [search, setSearch] = useState(urlSearch ? urlSearch : '')
    console.log('search: ', search)


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
        router.push(pathname + '?' + newSearchParams.toString());
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    
    const fetchReviews = async () => {
        if (search) {
            setLoading(false);
        } else  {
            setLoading(true);
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/reviews?search=${search}&sort=${sort}&order=${order}&page=${page}&perPage=${perPage}&filter=${filter}`);
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
    }, [page, filter, sort, order, search]);


    useEffect(() => {
        const pageNumber = parseInt(searchParams.get('page'), 10) || 1;
        const filterValue = searchParams.get('filter') || '';
        const sortValue = searchParams.get('sort') || '';
        const orderValue = searchParams.get('order') || '';
        const searchValue = searchParams.get('search') || '';
        setPage(pageNumber);
        setFilter(filterValue);
        setSort(sortValue)
        setOrder(orderValue)
        setSearch(searchValue)
        
    }, [searchParams.get('page'), searchParams.get('filter'), searchParams.get('sort'), searchParams.get('order'), searchParams.get('search')])


    const handlePageChange = (num) => {
        console.log("dadadada")
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
        router.push(pathname + '?' + newSearchParams.toString());

    }

    const handleFilter = (value) => {
        setFilter(value)
        setPage(1)

        // Create a new URLSearchParams object before modifying it
        const newSearchParams = new URLSearchParams(searchParams);

        if (value) {
            // Update the 'page' parameter
            newSearchParams.set('filter', value);
            newSearchParams.set('page', 1);
            newSearchParams.delete('search');
            // Use setSearchParams to apply the changes
            router.push(pathname + '?' + newSearchParams.toString());
        } else {
            // Update the 'page' parameter
            newSearchParams.delete('filter');
            newSearchParams.set('page', 1);
            newSearchParams.delete('search');
            // Use setSearchParams to apply the changes
            router.push(pathname + '?' + newSearchParams.toString());
        }
    }

    const handleSortAndOrder = (sortVal, orderVal) => {
        if (sort === sortVal) {
            if (orderVal === 'desc') {
                setOrder('asc')
                setPage(1)

                // Create a new URLSearchParams object before modifying it
                const newSearchParams = new URLSearchParams(searchParams);
                // Update the 'page' parameter
                newSearchParams.set('order', 'asc');
                newSearchParams.set('page', 1);
                newSearchParams.delete('search');
                // Use setSearchParams to apply the changes
                router.push(pathname + '?' + newSearchParams.toString());
            }
            if (orderVal === 'asc') {
                setOrder('desc')
                setPage(1)

                // Create a new URLSearchParams object before modifying it
                const newSearchParams = new URLSearchParams(searchParams);
                // Update the 'page' parameter
                newSearchParams.set('order', 'desc');
                newSearchParams.set('page', 1);
                newSearchParams.delete('search');
                // Use setSearchParams to apply the changes
                router.push(pathname + '?' + newSearchParams.toString());
            }
        } else {
            setSort(sortVal)

            // Create a new URLSearchParams object before modifying it
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('sort', sortVal);
            newSearchParams.delete('search');

            if (sortVal === SORT_OPTIONS.TITLE) {
                setOrder('asc')
                setPage(1)

                // Update the 'page' parameter
                newSearchParams.set('order', 'asc');
                newSearchParams.set('page', 1);
                // Use setSearchParams to apply the changes
                router.push(pathname + '?' + newSearchParams.toString());
                return
            }
            if (sortVal === SORT_OPTIONS.CATEGORY) {
                setOrder('asc')
                setPage(1)

                // Update the 'page' parameter
                newSearchParams.set('order', 'asc');
                newSearchParams.set('page', 1);
                // Use setSearchParams to apply the changes
                router.push(pathname + '?' + newSearchParams.toString());
                return
            }
            setOrder('desc')
            setPage(1)

            // Update the 'page' parameter
            newSearchParams.set('order', 'desc');
            newSearchParams.set('page', 1);
            // Use setSearchParams to apply the changes
            router.push(pathname + '?' + newSearchParams.toString());
        }

    }

    return {
        reviews,
        page,
        totalPages,
        handlePageChange,
        search,
        handleSearch,
        filter,
        handleFilter,
        sort,
        order,
        handleSortAndOrder,
        loading
    }
}
