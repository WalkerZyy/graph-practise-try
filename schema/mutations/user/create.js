import { GraphQLError, GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';
import User from '../../types/user';
import getDigestPwd from '../../../routes/auth/getDigestPwd';
const db = require('../../models/index.js');

const userInput = new GraphQLInputObjectType({
  name: 'userInput',
  fields() {
    return {
      name: {
        type: new GraphQLNonNull(GraphQLString),
      },
      pwd: {
        type: new GraphQLNonNull(GraphQLString),
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
      return db.User.build(theArgs).save().then((arr) => arr);
    }
    return new GraphQLError('没权限');
  },
};
