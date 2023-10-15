const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

require('dotenv').config();

var app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  exposedHeaders: ['set-cookie']
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
  cookie: {
    maxAge: 36000000,
    httpOnly: false,
  },
  secure: false,
}));

const authRouter = require('./routes/auth');
const eventsRouter = require('./routes/events');
const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');
const contactsRouter = require('./routes/contacts');

app.use('/auth', authRouter);
app.use('/contacts', contactsRouter);
app.use('/events', eventsRouter);
app.use('/items', itemsRouter);
app.use('/users', usersRouter);

mongoose.connect(process.env.MONGODB_URL);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  let error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send({ error });
});

module.exports = app;
