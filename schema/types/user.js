import Plan from './plan';
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');

const db = require('../models/index.js');

export default new GraphQLObjectType({
  name: 'user',
  description: 'user',
  fields() {
    return {
      id: {
        type: GraphQLID,
        description: 'user ID',
        resolve(user) {
          return user.id;
        },
      },
      name: {
        type: GraphQLString,
        description: 'user name',
        resolve(user) {
          return user.name;
        },
      },
      // pwd: {// 这个怕是不能传出去
      //   type: GraphQLString,
      //   resolve(user) {
      //     return user.pwd;
      //   },
      // },
      role: {
        type: GraphQLString,
        description: 'user role',
        resolve(user) {
          return user.role;
        },
      },
      status: {
        type: GraphQLInt,
        description: 'user\'s status , for example:deprecated',
        resolve(user) {
          return user.status;
        },
      },
      // plan:{
      //   type: Plan,
      //   description: 'the plan of the user',
      //   resolve(user) {
      //     单个查询貌似暂时不需要呢
      //   },
      // },
      plans: {
        type: new GraphQLList(Plan),
        description: 'the plan list of the user',
        resolve(user) {
          return db.quote.findAll({ where: { user_id: user.id } });
        },
      },
    };
  },
});
