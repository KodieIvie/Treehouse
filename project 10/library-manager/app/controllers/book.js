const express = require('express');
const router = express.Router();
const moment = require('moment');
const db = require('../models');
let Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = (app) => {
  app.use('/books', router);
};

// get all books - read 
router.get("/all_books", (req, res, next) => {	
	db.Book.findAll().then(books => {
		return res.render('books/all_books', {books: books})
	})
});

// search results
router.post("/all_books", (req, res, next) => {
  db.Book.findAll({where: {
    [Op.or]: [
      { title: { [Op.like]: `%${req.body.search}%` } },
      { author: { [Op.like]: `%${req.body.search}%` } },
      { genre: { [Op.like]: `%${req.body.search}%` } }
    ]}
  }).then(results => {
    console.log(results)
      return res.render("books/search_books", {
        results: results
    })
  })
})

// book details get one
router.get("/book_detail/:id", (req, res, next) => {
    db.Book.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {model: db.Loan, include: [
          {model: db.Patron, include: [ /* etc */]}
        ]}
      ]
    })
    .then(book => {
      res.render("books/book_detail", {
        book: book
      })
    })
    .catch((err)=>next(err))
});

// book details update POST
router.post("/book_detail/:id", (req, res, next) => {
	db.Book.update(req.body, {
    where: [
      {
        id: req.params.id
      }
    ]
	})
  .then(() => {
    return res.redirect('/books/all_books')
  })
  .catch(error => {
    console.log(error)
    if (error.name === "SequelizeValidationError") {
      return res.render("books/book_detail", {
        errors: error.errors,
        title: req.body.title,
        genre: req.body.genre,
        author: req.body.author,
        first_published: req.body.first_published
      });
    } else {
      next(err)
    }
  })
  .catch(err => {
    next(err)
  }); 
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
          next(err);
        }
      })
      .catch(err => {
        next(err)
      }); 
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
  }).then( books => {
      res.render("books/overdue_books", {books:books,nowDate: Date.now()})
  })
})

// checked out
router.get("/checked_books", (req, res, next) => {
  db.Loan.findAll({include: {model: db.Book}}).then( books => {
      res.render("books/checked_books", {books:books})
  })
})
