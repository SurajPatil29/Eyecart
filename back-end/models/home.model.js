const mongoose = require('mongoose');

// Define the schema for the Home collection
const homeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  location: { type: String, required: true },
  area: { type: String, required: true },
  price: { type: String, required: true },
  area_unit: { type: String, required: true },
  price_unit: { type: String, required: true },
  image: { type: String, required: true },
  ptype: { type: String, required: true },
  purpose: { type: String, required: true },
  posted_by: { type: String, required: true },
  date: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  garages: { type: Number, required: true },
  description: { type: String, required: true }
}, { collection: 'home' });

// Create the model from the schema
const Home = mongoose.model('Home', homeSchema);

module.exports = Home;

// in this module i was save all data for home page products 