
介绍就一句话：     Express + Graphql + Sequelize  practise

#########################################################

以下是发牢骚可以不管

######################牢骚分割线##########################

readme.md为什么点md呢，md就是马蛋的缩写呀233(=・ω・=)

这里mark一个
最开始没有用es6，直接用高版本的node然后引用的地方都是require
出了一些奇奇怪怪的错误——就是代码不改，require的写法改成import/export的话就不会出现的问题

比如sequelize报的that's not a subclass of Sequelize.Model 错误，这个还好，解决了
然后作为正题的graphql尝试的错误，type: new GraphQLList(Plan)的地方报一句 expected [object Object] to be a GraphQL type
臣妾真的布吉岛该怎么办呀！最后果然.....把require全部换成import/export什么都不改，就好了（/TДT)/（/TДT)/（/TДT)/（/TДT)/（/TДT)/

诶诶，以后真的不能偷懒
嘛~~~~~~大概

##############################################################
弄了半天，后来才发现还有sequelize-graphql 呜呜呜，管它了，以后再看了，核对类型真麻烦

localhost:8088/graphql 进入graphiql的界面，哦，对了，进不去，用了验证，可以先Postman调用/graphql/login获取一个toekn。再挂到连接上进去

初始化用户  admin   密码12345678