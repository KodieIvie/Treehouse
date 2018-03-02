const express = require('express');
const router = express.Router();
const db = require('../models');

module.exports = (app) => {
  app.use('/books', router);
};

// read - get all books
router.get('/all_books', (req, res, next) => {	
	db.Book.findAll().then(books => {
		return res.render('books/all_books', {books: books})
	})
});

// update get one
router.get('/book_detail/:id', (req, res, next) => {
	let uid = req.params.id;
	db.Loan.findAll({
	    where: [
	      {
	        book_id: req.params.id
	      }
	    ],
	    include: [{ model: db.Patron }, { model: db.Book }]
  	}).then((values)=>{return res.render('books/book_detail', {book: values[0]})})
});

// update post
router.post('/book_detail/:id', (req, res, next) => {
	db.Book.update(req.body, {
	    where: [
	      {
	        id: req.params.id
	      }
	    ]
	}).then(() => {
		return res.redirect('/books/all_books')
	})
});

// get new book form
router.get('/new_book', (req, res, next) => {
	res.render('books/new_book')
});

// create new book
router.post("/new_book", function(req, res, next) {
  db.Book.create(req.body)
    .then(function(book) {
      return res.redirect("/books");
    })
    .catch(function(error) {
      if (error.name === "SequelizeValidationError") {
        return res.render("books/new_book", {
	    	errors: error.errors,
	    	title: req.body.title,
	    	genre: req.body.genre,
	    	author: req.body.author,
	    	first_published: req.body.first_published
        });
      } else {
        throw error;
      }
    })
    .catch(function(err) {
      next(err)
    });
});

