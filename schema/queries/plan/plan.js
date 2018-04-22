import Plan from '../../types/plan';
const graphql = require('graphql');
const { GraphQLID } = graphql;

const db = require('../../models/index.js');

/*
目前有id查询
 */
export default{
  type: Plan,
  args: {
    id: {
      type: GraphQLID,
    },
  },
  resolve(root, args) {
    return db.Plan.findById(args.id);
  },
};
