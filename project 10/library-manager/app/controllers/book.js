const express = require('express');
const router = express.Router();
const moment = require('moment');
const db = require('../models');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const paginate = require('express-paginate');

module.exports = (app) => {
  app.use('/books', router);
};

// get all books + Pagination
router.get("/all_books", (req, res, next) => {
  db.Book.findAndCountAll({limit: req.query.limit, offset: req.skip})
    .then(results => {
      const itemCount = results.count;
      const pageCount = Math.ceil(results.count / req.query.limit);
      res.render('books/all_books', {
        books: results.rows,
        pageCount,
        itemCount,
        pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
      });  
  }).catch(err => next(err))
});


// search results
router.post("/all_books", (req, res, next) => {
  db.Book.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${req.body.search}%` } },
        { author: { [Op.like]: `%${req.body.search}%` } },
        { genre: { [Op.like]: `%${req.body.search}%` } }
      ]
    }
  }).then(results => {
      return res.render("books/search_books", {
        results: results
    })
  }).catch(err => next(err))
})

// book details get one
router.get("/book_detail/:id", (req, res, next) => {
  db.Book.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {model: db.Loan, include: [
        {model: db.Patron}
      ]}
    ]
  }).then(book => {
    res.render("books/book_detail", {
      book: book
    })
  }).catch((err)=>next(err))
});

// book details update POST
router.post("/book_detail/:id", (req, res, next) => {
	db.Book.update(req.body, {
    where: [
      {
        id: req.params.id
      }
    ]
	}).then(() => {
    return res.redirect('/books/all_books')
  })
  .catch(error => {
    if (error.name === "SequelizeValidationError") {
      db.Book.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {model: db.Loan, include: [
            {model: db.Patron}
          ]}
        ]
      }).then(book => {
        res.render("books/book_detail", {
          errors: error.errors,
          book: book
        })
      }).catch((err)=>next(err))
    } else {
      next(error)
    }
  })
});

// get new book form
router.get("/new_book", (req, res, next) => {
	return res.render('books/new_book')
});

// create new book
router.post("/new_book", (req, res, next) => {
  db.Book.create(req.body)
    .then(book => {
      return res.redirect("/books/all_books");
    })
    .catch(error => {
      if (error.name === "SequelizeValidationError") {
        return res.render("books/new_book", {
          errors: error.errors,
  	    	title: req.body.title,
  	    	genre: req.body.genre,
  	    	author: req.body.author,
  	    	first_published: req.body.first_published
        });
      } else {
          next(error);
        }
    })
});

// overdue books
router.get("/overdue_books", (req, res, next) => {
  db.Loan.findAll({
    include:{model:db.Book},
    where: {
      return_by: {
        [Op.lt]: new Date()
      },
      returned_on: {
        [Op.eq]: null
      }
    },
  })
  .then( books => {
      res.render("books/overdue_books", {books:books, nowDate: Date.now()})
  })
  .catch(err => next(err))
})

// checked out
router.get("/checked_books", (req, res, next) => {
  db.Loan.findAll({
    include: {model: db.Book},
    where: {
      returned_on: { [Op.eq]: null }
    }
  })
  .then( books => {
      res.render("books/checked_books", {books:books})
  }).catch(err => next(err))
})
