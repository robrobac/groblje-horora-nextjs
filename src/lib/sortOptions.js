
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
        label: 'Recenzije',
        subCategories: {
            MOVIE: {
                dbKey: 'reviewSubtype',
                dbValue: 'singleMovie',
                label: 'Horor Filmovi',
            },
        }
    },
    QUAD: {
        dbKey: 'reviewType',
        dbValue: 'quad',
        label: 'Pregledi',
        subCategories: {
            SHORT_REVIEW: {
                dbKey: 'reviewSubtype',
                dbValue: 'quadShortReview',
                label: 'Kratki Pregledi',
            },
        }
    },
}