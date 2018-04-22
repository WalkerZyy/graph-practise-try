const crypto = require('crypto');
const db = require('../index');
const md5 = crypto.createHash('md5');
// 初始化admin用户
const adminIniPwd = md5.update('12345678').digest('hex');
function init() {
  db.User.count({}).then((c) => {
    console.log('count user:', c);
    if (c < 1) {
      console.log('doing init');
      db.User.create({
        name: 'admin',
        role: 'admin',
        pwd: adminIniPwd,
      }).then(() => {
      }, (err) => {
        console.log('err', err);
      });
    }
  });
}
module.exports = init;
