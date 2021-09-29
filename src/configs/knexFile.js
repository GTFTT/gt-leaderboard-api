const config = require('./serverConfigs');

module.exports = {
    client: 'pg',
    connection: {
      host: config.get('postgres.host'),
      port: config.get('postgres.port'),
      database: config.get('postgres.database'),
      user: config.get('postgres.user'),
      password: config.get('postgres.password'),
      ssl: { rejectUnauthorized: false } //Use this to connect to database, I xz what it is
    },
    pool: {
      min: 10,
      max: 50,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false
    }
};
