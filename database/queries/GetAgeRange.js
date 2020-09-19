const { min } = require('lodash');
const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
  const getMinAge = Artist.find({})
    .sort({ age: 1 })
    .limit(1)
    .then((youngestArtists) => youngestArtists[0].age);

  const getMaxAge = Artist.find({})
    .sort({ age: -1 })
    .limit(1)
    .then((eldestArtists) => eldestArtists[0].age);

  return Promise.all([getMinAge, getMaxAge]).then((ages) => {
    const [min, max] = ages;
    return { min, max };
  });
};
