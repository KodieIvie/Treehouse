const express = require('express');
const router = express.Router();
const db = require('../models');

module.exports = (app) => {
  app.use('/loans', router);
};

router.get('/all_loans', (req, res, next) => {
	res.render('loans/all_loans');
  
});
