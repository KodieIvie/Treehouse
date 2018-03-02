const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'library-manager'
    },
    port: process.env.PORT || 3000,
    db: 'sqlite://localhost/library-manager-development',
    storage: rootPath + '/data/library.db'
  },

  test: {
    root: rootPath,
    app: {
      name: 'library-manager'
    },
    port: process.env.PORT || 3000,
    db: 'sqlite://localhost/library-manager-test',
    storage: rootPath + '/data/library-manager-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'library-manager'
    },
    port: process.env.PORT || 3000,
    db: 'sqlite://localhost/library-manager-production',
    storage: rootPath + 'data/library-manager-production'
  }
};

module.exports = config[env];
