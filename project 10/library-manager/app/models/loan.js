'use strict';
module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    book_id: {type: DataTypes.INTEGER},
    patron_id: {type: DataTypes.INTEGER},
    loaned_on: {type: DataTypes.DATE},
    return_by: {type: DataTypes.DATE},
    returned_on: {type: DataTypes.DATE},
    created_at: {type: DataTypes.DATE}
  }, {});
  Loan.associate = function(models) {
    // associations can be defined here
    Loan.hasMany(models.Patron)
    Loan.hasMany(models.Book)
  };
  return Loan;
};
