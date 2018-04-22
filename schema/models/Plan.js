/*
level 3: must----首要 2: wanted----好想要(必要) 1:need——需要 0:no need ----并不需要 不着急
// todo:Plan.items忘记设计了，下一步再写
 status 状态 —— 已完成和进行中和未发起，通过start end判断。status仅仅指，删除？？取消？？ 0---正常 1----删除
 */

module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define('Plan', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id',
    },
    title: DataTypes.TEXT,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    des: DataTypes.TEXT,
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    user_id: DataTypes.INTEGER,
  });

  Plan.associate = function (models) {
    models.Plan.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id' });
  };

  return Plan;
};
