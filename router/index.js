const express = require('express');
const router = express.Router();
const Book = require('../models/books');
const Author = require('../models/author');

router.get('/', async (req, res) => {
    let books;
    try {
        const authors = await Author.find();
        books = await Book.find().sort({ createdAt: 'desc' }).limit(5).exec();
        res.render('index', { authors: authors, books: books });
    } catch {
        books = [];
    }

});

module.exports = router;