
// dbKey = key from mongoDB document
// label = button label


export const SORTING_OPTIONS = {
    TITLE: {
        dbKey: 'reviewTitle', // THIS SHOULD NOT BE CHANGED BECAUSE IT REFLECTS THE DATA IN THE DATABASE.
        label: 'Naslov',
        defaultOrder: 'asc',
    },
    RATING: {
        dbKey: 'movies.0.rating', // THIS SHOULD NOT BE CHANGED BECAUSE IT REFLECTS THE DATA IN THE DATABASE.
        label: 'Ocjena',
        defaultOrder: 'desc',
    },
    CREATED: {
        dbKey: 'createdAt', // THIS SHOULD NOT BE CHANGED BECAUSE IT REFLECTS THE DATA IN THE DATABASE.
        label: 'Datum',
        defaultOrder: 'desc',
    },
}

export const FILTERING_OPTIONS = {
    SINGLE: {
        dbKey: 'reviewType', // THIS SHOULD NOT BE CHANGED BECAUSE IT REFLECTS THE DATA IN THE DATABASE.
        dbValue: 'single', // THIS SHOULD NOT BE CHANGED BECAUSE IT REFLECTS THE DATA IN THE DATABASE.
        label: 'Recenzije',
        subCategories: {
            MOVIE: {
                dbKey: 'subcategory', // THIS SHOULD NOT BE CHANGED BECAUSE IT REFLECTS THE DATA IN THE DATABASE.
                dbValue: 'singleMovie', // THIS SHOULD NOT BE CHANGED BECAUSE IT REFLECTS THE DATA IN THE DATABASE.
                label: 'Horor Filmovi',
            },
            SHOW: {
                dbKey: 'subcategory', // THIS SHOULD NOT BE CHANGED BECAUSE IT REFLECTS THE DATA IN THE DATABASE.
                dbValue: 'singleShow', // THIS SHOULD NOT BE CHANGED BECAUSE IT REFLECTS THE DATA IN THE DATABASE.
                label: 'Horor Serije',
            },
        }
    },
    QUAD: {
        dbKey: 'reviewType', // THIS SHOULD NOT BE CHANGED BECAUSE IT REFLECTS THE DATA IN THE DATABASE.
        dbValue: 'quad', // THIS SHOULD NOT BE CHANGED BECAUSE IT REFLECTS THE DATA IN THE DATABASE.
        label: 'Pregledi',
        subCategories: {
            SHORT_REVIEW: {
                dbKey: 'subcategory', // THIS SHOULD NOT BE CHANGED BECAUSE IT REFLECTS THE DATA IN THE DATABASE.
                dbValue: 'shortReviews', // THIS SHOULD NOT BE CHANGED BECAUSE IT REFLECTS THE DATA IN THE DATABASE.
                label: 'Kratki Pregledi',
            },
            SHORT_HORROR: {
                dbKey: 'subcategory', // THIS SHOULD NOT BE CHANGED BECAUSE IT REFLECTS THE DATA IN THE DATABASE.
                dbValue: 'shortHorrors', // THIS SHOULD NOT BE CHANGED BECAUSE IT REFLECTS THE DATA IN THE DATABASE.
                label: 'Kratki Horori',
            },
        }
    },
}