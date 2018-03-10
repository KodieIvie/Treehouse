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
      type: Sequelize.DATE,
      get() {
        if (this.getDataValue('loaned_on')){
          return this.getDataValue('loaned_on').slice(0, 10);
        }          
      }
    },
    return_by: {
      type: Sequelize.DATE,
      get() {
        if (this.getDataValue('return_by')){
          return this.getDataValue('return_by').slice(0, 10);
        }          
      },
    },
    returned_on: {
      type: Sequelize.DATE,
      get() {
        if (this.getDataValue('returned_on')){
          return this.getDataValue('returned_on').slice(0, 10);
        }          
      }
    }
  },{
      tableName: "loans",
      timestamps: false
    });
  Loan.associate = function(models) {
    // associations can be defined here
    Loan.belongsTo(models.Book, {foreignKey: 'book_id'})
    Loan.belongsTo(models.Patron, {foreignKey: 'patron_id'})
  };
  return Loan;
};
