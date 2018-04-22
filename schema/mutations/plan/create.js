import {
  GraphQLInputObjectType,
  GraphQLString, GraphQLInt, GraphQLNonNull,
} from 'graphql';
import Plan from '../../types/plan';
const db = require('../../models/index.js');

const planInput = new GraphQLInputObjectType({
  name: 'planInput',
  fields() {
    return {
      title: {
        type: GraphQLString,
      },
      start: {
        type: GraphQLString,
      },
      end: {
        type: GraphQLString,
      },
      des: {
        type: GraphQLString,
      },
      level: {
        type: GraphQLInt,
      },
      status: {
        type: GraphQLInt,
      },
    };
  },
});

export default {
  type: Plan,
  args: {
    plan: {
      type: planInput,
    },
  },
  resolve(source, args, req) {
    const userId = req.user.data.id;
    const theArgs = Object.assign({}, args.plan, { user_id: userId, des: args.plan.des });
    return db.Plan.build(theArgs).save().then((arr) => arr);
  },
};
