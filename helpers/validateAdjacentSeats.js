const _ = require('lodash');

function validateAdjacentSeats(passengers) {
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
}

module.exports = validateAdjacentSeats;
