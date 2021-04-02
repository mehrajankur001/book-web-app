const mongoose = require('mongoose');
const path = require('path');

const coverImageBasePath = 'upload/bookCovers';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    },
    description: {
        type: String
    },
    publishDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    coverImageName: {
        type: String,
        required: true
    }
});

bookSchema.virtual('coverImagePath').get(function () {
    if (this.coverImageName != null) {
        return path.join('/', coverImageBasePath, this.coverImageName);
    }
})

module.exports = mongoose.model('Book', bookSchema);
module.exports.coverImageBasePath = coverImageBasePath;