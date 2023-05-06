const validateCompanions = async (passengers) => {
    try {
        const minorPassengers = passengers.filter((p) => p.age < 18);
        const adultPassengers = passengers.filter((p) => p.age >= 18);

        const companionIds = new Set(adultPassengers.map((a) => a.purchaseId));

        for (let i = 0; i < minorPassengers.length; i++) {
            const minorPassenger = minorPassengers[i];
            const minorPassengerIndex = passengers.indexOf(minorPassenger);
            const previousPassenger = passengers[minorPassengerIndex - 1];
            const nextPassenger = passengers[minorPassengerIndex + 1];

            if (
                (previousPassenger && previousPassenger.age >= 18 && !companionIds.has(previousPassenger.purchaseId)) ||
                (nextPassenger && nextPassenger.age >= 18 && !companionIds.has(nextPassenger.purchaseId))
            ) {
                return false;
            }
        }

        return true;
    } catch (error) {
        console.error("Error en la validación de acompañantes:", error);
        throw error;
    }
};



module.exports = validateCompanions;
