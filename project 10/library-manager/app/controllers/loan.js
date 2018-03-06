const express = require('express');
const router = express.Router();
const db = require('../models');

module.exports = (app) => {
  app.use('/loans', router);
};

// read - get all Loans
router.get('/all_loans', (req, res, next) => {
	res.render('loans/all_loans');
});

// get all loans details api
router.get("/all_loans/api", (req, res, next) => {
	db.Loan.findAll({
      include: [
       	{model: db.Patron },
       	{model: db.Book }
      ] 
    }).then(values=>res.send(values))
});

// get new loans form
router.get("/new_loan", (req, res, next) => {
	return res.render('loans/new_loans')
});

// create new loans
router.post("/new_loan", (req, res, next) => {
  db.Loan.create(req.body)
    .then(book => {
      return res.redirect("/loans/all_loans");
    })
    .catch(error => {
      if (error.name === "SequelizeValidationError") {
        return res.render("loans/new_loan", {
	    	book_id: req.body.book_id,
	    	patron_id: req.body.patron_id,
	    	loaned_on: req.body.loaned_on,
	    	return_by: req.body.return_by,
	    	returned_on: req.body.returned_on
        });
      } else {
        throw error;
      }
    })
    .catch(err => {
      next(err)
    });
});

// overdue loans

// checked loans
