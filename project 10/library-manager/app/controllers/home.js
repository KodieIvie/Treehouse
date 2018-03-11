const express = require('express');
const router = express.Router();
const db = require('../models');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
	res.render('home');
});

// api json data endpoint
router.get("/api", (req, res, next) => {
	db.Book.findAll({include:{model:db.Loan, include:{model:db.Patron}}}).then( books => {
    db.Loan.findAll({include:[{model:db.Book},{model:db.Patron}]}).then( loans => {
    db.Patron.findAll({include:{model:db.Loan, include:{model:db.Book}}}).then( patrons => {
        res.send({books,loans,patrons})
      })
    })
  })
});