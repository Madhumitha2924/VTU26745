const { getDepots, getVehicles } = require("./api");
const knapsack = require("./knapsack");
async function main() {
    try {
        const depotsData = await getDepots();
        const vehiclesData = await getVehicles();
        const depots = depotsData.depots;
        const vehicles = vehiclesData.vehicles;
        for (const depot of depots) {
            const result = knapsack(
                vehicles,
                depot.MechanicHours
            );
            const totalDuration =
                result.selectedTasks.reduce(
                    (sum, task) => sum + task.Duration,
                    0
                );
            console.log("\n====================");
            console.log(`Depot ID: ${depot.ID}`);
            console.log(`Mechanic Hours Available: ${depot.MechanicHours}`);
            console.log(`Total Duration Used: ${totalDuration}`);
            console.log(`Maximum Impact: ${result.maxImpact}`);
            console.log(`Tasks Selected: ${result.selectedTasks.length}`);
            console.log("====================");
        }
    } catch (error) {
        console.error(
            error.response?.data ||
            error.message
        );
    }
}

main();