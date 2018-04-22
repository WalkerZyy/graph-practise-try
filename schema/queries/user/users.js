import User from '../../types/user';
const { GraphQLError, GraphQLList } = require('graphql');

const db = require('../../models/index.js');

/*
目前有无条件查询
 */
export default{
  type: GraphQLList(User),
  args: {
  },
  resolve(root, args, req) {
    if (req.user.role === 'admin') {
      return db.User.findAll();
    }
    return new GraphQLError('没权限');
  },
};
