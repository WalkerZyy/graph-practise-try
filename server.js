import express from 'express';
import bodyParser from 'body-parser';
import { server as conf } from './config';
const db = require('./schema/models');
const init = require('./schema/models/init');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('static'));

// app.use('/', (req, res, next) => {
//   // console.log(req.body);
//   next();
// });

routes(app);

function errorHandler(err, req, res, next) {
  res.status(500);
  res.json({ errors: [{ message: '未知异常' }] });
}
app.use(errorHandler);

// 加hostname是个好习惯，这样有端口冲突server就不会起起来，你就不会遇到127.0.0.1:8088死活不能访问，localhost:8088却能访问，然后cmd里一看发现端口被爱奇艺的一个应用文件占了whatAF
function startApp(port, hostname) {
  app.listen(port, hostname, () => {
    console.log(`Server is listening on port ${port} ${hostname}`);
  });
}

db.sequelize.sync()
  .then(() => {
    init();
    startApp(conf.port, conf.hostname);
  })
  .catch((e) => {
    throw new Error(e);
  });
