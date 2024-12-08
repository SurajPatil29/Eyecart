// homeRouter.js
const express = require('express');
const homeRouter = express.Router();
const Home = require('../models/home.model'); 


// Route to get all home data
homeRouter.get('/', async (req, res) => {
  try {
    const homes = await Home.find({});
    res.status(200).json(homes);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching home data' });
  }
});

module.exports = homeRouter;
