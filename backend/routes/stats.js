var express = require('express');
const fetch = require('node-fetch')
var router = express.Router();

router.get('/seasons', (request, response) => {
    fetch(`https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=${request.query.string}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "7d771ac119mshc0c51908f94bb9ap1dc3bfjsn67097e894794"
        }
    })
        .then((response) => {
            console.log(response)
            return response.text();
        })
        .then((body) => {
            let results = JSON.parse(body)
            console.log(results)
            response.send(results)
        });
});

module.exports = router;