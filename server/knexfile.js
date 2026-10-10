const base = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};

module.exports = {
  development: {
    ...base,
    connection: {
      filename: './dev.sqlite3',
    },
  },
  production: {
    ...base,
    connection: {
      filename: './prod.sqlite3',
    },
  },
};
