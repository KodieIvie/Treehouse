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
      type: Sequelize.DATEONLY,
      validate: {
        isDate: {
          msg: "Loaned on must have valid date"
        },
        notEmpty: {
          msg: "Loaned on date required"
        }
      }
    },
    return_by: {
      type: Sequelize.DATEONLY,
      validate: {
        isDate: {
          msg: "Return by must have valid date"
        },
        notEmpty: {
          msg: "Return by date is required"
        }
      }
    },
    returned_on: {
      type: Sequelize.DATEONLY,
      validate: {
        isDate: {
          msg: "Returned on must have valid date"
        },
        notEmpty: {
          msg: "Returned on date is required"
        }
      }
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
