function validateEconomyClass(passengers) {
    const economyClassPassengers = passengers.filter((p) => p.seatClass === "economy");

    for (let i = 0; i < economyClassPassengers.length; i++) {
        const passenger = economyClassPassengers[i];
        const seatId = passenger.seatId;
        const seat = getSeatById(seatId);

        if (seat && seat.class !== "economy") {
            return false;
        }
    }

    return true;
}

module.exports = validateEconomyClass;
