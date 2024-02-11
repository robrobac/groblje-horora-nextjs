import mongoose from 'mongoose'

const { Schema } = mongoose

const TempMediaSchema = new Schema({
    url: {
        type: String,
        required: false
    },
    path: {
        type: String,
        required: false
    },
}, {
    timestamps: true
})

export default mongoose.models.TempMedia || mongoose.model('TempMedia', TempMediaSchema);