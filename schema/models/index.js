// const fs = require('fs');
// const path = require('path');
import { db as config } from '../../config/index';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// ......
const User = require('./User')(sequelize, Sequelize);
const Plan = require('./Plan')(sequelize, Sequelize);

const db = {};

/*
 奇奇怪怪的 that's not a subclass of Sequelize.Model 错误，
 google有人也是遇到了同样的错误，把models拆分，然后module.exports引起，跟我这一模一样。
 不明白原因，不过有人把它放一个文件解决了。
 也有人提出不要自动地引入，而是要显示地require。参考 https://tutel.me/c/programming/questions/46392660/modulefilename+is+undefined+sequelize+nodejs
 so，我注释掉下面的。改为直接引入，这个后面开blog可以记录一下
 */
// const basename = path.basename(__filename);
// fs.readdirSync(__dirname)
//   .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
//   .forEach((file) => {
//     const model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });
const models = [
  User, Plan,
];
models.forEach((model) => {
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
