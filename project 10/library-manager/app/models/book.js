'use strict';
module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define('Book', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "Book title is required"
          }
        }
      },
      author: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "Book author is required"
          }
        }
      },
      genre: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "Book genre is required"
          }
        }
      },
      first_published: {
        type: Sequelize.INTEGER
      }
    },
    {
      tableName: "books",
      timestamps: false
    }
  );

  Book.associate = function(models) {
    // associations can be defined here
    Book.hasOne(models.Loan, {foreignKey: "book_id"});
  };
  return Book;
};
