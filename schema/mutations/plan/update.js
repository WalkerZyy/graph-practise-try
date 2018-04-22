import {
  GraphQLInputObjectType,
  GraphQLString, GraphQLInt, GraphQLNonNull,
} from 'graphql';
import Plan from '../../types/plan';
const db = require('../../models/index.js');

const planInput = new GraphQLInputObjectType({
  name: 'planUpdate',
  fields() {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
      },
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
  resolve(source, args) {
    return db.Plan
      .findById(args.plan.id)
      .then((plan) => plan.update(args.plan));
  },
};
