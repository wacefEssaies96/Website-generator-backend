var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
require('dotenv').config();

var mongoose = require('mongoose');
var cors = require('cors');

// sport meets routes
const menuRouter = require("./routes/menuRouter")

var app = express();

app.use(cors({
    origin:"http://localhost:3000",
    methods:["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));
app.enable('trust proxy');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads')));

//Routes
app.use('/menu', menuRouter)

//connect to mongo database
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to the database! ');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ error: err });
});

app.set('port', 3030);
var server = http.createServer(app);
server.listen(3030);
module.exports = app;