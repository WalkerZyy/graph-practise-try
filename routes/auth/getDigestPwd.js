const crypto = require('crypto');
export default function getDigestPwd(pwd) {
  const md5 = crypto.createHash('md5');// 放外面会出Digest already called的错误
  return md5.update(pwd).digest('hex');
}
