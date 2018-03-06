const express = require('express');
const router = express.Router();
const db = require('../models');

module.exports = (app) => {
  app.use('/patrons', router);
};

// read - get all patrons
router.get("/all_patrons", (req, res, next) => {	
	db.Patron.findAll().then(patrons => {
		return res.render('patrons/all_patrons', {patrons: patrons})
	})
});

// get new patron form
router.get("/new_patron", (req, res, next) => {
	return res.render('patrons/new_patron')
});

// create new patron
router.post("/new_patron", (req, res, next) => {
  db.Patron.create(req.body)
    .then(book => {
      return res.redirect("/patrons/all_patrons");
    })
    .catch(error => {
      if (error.name === "SequelizeValidationError") {
        return res.render("patrons/new_patron", {
	    	first_name: req.body.first_name,
	    	last_name: req.body.last_name,
	    	address: req.body.address,
	    	email: req.body.email,
	    	library_id: req.body.library_id,
	    	zip_code: req.body.zip_code
        });
      } else {
        throw error;
      }
    })
    .catch(err => {
      next(err)
    });
});

// get one patron details
router.get("/patron_detail/:id", (req, res, next) => {
	  db.Patron.findOne({
		where: {
			id: req.params.id
		},
      	include: [
        	{model: db.Loan, include:[ 
        		{model: db.Book }] }
      	]
    })
    .then(patron => {
      res.render("patrons/patron_detail", {
        patron: patron
      })
    })
    .catch((err) => next(err))
});

// update patron details
router.post("/patron_detail/:id", (req, res, next) => {
	db.Patron.update(req.body, {
	    where: [
	      {
	        id: req.params.id
	      }
	    ]
	}).then(() => {
		return res.redirect('/patrons/all_patrons')
	})
});
