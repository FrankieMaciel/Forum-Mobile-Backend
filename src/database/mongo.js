const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
require('dotenv').config();

const connectionString = process.env.CONNECTION_STRING;
const maxAge = 1000 * 60 * 60 * 24 * 7;

const app = express();
async function connect() {
  return await mongoose.connect(
    connectionString, { 
      writeConcern: { wtimeout: 30000 } 
    }
  );
}
// Session
const sessionOptions = session({
  secret: 'airplane',
  store: new MongoStore({ mongoUrl: connectionString }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: maxAge,
    httpOnly: true
  }
});

module.exports = {
  connect,
  flash,
  sessionOptions,
};