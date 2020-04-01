var express = require('express');
const fetch = require('node-fetch')
var router = express.Router();


router.get('/USA', (request, response) => {
    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/johns_hopkins_united_states_latest.php?state=CA", {
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
            response.send(results)
        });
});

router.get('/country', (request, response) => {
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
            response.send(results)
        });
});


fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "7d771ac119mshc0c51908f94bb9ap1dc3bfjsn67097e894794"
    }
})

router.get('/affected', (request, response) => {
    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php", {
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
            response.send(results)
        });
});


router.get('/world', (request, response) => {
    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/world_total_stat.php", {
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
            response.send(results)
        });
});





module.exports = router;