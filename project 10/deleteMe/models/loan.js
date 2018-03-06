'use strict';
module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true 
    },
    book_id: {type: DataTypes.INTEGER},
    patron_id: {type: DataTypes.INTEGER},
    loaned_on: {type: DataTypes.DATE},
    return_by: {type: DataTypes.DATE},
    returned_on: {type: DataTypes.DATE}
  }, {
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
