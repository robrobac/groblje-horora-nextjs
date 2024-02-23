export const SORT_OPTIONS = {
    TITLE: 'reviewTitle',
    CATEGORY: 'reviewType',
    RATING: 'movies.0.rating',
    CREATED: 'createdAt',
    UPDATED: 'updatedAt',
};


// dbKey = key from mongoDB document
// label = button label


export const SORTING_OPTIONS = {
    TITLE: {
        dbKey: 'reviewTitle',
        label: 'Naslov'
    },
    RATING: {
        dbKey: 'movies.0.rating',
        label: 'Ocjena'
    },
    CREATED: {
        dbKey: 'createdAt',
        label: 'Datum'
    },
}