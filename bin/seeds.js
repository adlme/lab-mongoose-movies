'use strict';

const Celebrity = require('../models/Celebrity');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/CelebritiesApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const celebrityArray = [{
  name: 'Kobe Bryant',
  occupation: 'Basketball player',
  catchPhrase: 'Everything negative – pressure, challenges – is all an opportunity for me to rise.'
},
{
  name: 'Keanu Reeves',
  occupation: 'Actor',
  catchPhrase: "Money doesn't mean anything to me. I've made a lot of money, but I want to enjoy life and not stress myself building my bank account. I give lots away and live simply, mostly out of a suitcase in hotels. We all know that good health is much more important."
},
{
  name: 'Torrente',
  occupation: 'Detective',
  catchPhrase: 'Tus ojos son como dos sartenes, cuando los veo se me fríen los huevos'
}]
    ;

const createCelebrities = async (celebrityArray) => {
  try {
    const response = await Celebrity.create(celebrityArray);
  } catch (error) {
    console.log(error);
  }
};

createCelebrities(celebrityArray);
