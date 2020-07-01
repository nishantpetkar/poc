const geohash = require("ngeohash");
const fs = require("fs");
var file_prefix = "data1";
var resolution = 6;

async function dumpToGeohash() {
    return new Promise((resolve, reject) => {
        try {
            var lineReader = require("readline").createInterface({
                input: fs.createReadStream(`./${file_prefix}.csv`)
            });
            
            lineReader.on("line", (line) => {
                var split_line = line.split(",");
                fs.appendFileSync(`./${file_prefix}-geohash.csv`, ","+geohash.encode(split_line[2], split_line[3], resolution));
            });
            resolve();
        } catch(err) {
            console.log(err);
            reject(err);
        }
    });
}

async function geohashUnique() {
    return new Promise((resolve, reject) => {
        try {
            var geohash_str = fs.readFileSync(`./${file_prefix}-geohash.csv`).toString().split(",000000,")[1];
            var geohash_array = geohash_str.split(",");
            var geohashes = Array.from(new Set(geohash_array));

            console.log(geohashes.length);
            fs.writeFileSync(`./${file_prefix}-geohash.csv`, geohashes);
            resolve();
        } catch(err) {
            if(err.errno === -4058) {
                setTimeout(geohashUnique, 1000);
            }
            else {
                console.log(err.errno);
                reject(err);
            }
        }
    });
}

async function main() {
    await dumpToGeohash();
    await geohashUnique();
}

main();