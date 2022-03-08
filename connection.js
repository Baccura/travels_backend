const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'baccura',
    password: 'Kitkat1986',
    database: 'travels',
    multipleStatements: true
});

connection.connect((err) => {
    if (err) {
        console.log('La connexion à échouée !');
        throw err;
    }

    console.log('La connexion est réussie');
});

module.exports = connection;

/*
const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://jessica:Kitkat1986@cluster0.5pwda.mongodb.net/travels?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((e) => {
        console.log(e)
        console.log('Connexion à MongoDB échouée !')
    });
*/