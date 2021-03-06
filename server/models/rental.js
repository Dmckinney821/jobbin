
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    title: {
        type: String,
        required: true,
        max: [128, 'No one got time for that many characters']
    },
    city: {
        type: String,
        required: true,
        lowercase: true
    },
    street: {
        type: String,
        required: true,
        min: [4, 'make it longer']
    },
    category: {
        type: String,
        required: true,
        lowercase: true
    },
    image: {
        type: String,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    shared: Boolean,
    description: {
        type: String,
        required: true
    },
    dailyRate: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking'}]
})

module.exports = mongoose.model('Rental', rentalSchema)