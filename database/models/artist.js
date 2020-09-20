const mongoose = require('mongoose');
const { Schema } = mongoose;
const AlbumSchema = require('./album');

const ArtistSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  yearsActive: Number,
  image: String,
  genre: String,
  website: String,
  netWorth: Number,
  labelName: String,
  retired: Boolean,
  albums: [AlbumSchema],
});

ArtistSchema.virtual('albumsReleased').get(function () {
  return this.albums.length;
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;
