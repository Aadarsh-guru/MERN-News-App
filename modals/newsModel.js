import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: 'General'
    },
    meta: {
        type: String,
    },
    keywords: {
        type: String,
    },
    type: {
        type: String,
        default: 'publish'
    },
    author: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const News = mongoose.model('News', newsSchema);

export default News;