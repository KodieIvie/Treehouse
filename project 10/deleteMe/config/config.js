const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'deleteme'
    },
    port: process.env.PORT || 3000,
    db: 'sqlite://localhost/deleteme-development',
    storage: rootPath + '/data/deleteme-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'deleteme'
    },
    port: process.env.PORT || 3000,
    db: 'sqlite://localhost/deleteme-test',
    storage: rootPath + '/data/deleteme-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'deleteme'
    },
    port: process.env.PORT || 3000,
    db: 'sqlite://localhost/deleteme-production',
    storage: rootPath + 'data/deleteme-production'
  }
};

module.exports = config[env];
