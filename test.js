var maps = require("./maps");

async function main() {
    await maps.createRoute("13.0494205,79.9110603", "17.2394469,78.39526669999999");
    console.log("geohash route created in file route-geohash.csv");
}

main();