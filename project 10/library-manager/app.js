
const express = require('express');
const router = express.Router();
const config = require('./config/config');
const db = require('./app/models');
const Op = db.Sequelize.Op;

const app = express();

module.exports = require('./config/express')(app, config);

db.sequelize
  .sync()
  .then(() => {
    if (!module.parent) {
      app.listen(config.port, () => {
        console.log('Express server listening on port ' + config.port);
      });
    }
  }).catch((e) => {
    throw new Error(e);
  });

