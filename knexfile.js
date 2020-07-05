require("dotenv").config();

module.exports = {

  dev: {
    client: 'pg',
     connection: {
      database: process.env.LOCAL_DB,
      user: process.env.LOCAL_USER,
      password: process.env.LOCAL_PASSWORD,
      port: 5432,
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  prod: {
    client: 'pg',
     connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './data/testDevDesk.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done)
      }
    }
  }
};
