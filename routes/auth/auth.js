import getDigestPwd from './getDigestPwd';
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');// jwt属于不查数据库的简单验证
const secretKey = 'hello graphql emmm';

const db = require('../../schema/models/index');


export default function (app) {
  app.use('/graphql', expressJwt({
    secret: secretKey,
    getToken: function fromHeaderOrQuerystring(req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    },
  }).unless({
    path: ['/graphql/login'], // 除了这个地址，其他的URL都需要验证
  })
    , (req, res, next) => {
    if (req.path !== '/login') { // 这里要主要把login排除在外
      if (!req.user.data.id) {
        res.status(401);
        res.statusMessage = 'Unauthorized';
        res.send({ message: 'invalid token...' });
        return;
      }
    }next();
  });

  app.post('/graphql/login', (req, res) => {
    const params = Object.assign({}, req.query, req.body);
    console.log(params);
    if (params.username && params.password) {
      const pwd = getDigestPwd(params.password);
      db.User.find({ where: { name: params.username, pwd } }).then((data) => {
        // console.log(data);
        if (data) {
          res.json({
            data: {
              token: jwt.sign({
                data,
              }, secretKey, {
                expiresIn: 60 * 60 * 24, // 一天
              }),
              username: data.name,
            },
          });
        } else {
          res.json({ errors: [{ message: '用户名或密码错误' }] });
        }
      });
    } else {
      res.json({ errors: [{ message: '参数异常' }] });
    }
  });
}
