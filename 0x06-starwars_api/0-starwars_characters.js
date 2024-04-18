#!/usr/bin/node

const request = require("request");

const movieNum = process.argv[2];
const URL = `https://swapi-api.alx-tools.com/api/films/${movieNum}`;

// Makes API request, sets async to allow await promise
request(URL, async function (err, res, body) {
  if (err) return console.error(err);

  const charURLList = JSON.parse(body).characters;

  // Use URL make new requests
  // await and resolve in order
  for (const charURL of charURLList) {
    await new Promise(function (resolve, reject) {
      request(charURL, function (err, res, body) {
        if (err) return console.error(err);

        // finds and prints URL order
        console.log(JSON.parse(body).name);
        resolve();
      });
    });
  }
});
