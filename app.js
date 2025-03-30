
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');


const Book = require('./models/book'); 
const roomRoutes = require('./routes/roomRoutes')


const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect('mongodb+srv://sambitghosh56:samabc@cluster0.o7pqgd5.mongodb.net/booksnewdata?retryWrites=true&w=majority&appName=Cluster0')

    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.delete('/delete-book/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Book.findByIdAndDelete(id);
        res.status(200).send('Book deleted successfully');
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send('Error deleting book');
    }
});

const bookController = require('./controllers/bookController');
const roomController = require('./controllers/roomController');
const dashboardRoutes = require('./routes/dashboardRoutes'); // Added import for dashboardRoutes

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

app.use('/', bookController);
app.use('/', roomController);
app.use('/dashboard', dashboardRoutes); 
app.use('/book-room', roomRoutes);

app.use('/user', userRoutes);
app.get('/logout', (req, res) => {

    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error logging out');
        } else {
      
            res.redirect('/');
        }
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
