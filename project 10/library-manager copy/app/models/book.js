'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Book title is required"
          }
        }
      },
      author: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Book author is required"
          }
        }
      },
      genre: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Book genre is required"
          }
        }
      },

      first_published: {type: DataTypes.INTEGER}
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
