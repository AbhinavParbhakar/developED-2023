const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user-routes');
const authRoutes = require('./routes/auth-routes')
const cors = require('cors');
const passportSetup = require('./passport-config/passport-setup')

const app = express();

const LISTEN_PORT = 3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRoutes);

app.use('/auth',authRoutes)

app.get('/', (req, res, next) => {
    res.send('Backend working on root dir');
})

app.listen(LISTEN_PORT, () => {
    console.log('Listening on port 3000');
});