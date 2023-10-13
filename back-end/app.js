const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user-routes');
const cors = require('cors');

const app = express();


const LISTEN_PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(cors());
app.use(bodyParser.json());
//app.use(cookieSession({
 // maxAge : 1000 * 60 * 5,
  //  keys : [cookie.key]
//}))


app.use('/user', userRoutes);


app.get('/', (req, res, next) => {
    res.send('Backend working on root dir');
})

app.listen(LISTEN_PORT, () => {
    console.log(`Listening on port ${LISTEN_PORT}`);
});