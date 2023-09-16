const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const LISTEN_PORT = 8080;

app.get('/', (req, res, next) => {
    res.send('Backend working on root dir');
})

app.listen(LISTEN_PORT, () => {
    console.log('Listening on port 8080');
});