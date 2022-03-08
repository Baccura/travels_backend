const connection = require('../connection');
var async = require('async');

exports.getOne = (req, res, next) => {
    let travel = req.params;
    let rqt = `SELECT travel.id, travel.title, travel.description, travel.date_start, travel.date_end, travel.duration, travel.price, travel.link, country.name as 'country'
        FROM travel
        INNER JOIN country ON travel.country_id = country.id
        WHERE travel.id = ${travel.id}`;

    connection.query(rqt, async (error, result) => {
        if (error) {
            res.status(400).json({
                success: false,
                error: 'Une erreur est survenue',
                message: error.message
            });
        }

        let travel = result[0]

        let dateStart = new Date(travel.date_start)
        let dateEnd = new Date(travel.date_end)

        rqt = `SELECT period.id, period.min_temperature, period.max_temperature, weather.name as 'weather', period.is_best 
            FROM period 
            INNER JOIN weather ON weather.id = period.weather_id 
            WHERE period.month IN (${dateStart.getMonth() + 1}, ${dateEnd.getMonth() + 1})`;

        connection.query(rqt, (error, periods) => {
            if (error) {
                res.status(400).json({
                    success: false,
                    error: 'Une erreur est survenue',
                    message: error.message
                });
            }

            travel.periods = periods

            rqt = `SELECT city.id, city.name
                FROM cities_travel
                INNER JOIN city ON city.id = cities_travel.city_id
                WHERE travel_id = ${travel.id};`

            connection.query(rqt, (error, cities) => {
                if (error) {
                    res.status(400).json({
                        success: false,
                        error: 'Une erreur est survenue',
                        message: error.message
                    });
                }

                travel.cities = []
                let cityIds = ''
                for (let i = 0; i < cities.length; i++) {
                    if (cityIds !== '') cityIds += ','
                    cityIds += cities[i].id

                    travel.cities[cities[i].id] = cities[i]
                    travel.cities[cities[i].id].whatToDo = []
                    travel.cities[cities[i].id].whatToEat = []
                    travel.cities[cities[i].id].whatToSee = []
                }

                rqt = `SELECT content, city_id
                    FROM what_to_do
                    WHERE city_id IN (${cityIds});` +
                    `SELECT content, city_id
                    FROM what_to_eat
                    WHERE city_id IN (${cityIds});` +
                    `SELECT content, city_id
                    FROM what_to_see
                    WHERE city_id IN (${cityIds})`

                connection.query(rqt, (error, whatTo) => {
                    if (error) {
                        res.status(400).json({
                            success: false,
                            error: 'Une erreur est survenue',
                            message: error.message
                        });
                    }

                    for (let x = 0; x < whatTo[0].length; x++) {
                        if (travel.cities[whatTo[0][x].city_id]) travel.cities[whatTo[0][x].city_id].whatToDo.push(whatTo[0][x])
                    }

                    for (let x = 0; x < whatTo[1].length; x++) {
                        if (travel.cities[whatTo[1][x].city_id]) travel.cities[whatTo[1][x].city_id].whatToEat.push(whatTo[1][x])
                    }

                    for (let x = 0; x < whatTo[2].length; x++) {
                        if (travel.cities[whatTo[2][x].city_id]) travel.cities[whatTo[2][x].city_id].whatToSee.push(whatTo[2][x])
                    }

                    res.status(200).json({
                        success: true,
                        travel: travel
                    });
                })
            });
        });
    });
};

exports.addCities = (req, res, next) => {
    let datas = []
    for (city in req.body.cities) {
        datas.push([req.params.id, city])
    }
    let rqt = `INSERT INTO cities_travel (travel_id, city_id) VALUES ?`;
    connection.query(rqt, [datas], (error, result) => {
        if (error) {
            res.status(400).json({
                success: false,
                error: 'Une erreur est survenue',
                message: error.message
            });
        }

        res.status(200).json({ message: 'Le voyage a bien été créé' });
    });
};

exports.getAll = (req, res, next) => {
    let rqt = `SELECT travel.id, travel.title, travel.date_start, travel.date_end, country.name
        FROM travel
        INNER JOIN country ON travel.country_id = country.id`;
    connection.query(rqt, (error, travels) => {
        if (error) {
            res.status(400).json({
                success: false,
                error: 'Une erreur est survenue',
                message: error.message
            });
        }

        res.status(200).json(travels);
    });
};

exports.create = (req, res, next) => {
    let travel = req.body.travel;
    let dateStart = new Date(travel.date_start)
    let dateEnd = new Date(travel.date_end)
    let duration = (dateEnd - dateStart) / (1000 * 3600 * 24);
    let datas = [
        [travel.title, travel.description ?? '', travel.date_start, travel.date_end, duration, travel.price, travel.link ?? '', travel.country_id, travel.category_id]
    ]
    let rqt = `INSERT INTO travel (title, description, date_start, date_end, duration, price, link, country_id, category_id) VALUES ?`;
    connection.query(rqt, [datas], (error, result) => {
        if (error) {
            res.status(400).json({
                success: false,
                error: 'Une erreur est survenue',
                message: error.message
            });
        }

        res.status(200).json({ message: 'Le voyage a bien été créé' });
    });
};