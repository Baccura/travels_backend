const connection = require('../connection');

exports.getOne = (req, res, next) => {
    let rqt = 'SELECT * FROM country WHERE id = ' + req.params.id;
    connection.query(rqt, (error, country) => {
        if (error) {
            res.status(400).json({
                error: 'Une erreur est survenue'
            });
        }

        res.status(200).json(country);
    });
};

exports.getAll = (req, res, next) => {
    let rqt = 'SELECT * FROM country';
    connection.query(rqt, (error, countries) => {
        if (error) {
            res.status(400).json({
                error: 'Une erreur est survenue'
            });
        }

        res.status(200).json(countries);
    });
};

exports.create = (req, res, next) => {
    let country = req.body.country;
    let datas = [
        [country.name]
    ]
    let rqt = `INSERT INTO country (name) VALUES ?`;
    connection.query(rqt, [datas], (error, result) => {
        if (error) {
            res.status(400).json({
                success: false, 
                error: 'Une erreur est survenue', 
                message: error.message
            });
        }

        res.status(200).json({ 
            success: true, 
            message: 'Le pays a bien été créé' 
        });
    });
};