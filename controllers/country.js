const connection = require('../connection');

exports.getOne = (req, res, next) => {
    let rqt = 'SELECT * FROM country WHERE id = ' + req.params.id;
    connection.query(rqt, (error, result) => {
        if (error) {
            res.status(400).json({
                error: 'Une erreur est survenue'
            });
        }

        res.status(200).json(result);
    });
};

exports.getAll = (req, res, next) => {
    let rqt = 'SELECT * FROM country';
    connection.query(rqt, (error, result) => {
        if (error) {
            res.status(400).json({
                error: 'Une erreur est survenue'
            });
        }

        res.status(200).json(result);
    });
};