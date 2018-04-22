let config;
if (process.env.NODE_ENV !== 'production') {
  config = {
    db: {
      host: '127.0.0.1',
      database: 'toolkits',
      username: 'postgres',
      password: 'password',
      dialect: 'postgres',
    },
    server: {
      port: 8090,
      hostname: '127.0.0.1',
    },
  };
} else {
  config = {

  };
}
module.exports = config;
