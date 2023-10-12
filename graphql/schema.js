const { buildSchema } = require('graphql');
module.exports = buildSchema(` 
type List {
    items: [String]
    listGeneratedAt: String
    customer: String
}
type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    image: String
    lists: [List]
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