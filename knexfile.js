'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/capstone'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/capstone'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
