const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        status: String!
        posts: [Post!]!
    }
    input UserInputData {
        email: String!
        name: String!
        password: String!
    }
    input PostInputData {
        title: String!
        content: String!
        creatorId: String!
    }
    type RootMutation {
        createUser(userInput: UserInputData): User!,
        deleteUser(userId: String!): User!,
        createPost(postInput: PostInputData): Post!,
        deletePost(delPostId: String!): Post!
    }
    type RootQuery {
        hello: String!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
