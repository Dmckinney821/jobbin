const express = require('express')
const mongoose = require('mongoose');
const config = require('./config/dev');
const Rental = require('./models/rental');
const rentalRoutes = require('./routes/rentals');

const FakeDb = require('./fake-db')

mongoose.connect(config.DB_URI).then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
});

const app = express();

app.use('/api/v1/rentals', rentalRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('itsa runnin')
});

