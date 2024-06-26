import mongoose from 'mongoose'

const { Schema } = mongoose

const tagsSchema = new Schema({
    tagLabel: {
        type: String,
        required: true
    },
    tagValue: {
        type: String,
        required: true
    },
}, {
    timestamps: false
})

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    coverImagePath: {
        type: String,
        required: true
    },
    reviewContent: {
        type: String,
        required: true
    },
    imdbLink: {
        type: String,
        required: false
    },
    top25: {
        type: Boolean,
        required: false
    },
    worse20: {
        type: Boolean,
        required: false
    },
    tags: [tagsSchema],
    singleOgImage: {
        type: String,
        required: false,
    },
    singleOgImagePath: {
        type: String,
        required: false,
    },
})

const LikeSchema = new Schema({
    likeName: {
        type: String,
        required: true
    },
    likeEmail: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const CommentSchema = new Schema({
    authorName: {
        type: String,
        required: true
    },
    authorEmail: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: false
    },
}, {
    timestamps: true
})


const ReviewSchema = new Schema({
    reviewTitle: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    contentImages: {
        type: Array,
        required: false,
    },
    movies: [MovieSchema],
    reviewType: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    moreLikeThis: {
        type: Array,
        required: false
    },
    likes: [LikeSchema],
    comments: [CommentSchema],
    quadOgImage: {
        type: String,
        required: false,
    },
    quadOgImagePath: {
        type: String,
        required: false,
    },
    views: {
        type: Number,
        required: false,
        default: 0,
    },
}, {
    timestamps: true
})

ReviewSchema.index({
    reviewTitle: 'text',
    'movies.title': 'text',
    'movies.tags.tagLabel': 'text',
})

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);