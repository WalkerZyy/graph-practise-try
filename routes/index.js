import auth from './auth/auth';
const graphqlHTTP = require('express-graphql');

const schema = require('../schema');


module.exports = (app) => {
  // 验证层
  auth(app);

  // graphql
  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
  }));

  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      //  这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
      res.status(401);
      res.statusMessage = 'Unauthorized';
      res.send({ message: 'invalid token...' });
      return;
    }
    next(err);
  });
};
