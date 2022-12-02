const {Client} = require('../models/Client');
const {GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull} = require('graphql')
const clientType = new GraphQLObjectType({
  name: "Clients",
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    username: {type: GraphQLString},
    password: {type: GraphQLString},
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    clients: {
      type: new GraphQLList(clientType),
      resolve(parent, arg){
        return Client.find()
      }
    }

  }
})

// Mutations
const mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: {
      type: clientType,
      arg: {
        name: {type: GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLNonNull(GraphQLString)},
        username: {type: GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLNonNull(GraphQLString)},
      },
      resolve(parent, args){
        const client = new Client({
          name: args.name,
          email: args.email,
          username: args.username,
          password: args.password,
        })
        return client.save();
      }

    }
  }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
  });