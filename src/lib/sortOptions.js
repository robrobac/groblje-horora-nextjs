
// dbKey = key from mongoDB document
// label = button label


export const SORTING_OPTIONS = {
    TITLE: {
        dbKey: 'reviewTitle',
        label: 'Naslov',
        defaultOrder: 'asc',
    },
    RATING: {
        dbKey: 'movies.0.rating',
        label: 'Ocjena',
        defaultOrder: 'desc',
    },
    CREATED: {
        dbKey: 'createdAt',
        label: 'Datum',
        defaultOrder: 'desc',
    },
}

export const FILTERING_OPTIONS = {
    SINGLE: {
        dbKey: 'reviewType',
        dbValue: 'single',
        label: 'Recenzija',
        subCategories: {
            MOVIE: {
                dbKey: 'reviewSubtype',
                dbValue: 'singleMovie',
                label: 'Film',
            },
            SHOW: {
                dbKey: 'reviewSubtype',
                dbValue: 'singleShow',
                label: 'Serija',
            },
        }
    },
    QUAD: {
        dbKey: 'reviewType',
        dbValue: 'quad',
        label: 'Pregled',
        subCategories: {
            SHORT_REVIEW: {
                dbKey: 'reviewSubtype',
                dbValue: 'quadShortReview',
                label: 'Kratki Pregled',
            },
            SHORT_MOVIE: {
                dbKey: 'reviewSubtype',
                dbValue: 'quadShortMovie',
                label: 'Kratki Horori',
            },
        }
    },
}