
const express = require('express');
const router = express.Router();

const Room = require('../models/Room');


router.get('/book-room', async (req, res) => {
    try {
        const bookings = await Room.find({});
   
        res.render('bookRoom', { bookings });
    } catch (error) {
        console.error('Error fetching room bookings:', error);
        res.status(500).send('Error fetching room bookings');
    }
});

router.post('/book-room', async (req, res) => {
    try {
    
        const { roomNumber, date, duration } = req.body;

        const newBooking = await Room.create({ roomNumber, date, duration });
     
        res.render('roomBookingSuccess');
    } catch (error) {
        console.error('Error booking room:', error);
        res.status(500).send('Error booking room');
    }
});

module.exports = router;
