const connection = require('../connection');

exports.getOne = (req, res, next) => {
    let period = req.params;
    let rqt = `SELECT * FROM period WHERE id = ${period.id}`;
    connection.query(rqt, (error, period) => {
        if (error) {
            res.status(400).json({
                error: 'Une erreur est survenue'
            });
        }

        res.status(200).json(period);
    });
};

exports.getAll = (req, res, next) => {
    let rqt = `SELECT * FROM period`;
    connection.query(rqt, (error, periods) => {
        if (error) {
            res.status(400).json({
                error: 'Une erreur est survenue'
            });
        }

        res.status(200).json(periods);
    });
};

exports.create = (req, res, next) => {
    let period = req.body.period;
    let datas = [
        [period.month, period.min_temperature, period.max_temperature, period.weather_id, period.is_best, period.country_id]
    ]
    let rqt = `INSERT INTO period (month, min_temperature, max_temperature, weather_id, is_best, country_id) VALUES ?`;
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
            message: 'La période a bien été créé' 
        });
    });
};