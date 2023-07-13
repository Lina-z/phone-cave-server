const mongoose = require('mongoose');
const Phone = require('../models/Phone.model');
const phones = require('./phones')
require('dotenv').config()


const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/phone-cave-server'

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);

    return Phone.deleteMany({}); 
  })
  .then( (response) => {
    console.log(response);
    return Phone.insertMany(phones);
     })
  .then(phonesFromDB => {
    console.log(`Created ${phonesFromDB.length} phones`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to DB: ", err);
  });
