/* **************************************************************************
 * Developed by
 * SIVA, <pvadivelsiva@gmail.com>, August 2021
 * *************************************************************************/

const express = require("express");
const cors = require("cors");
const mongo = require("./Utils/dao");
var bodyParser = require('body-parser');
const path = require('path');

// const hostname = '127.0.0.1'
const port = process.env.PORT || 4000;
const app = express();

// Express Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({ limit: '50mb' }));

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// API Routers
require('./router.js')(app);

app.use(express.static(__dirname + "/public"));

//if we have static web files needs to be displayed

// app.get('/', (req, res) => {
//   res.sendFile('index.html',{root:__dirname})
// });

mongo.connect().then(async (result) => {
  console.log("db connected", result);
});

var listener = app.listen(port, () => {
  //hostname,
  console.log(`Server running at port https://localhost:${port}/`);
});
