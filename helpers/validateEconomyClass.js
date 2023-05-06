const validateEconomyClass = async (passengers) => {
    try {
        const economyClassPassengers = passengers.filter((p) => p.seatClass === "economy");

        for (let i = 0; i < economyClassPassengers.length; i++) {
            const passenger = economyClassPassengers[i];
            const seatId = passenger.seatId;
            const seat = await getSeatById(seatId);

            if (seat && seat.class !== "economy") {
                return false;
            }
        }

        return true;
    } catch (error) {
        console.error("Error en la validación clase económica:", error);
        throw error;
    }
};


module.exports = validateEconomyClass;
