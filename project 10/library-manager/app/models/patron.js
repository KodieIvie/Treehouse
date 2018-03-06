'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patron = sequelize.define('Patron', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true   
    },
    first_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "First name is required"
          }
        }
      },
    last_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Last name is required"
          }
        }
      },
    address: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Address is required"
          }
        }
      },
    email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Email is required"
          }
        }
      },
    library_id: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Library id is required"
          }
        }
      },
    zip_code: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Zip code is required"
          }
        }
      }
    },
      {
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
