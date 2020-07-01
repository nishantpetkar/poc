var maps = require("./maps");

async function main() {
    await maps.createRoute("Jaipur", "Ahmedabad");
    console.log("geohash route created");
}

main();