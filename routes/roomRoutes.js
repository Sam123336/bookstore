
const express = require('express');
const router = express.Router();
const Room = require('../models/Room'); 


router.get('/edit/:bookingId', async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        
        const booking = await Room.findById(bookingId);
        if (!booking) {
            return res.status(404).send('Booking not found');
        }
      
        res.render('editRoom', { booking });
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).send('Error fetching booking');
    }
});
router.post('/update/:bookingId', async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
       
        const { roomNumber, date, duration } = req.body;
    
        await Room.findByIdAndUpdate(bookingId, { roomNumber, date, duration });
       
        res.redirect('/book-room');
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).send('Error updating booking');
    }
});

router.delete('/delete/:bookingId', async (req, res) => {
    try {
        const bookingId = req.params.bookingId;

        await Room.findByIdAndDelete(bookingId);
 
        res.status(200).send('Booking deleted successfully');
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).send('Error deleting booking');
    }
});
module.exports = router;
