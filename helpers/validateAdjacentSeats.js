const _ = require('lodash');

const validateAdjacentSeats = async (passengers) => {
    try {
        const purchases = _.groupBy(passengers, (p) => p.purchaseId);

        for (let purchaseId in purchases) {
            const seats = purchases[purchaseId].map((p) => p.seatId);
            const sortedSeats = seats.sort((a, b) => a - b);

            for (let i = 0; i < sortedSeats.length - 1; i++) {
                if (sortedSeats[i + 1] - sortedSeats[i] > 1) {
                    return false;
                }
            }
        }

        return true;
    } catch (error) {
        console.error("Error en la validación de asientos adyacentes:", error);
        throw error;
    }
};


module.exports = validateAdjacentSeats;
