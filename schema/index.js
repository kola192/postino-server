const axios = require('axios');
const { GraphQLID, GraphQLString, GraphQLSchema, GraphQLObjectType } = require("graphql");


const UserType = new GraphQLObjectType({
    name: "user",
    fields: () => ({
        id: {type: GraphQLID},
        first_name: {type: GraphQLString},
        email: {type: GraphQLString} 
    })
}); 

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        GET_USER: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, args){
                try{
                    const res = await axios.get(`http://localhost:3000/users/${args.id}`)
                    console.log(res.data)
                    return res.data
                }catch(err) {
                    console.error(err);
                }
            }
        }
    }
}) 

const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ADD_USER: {
            type: UserType,
            args: {
                id: {type:  GraphQLID},
                first_name: {type:  GraphQLString},
                email: {type:  GraphQLString}
            },
            async resolve(parent, args){
                try{
                    const res = await axios.post(`http://localhost:3000/users`, {
                        first_name: args.first_name,
                        email: args.email
                    })
                    return res.data
                }catch(err) {
                    console.log(err);
                }
            }
        }
    }
}) 

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})

module.exports = { schema }