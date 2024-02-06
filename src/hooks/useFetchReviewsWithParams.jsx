"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function useFetchReviewsWithParams(pageName, initialSort, initialOrder, initialPerPage) {
    console.log('----------')

    const [reviews, setReviews] = useState([]);
    const [totalItems, setTotalItems] = useState()
    const [totalPages, setTotalPages] = useState([])
    const [perPage, setPerPage] = useState(initialPerPage);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

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


    const fetchReviews = async () => {
        const res = await fetch(`http://localhost:3000/api/reviews?search=${search}&sort=${sort}&order=${order}&page=${page}&perPage=${perPage}&filter=${filter}`);
        const json = await res.json()
        if (!res.ok) {
            throw new Error('Failed to fetch LatestQuad data');
        }
        if (res.ok) {
            setReviews(json.reviews);
            const pagesArray = Array.from({ length: json.totalPages }, (_, index) => index + 1);
            setTotalPages(pagesArray);
            setTotalItems(json.totalItems)
        }
    }

    useEffect(() => {
        fetchReviews();
    }, [page, filter, sort, order, search]);


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

    return {
        reviews,
        page,
        totalPages,
        handlePageChange
    }
}
