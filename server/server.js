//Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const render = require('./paths/render');
const multer = require('multer');
const mongoose = require('mongoose');
const recipe = require('./paths/recipe');
const menu = require('./paths/menu');
const ingredient = require('./paths/ingredient');
const path = require('node:path');

require('dotenv').config()

const app = express();

const port = 8000;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}

const staticDir = path.join(__dirname, 'public');

//Connect to Mongo db
mongoose.connect(process.env.DB_URL, options);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected'));

app.use(cors({
    accept:'*',
    method:'POST, GET'
}));

//Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//Using multer to handle files/images
//app.use(multer({ dest: './temp/' }).any());

//Handlers
app.use('/render', render);
app.use('/static', express.static(staticDir));

//Listen
app.listen(port, () => {
    console.log('listening on ' + port);
});

app.use('/recipe', recipe);
app.use('/menu', menu);
app.use('/ingredient', ingredient);