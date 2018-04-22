import User from '../../types/user';
import { GraphQLError, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInt } from 'graphql';
import getDigestPwd from '../../../routes/auth/getDigestPwd';
const db = require('../../models/index.js');

const userInput = new GraphQLInputObjectType({
  name: 'userInput',
  fields() {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
      name: {
        type: GraphQLString,
      },
      pwd: {
        type: GraphQLString,
      },
      role: {
        type: GraphQLString,
      },
      status: {
        type: GraphQLInt,
      },
    };
  },
});

export default {
  type: User,
  args: {
    user: {
      type: userInput,
    },
  },
  resolve(source, args, req) {
    if (req.user.data.role === 'admin') {
      const theArgs = Object.assign({}, args.user, { pwd: getDigestPwd(args.user.pwd) });
      return db.User
        .findById(args.user.id)
        .then((user) => { user.update(theArgs); });
    }
    return new GraphQLError('没权限');
  },
};
