'use strict';
module.exports = (sequelize, Sequelize) => {
  const Loan = sequelize.define('Loan', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      autoIncrement: true 
    },
    book_id: {
      type: Sequelize.INTEGER,
      validate: {
        notEmpty: {
          msg: "Book ID is required"
        }
      }
    },
    patron_id: {
      type: Sequelize.INTEGER,
      validate: {
        notEmpty: {
          msg: "Patron ID is required"
        }
      }
    },
    loaned_on: {
      type: Sequelize.DATE
    },
    return_by: {
      type: Sequelize.DATE
    },
    returned_on: {
      type: Sequelize.DATE
    }
  },{
    tableName: 'loans',
    timestamps: false
  }
  );
  Loan.associate = function(models) {
    // associations can be defined here
    Loan.belongsTo(models.Book, {foreignKey: 'book_id'})
    Loan.belongsTo(models.Patron, {foreignKey: 'patron_id'})
  };
  return Loan;
};
