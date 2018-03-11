'use strict';
module.exports = (sequelize, Sequelize) => {
  const Patron = sequelize.define('Patron', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      autoIncrement: true   
    },
    first_name: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "First name is required"
          }
        }
      },
    last_name: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "Last name is required"
          }
        }
      },
    address: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "Address is required"
          }
        }
      },
    email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: {
            msg: "Valid email is required"
          }
        }
      },
    library_id: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "Library id is required"
          }
        }
      },
    zip_code: {
      type: Sequelize.INTEGER,
      validate: {
        notEmpty: {
          msg: "Zip code is required"
        }
      }
    }
  },{  
      tableName: "patrons",
      timestamps: false
    }
  );

  Patron.associate = function(models) {
    // associations can be defined here
    Patron.hasMany(models.Loan,{foreignKey: "patron_id"})
  };
  return Patron;
};
