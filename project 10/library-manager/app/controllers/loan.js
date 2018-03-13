const express = require('express');
const router = express.Router();
const moment = require('moment');
const db = require('../models');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const paginate = require('express-paginate');

module.exports = (app) => {
  app.use('/loans', router);
};

// read - get all Loans
router.get('/all_loans', (req, res, next) => {
	db.Loan.findAndCountAll({
    limit: req.query.limit, 
    offset: req.skip, 
    include: [
        {model: db.Patron},
        {model: db.Book}
      ]})
    .then(results => {
      const itemCount = results.count;
      const pageCount = Math.ceil(results.count / req.query.limit);
      res.render('loans/all_loans', {
        loans: results.rows,
        pageCount,
        itemCount,
        pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
      });  
  }).catch(err => next(err))
});

// get new loans form
router.get("/new_loan", (req, res, next) => {
    db.Book.findAll({
      include: [
        {model:db.Loan}
      ]
    })
    .then(books => {
      db.Patron.findAll().then(patrons => {
        return res.render('loans/new_loan', {
          books,
          patrons,
          loaned_on: moment().format('llll'),
          return_by: moment().add(7, 'days').format('llll')
        })
      }).catch(err => next(err))
    }).catch(err => next(err))
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
          errors: error.errors,
          book_id: req.body.book_id,
          patron_id: req.body.patron_id,
          loaned_on: req.body.loaned_on,
          return_by: req.body.return_by,
          returned_on: req.body.returned_on
        });
      } else {
          next(error)
      }
    }).catch(err => next(err))
});

// return book get
router.get("/return_book/:id/:patron", (req, res, next) => {
  db.Loan.findOne({ 
    include: [{model:db.Patron},{model:db.Book}],
    where: [
      {book_id: req.params.id},
      {patron_id: req.params.patron}
    ]
  })
  .then(loan => res.render("loans/return_book",{
      loan:loan,
      dateNow: moment().format('llll'),
      return_by: moment().add(7, 'days').format('llll')
    }))
  .catch(err => next(err))
})

// return book post
router.post("/return_book/:id/:patron", (req, res, next) => {
  db.Loan.update(req.body, {
    where: [
      {book_id: req.params.id}, 
      {patron_id: req.params.patron}
    ]
  })
  .then(() => {
    res.redirect('/loans/all_loans')
  })
  .catch(error => {
      if (error.name === "SequelizeValidationError") {
        return res.render("loans/return_book", {
          errors: error.errors,
          book_id: req.body.book_id,
          patron_id: req.body.patron_id,
          loaned_on: req.body.loaned_on,
          return_by: req.body.return_by,
          returned_on: req.body.returned_on
        });
      } else {
          next(error)
      }
    })
})

// checked out loans
router.get("/checked_loans", (req, res, next) => {
  db.Loan.findAll({
    include: [
      {model:db.Patron},
      {model:db.Book}
    ]
  })
  .then( loans => {
    res.render('loans/checked_loans', {loans:loans})
  })
  .catch(err => next(err))
})

// overdue loans
router.get("/overdue_loans", (req, res, next) => {
  db.Loan.findAll({
    include:[{model:db.Book},{model:db.Patron}],
    where: {
      return_by: {
        [Op.lt]: new Date()
      },
      returned_on: {
        [Op.eq]: null
      }
    },
  }).then( loans => {
      res.render("loans/overdue_loans", {loans:loans})
  })
})

