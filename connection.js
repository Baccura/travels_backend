const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'baccura',
    password: 'Kitkat1986',
    database: 'travels'
});

connection.connect((err) => {
    if (err) {
        console.log('La connexion à échouée !');
        throw err;
    }

    console.log('La connexion est réussie');
});

module.exports = connection;