const express = require('express');
const router = express.Router();
const Book = require('../models/book');


router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.render('index', { title: 'Library Management System', books });
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/add-book', async (req, res) => {
    try {
        const { title, author } = req.body;
        const newBook = new Book({ title, author });
        await newBook.save();
     
        res.redirect('/add-book');
    } catch (err) {
        console.error('Error adding book:', err);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/add-book', async (req, res) => {
    try {
        const books = await Book.find();
        res.render('add-book', { title: 'Add Book', books });
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/issue-book/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).send('Book not found');
        }

        res.redirect('/');
    } catch (err) {
        console.error('Error issuing book:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/delete-book/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully', deletedBook });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
});

module.exports = router;
