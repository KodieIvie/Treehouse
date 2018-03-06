const express = require('express');
const router = express.Router();
const db = require('../models');

module.exports = (app) => {
  app.use('/patrons', router);
};

router.get('/all_patrons', (req, res, next) => {
	res.render('patrons/all_patrons');
  
});
