const User = require('../models/User');
const Book = require('../models/book'); 

exports.renderDashboard = async (req, res) => {
    try {
        const userId = req.session.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        
        const username = user.username;

        const books = await Book.find();

        
        res.render('dashboard', { username, books });
    } catch (error) {
        console.error('Error rendering dashboard:', error);
        res.status(500).send('Error rendering dashboard');
    }
};



exports.searchBooks = async (req, res) => {
    try {
        const query = req.query.q;
        const books = await Book.find({ $or: [{ title: { $regex: query, $options: 'i' } }, { author: { $regex: query, $options: 'i' } }] });
        if (books.length > 0) {
  
            res.render('search-results', { books });
        } else {
         
            res.render('no-results', { message: 'No results found' });
        }
    } catch (error) {
        console.error('Error searching books:', error);
        res.status(500).send('Error searching books');
    }
};

exports.viewBookContent = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.render('view-book', { book });
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).send('Error fetching book');
    }
};




exports.renderAddBookPage = async (req, res) => {
    try {

        const books = await Book.find();

        res.render('add-book', { books });
    } catch (error) {
        console.error('Error rendering add-book page:', error);
        res.status(500).send('Error rendering add-book page');
    }
};
