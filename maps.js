"use strict";

const decode = require('geojson-polyline').decode;
const https = require("https");
const geohash = require("ngeohash");
const fs = require("fs");
var filename;

/* origin and destination expected in (lat,long) or (start_name, end_name) format or other google api compatible format */
async function createRoute(origin, destination) {
    filename = `${origin}-${destination}-geohash.csv`;
    return new Promise((resolve, reject) => {
        var url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&sensor=false&mode=driving&key=AIzaSyB8DUoCptnmYmJWyqY6c8UgFIJdgp5_Lk0`;
        https.get(url, (resp) => {
            let data = '';

            resp.on("data", (chunk) => {
                data += chunk;
            });

            resp.on("end", async() => {
                await dataToLatLong(JSON.parse(data));
                resolve();
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err.message);
        });
    });
}

/* polyline data to lat long */
async function dataToLatLong(data) {
    return new Promise(async(resolve, reject) => {
        var lat_long = '';
        try {
            for(var i = 0; i < data.routes[0].legs[0].steps.length; i++) {
                const polygon = {
                    type: 'Polygon',
                    coordinates: [data.routes[0].legs[0].steps[i].polyline.points]
                };
                if(i !== 0) {
                    lat_long += ("," + decode(polygon).coordinates[0]);
                }
                else {
                    lat_long += decode(polygon).coordinates[0];
                }
            }
            await LatLongToGeohash(lat_long);
            resolve();
        } catch(err) {
            console.log(err);
            reject(err);
        }
    });
}

/* lat long to h3 */
async function LatLongToGeohash(data) {
    return new Promise((resolve, reject) => {
        try {
            var str = data.toString().split(",");
            var geohash_array = [];
            for(var i = 0; i < str.length; i += 2) {
                geohash_array.push(geohash.encode(parseFloat(str[i+1]), parseFloat(str[i]), 6));
            }
            var geohashes = Array.from(new Set(geohash_array));

            console.log(geohashes.length);
            fs.writeFileSync("./routes/"+filename, geohashes);
            resolve();
        } catch(err) {
            console.log(err);
            reject(err);
        }
    });
}

exports.createRoute = createRoute;