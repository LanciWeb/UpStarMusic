const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  const query = Artist.find(buildQuery(criteria))
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit);

  return Promise.all([query, Artist.count()]).then((results) => {
    if (sortProperty === 'albums')
      results[0].sort((a, b) => a.albumsReleased - b.albumsReleased);
    return {
      limit,
      offset,
      all: results[0],
      count: results[1],
    };
  });
};

const buildQuery = (criteria) => {
  const { age, name, yearsActive } = criteria;
  let filterCriteria = { name: { $regex: name } };
  if (age) filterCriteria.age = { $gte: age.min, $lte: age.max };
  if (yearsActive)
    yearsCriteria = { $gte: yearsActive.min, $lte: yearsActive.max };

  return filterCriteria;
};

//# Indexes and text search

/**
 * if we want to drastically increase the speed of our searches, we can index a field.
 * To do so, we use the MongoDB CLI
 *
 * TODO - open the console in the project folder and run the following commands
 * | mongo
 * | show dbs
 * | use upstar_music
 * | db.artists.createIndex({name: "text"})
 *
 * So we ran the mongo CLI, checked the list of the db in our local mongo installation
 * and picked the one belonging to our project
 * then we specified the collection and call createIndex, passing the key of the field and its type
 */
