const { buildSchema } = require('graphql');

module.exports = buildSchema(` 
type Post {
    _id: ID!
    title: String!
    content: String!
    inputUrl: String!
    creator: User!
    createdAt: String!
    updatedAt: String!
}
type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    status: String
    posts: [Post!]!
}    
input userData {
        email: String!
        name: String!
        password: String!
    }    

    type rootMutation {
        createUser(userInput: userData): User!
    }
    type rootQuery{
        hello: String!
    }
    schema {
        query: rootQuery
        mutation: rootMutation
    }
`);