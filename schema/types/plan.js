import moment from 'moment';
import User from './user';
const graphql = require('graphql');
const { GraphQLID, GraphQLString, GraphQLObjectType, GraphQLInt } = graphql;

const db = require('../models/index.js');

export default new GraphQLObjectType({
  name: 'plan',
  description: 'plan',
  fields() {
    return {
      id: {
        type: GraphQLID,
        description: 'plan ID',
        resolve(plan) {
          return plan.id;
        },
      },
      title: {
        type: GraphQLString,
        description: 'title',
        resolve(plan) {
          return plan.title;
        },
      },
      start: {
        type: GraphQLString,
        description: 'startTime',
        resolve(plan) {
          if (plan.start) {
            return moment(plan.start).format('YYYY-MM-DD HH:mm:ss');
          }
          return plan.start;
        },
      },
      end: {
        type: GraphQLString,
        description: 'endTime',
        resolve(plan) {
          if (plan.end) {
            return moment(plan.end).format('YYYY-MM-DD HH:mm:ss');
          }
          return plan.end;
        },
      },
      des: {
        type: GraphQLString,
        description: 'description of the Plan',
        resolve(plan) {
          return plan.des;
        },
      },
      createdAt: {
        type: GraphQLString,
        description: 'created time of the Plan',
        resolve(plan) {
          return moment(plan.createdAt).format('YYYY-MM-DD HH:mm:ss');
        },
      },
      level: {
        type: GraphQLInt,
        description: 'level of the Plan',
        resolve(plan) {
          return plan.level;
        },
      },
      status: {
        type: GraphQLInt,
        description: 'the status of the Plan',
        resolve(plan) {
          return plan.status;
        },
      },
      user_id: {
        type: GraphQLInt,
        description: 'the (user of the Plan)\'s id ',
        resolve(plan) {
          return plan.user_id;
        },
      },
      user: {
        type: User,
        description: 'user of this plan',
        resolve(plan) {
          return db.User.findById(plan.user_id);
        },
      },
    };
  },
});
