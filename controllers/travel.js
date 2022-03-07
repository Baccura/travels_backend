const connection = require('../connection');

exports.getOne = (req, res, next) => {
    let travel = req.params;
    let rqt = `SELECT * FROM travel WHERE id = ${travel.id}`;
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
    let rqt = `SELECT * FROM travel`;
    connection.query(rqt, (error, result) => {
        if (error) {
            res.status(400).json({
                error: 'Une erreur est survenue'
            });
        }

        res.status(200).json(result);
    });
};

exports.create = (req, res, next) => {
    let travel = req.body.travel;
    let rqt = `INSERT INTO travel 
    (title, description, country_id) 
    VALUES 
    ("${travel.title}", "${travel.description??''}", ${travel.country_id})`;
    console.log(rqt);
    connection.query(rqt, (error, result) => {
        if (error) {
            res.status(400).json({
                error: 'Une erreur est survenue'
            });
        }

        res.status(200).json({message: 'Le voyage a bien été créé'});
    });
};