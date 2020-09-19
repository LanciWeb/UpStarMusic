const Artist = require('../models/artist');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => {
  const getMinYearsActive = Artist.find({})
    .sort({ yearsActive: 1 })
    .limit(1)
    .then((newestArtists) => newestArtists[0].yearsActive);

  const getMaxYearsActive = Artist.find({})
    .sort({ yearsActive: -1 })
    .limit(1)
    .then((eldestArtists) => eldestArtists[0].yearsActive);

  return Promise.all([getMinYearsActive, getMaxYearsActive]).then(
    (yearsActives) => {
      const [min, max] = yearsActives;
      return { min, max };
    }
  );
};
