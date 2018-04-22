const { GraphQLID, GraphQLString, GraphQLNonNull, GraphQLList } = require('graphql');
const Op = require('sequelize').Op;
const db = require('../../models/index.js');
import Plan from '../../types/plan.js';

/*
目前有user_id查询
state状态查询
 */

export default{
  type: GraphQLList(Plan),
  args: {
    // user_id: {
    //   type: new GraphQLNonNull(GraphQLID),
    // },
    state: {
      type: GraphQLString,
      description: '这里不是指的status,而是doing,done,all,unstart',
    },
  },
  resolve(root, args, req) {
    const userId = req.user.data.id;
    const otherCondition = {};
    if (args.state === 'doing') {
      otherCondition.start = {
        [Op.ne]: null,
      };
      otherCondition.end = {
        [Op.eq]: null,
      };
    } else if (args.state === 'done') {
      otherCondition.start = {
        [Op.ne]: null,
      };
      otherCondition.end = {
        [Op.ne]: null,
      };
    } else if (args.state === 'unstart') {
      otherCondition.start = {
        [Op.eq]: null,
      };
      otherCondition.end = {
        [Op.eq]: null,
      };
    }
    const condition = {
      user_id: userId,
      status: 0,
    };
    Object.assign(condition, otherCondition);
    return db.Plan.findAll({ where: condition, order: [['id', 'DESC']] });
  },
};
