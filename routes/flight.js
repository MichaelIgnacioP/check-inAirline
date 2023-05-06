///////////////////////////////////////////////////////
//////////////FILES AND LIBRARIES//////////////////////
///////////////////////////////////////////////////////

const _ = require('lodash');
const express = require('express');
const router = express.Router();
const pool = require('../db');

///////////////////////////////////////////////////////
//////////////////////MIDDLEWARES//////////////////////
///////////////////////////////////////////////////////

const logging = require('../middlewares/logging');


///////////////////////////////////////////////////////
////////////////////////HELPERS////////////////////////
///////////////////////////////////////////////////////

const validateCompanions = require('../helpers/validateCompanions');
const validateAdjacentSeats = require('../helpers/validateAdjacentSeats');
const validateEconomyClass = require('../helpers/validateEconomyClass');

///////////////////////////////////////////////////////
////////////////////////ENDPOINT///////////////////////
///////////////////////////////////////////////////////


router.get('/flights/:id/passengers', logging, async (req, res) => {
    const flightId = req.params.id;

    try {
        const [flightRows, fields1] = await pool.execute(
            `SELECT * FROM flight WHERE flight_id = ${flightId}`
        );
        const flight = flightRows[0];

        if (!flight) {
            return res.status(404).json({ code: 404, data: {} });
        }

        const [boardingPassRows, fields2] = await pool.execute(`
            SELECT bp.*, st.name AS seat_type_name, p.*
            FROM boarding_pass bp
            INNER JOIN seat_type st ON bp.seat_type_id = st.seat_type_id
            INNER JOIN passenger p ON bp.passenger_id = p.passenger_id
            WHERE bp.flight_id = ${flightId}
        `);
        const boardingPasses = boardingPassRows;

        const passengers = boardingPasses.map(boardingPass => ({
            passengerId: boardingPass.passenger_id,
            dni: boardingPass.dni,
            name: boardingPass.name,
            age: boardingPass.age,
            country: boardingPass.country,
            boardingPassId: boardingPass.boarding_pass_id,
            purchaseId: boardingPass.purchase_id,
            seatTypeId: boardingPass.seat_type_id,
            seatId: boardingPass.seat_id
        }));

        const isCompanionsValid = validateCompanions(passengers);
        const isAdjacentSeatsValid = validateAdjacentSeats(passengers);
        const isEconomyClassValid = validateEconomyClass(passengers);

        if (!isCompanionsValid) {
            return res.status(400).json({ code: 400, error: 'Error en la validación de acompañantes' });
        }
        if (!isAdjacentSeatsValid) {
            return res.status(400).json({ code: 400, error: 'Error en la validación de asientos adyacentes' });
        }
        if (!isEconomyClassValid) {
            return res.status(400).json({ code: 400, error: 'Error en la validación clase económica' });
        }

        const response = {
            flightId: flight.flight_id,
            takeoffDatetime: flight.takeoff_datetime ? new Date(flight.takeoff_datetime).getTime() / 1000 : null,
            takeoffAirport: flight.takeoff_airport,
            landingDatetime: flight.landing_datetime ? new Date(flight.landing_datetime).getTime() / 1000 : null,
            landingAirport: flight.landing_airport,
            airplaneId: flight.airplane_id,
            passengers: _.mapKeys(passengers, (value, key) => _.camelCase(key))
        };

        res.status(200).json({ code: 200, data: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, error: 'Internal server error' });
    }
});

module.exports = router;

