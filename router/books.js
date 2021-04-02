const express = require('express');
const router = express.Router();
const multer = require('multer');
const Author = require('../models/author');
const Book = require('../models/books');
const fs = require('fs');
const path = require('path');
const uploadPath = path.join('public', Book.coverImageBasePath);


const imageMimeType = ['image/gifs', 'image/jpeg', 'image/png'];
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeType.includes(file.mimetype));
    }
});

router.get('/', async (req, res) => {
    const authors = await Author.find()
    let query = Book.find();
    if (req.query.title != null && req.query.title != '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'));
    }
    if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
        query = query.lte('publishDate', req.query.publishedBefore)
    }
    if (req.query.publishedAfter != null && req.query.publishedAfter) {
        query = query.gte('publishDate', req.query.publishedAfter);
    }

    try {
        const books = await query.exec();
        res.render('books/books', { books: books, authors: authors, searchOptions: req.query });
    } catch {
        res.redirect('/')
    }
});

router.get('/new', async (req, res) => {
    renderNewPage(res, new Book())
});

router.post('/', upload.single('cover'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null;
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        description: req.body.description,
        coverImageName: fileName
    });

    try {
        const newBook = await book.save();
        //res.render(`books/{newBook.id}`);
        res.redirect('books')
    } catch {
        if (book.coverImageName != null) {
            removeBookCover(book.coverImageName);
        }
        renderNewPage(res, book, true);
    }
});

async function renderNewPage(res, book, hasError = false) {
    try {
        const authors = await Author.find({});
        const params = {
            book: book,
            authors: authors
        }
        if (hasError) params.errorMessage = 'Error Creating Book';
        console.log(params)
        res.render('books/new', params);
    } catch {
        res.redirect('/books')
    }
}

function removeBookCover(fileName) {
    fs.unlink(path.join(uploadPath, fileName), err => {
        if (err) {
            console.error(err);
        }
    })
}

module.exports = router;