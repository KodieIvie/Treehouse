const express = require('express');
const router = express.Router();
const db = require('../models');
const Sequelize = require("sequelize");
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

// update get one
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

// delete this one
router.get("/book_detail/:id/api", (req, res, next) => {
    db.Book.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {model: db.Loan, include: [
          {model: db.Patron, include: [ /* etc */]}
        ]}
      ]
    }).then(values=>res.send(values))
    
});

// update book details POST
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
	    	
	    	title: req.body.title,
	    	genre: req.body.genre,
	    	author: req.body.author,
	    	first_published: req.body.first_published
        });
      } else {
        throw error;
      }
    })
    .catch(err => {
      next(err)
    });
});

// overdue books
router.get("/overdue_books", (req, res, next) => {
  db.Loan.findAll({
      where: [{
          returned_on: {
            [Op.eq]: null
        },
          return_by: {
            [Op.lt]: Date.now()
        }
      }]
      
  }).then( books => {
      res.send(books)
  })

})

// checked out
router.get("/checked_books", (req, res, next) => {
  db.Loan.findAll({
      where: 
        {
          returned_on: { [Op.eq]: null },
          return_by: { [Op.gt]: Date.now() }
        }
      
  }).then( books => {
      res.send(books)
  })

})



