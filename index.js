require('dotenv').config()
const faunadb = require('faunadb');
const Query = faunadb.query;
const express = require('express');
const path = require('path');
const { join } = require('path');

const app = express();
const port = process.env.PORT || 8080;
const client = new faunadb.Client({ secret: process.env.FAUNADB });

const demoConnection = client.query(
    Query.Get(
        Query.Match(
            Query.Index("users_by_name"),
            "Sofia"
        )
    )
);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public/index.html'));
});

app.use('/static', express.static('public'));

app.get('/get-users', (req, res) => {
    demoConnection
    .then(function(response) {
        res.status(200).send(response);
    })
    .catch((err, data) => {
        if (err) {
            console.log(data);
            res.status(500).send({
                "message": "Something went wrong on our end"
            });
        }
    });
});

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});