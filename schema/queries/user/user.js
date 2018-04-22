import User from '../../types/user';
const { GraphQLInt, GraphQLError } = require('graphql');

const db = require('../../models/index.js');


/*
目前有id查询
*/
// 登录验证的pwd name写另外的地方好了。
export default{
  type: User,
  args: {
    id: {
      type: GraphQLInt,
    },
  },
  resolve(root, args, req) {
    if (req.user.role === 'admin') {
      return db.User.findById(args.id);
    }
    return new GraphQLError('没权限');
  },
};
