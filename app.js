const express = require('express');
const app = express();
const countryRoutes = require('./routes/country');
const travelRoutes = require('./routes/travel');

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/countries', countryRoutes);
app.use('/api/travels', travelRoutes);

module.exports = app;