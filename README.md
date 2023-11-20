# Node-MongoDB-Graphql backend for Shopping List App
Shopping list and customer backend CRUD ON MongoDB using Mongoose and GraphQL both frameworks.

### TechStack: Javascript, Express-validators, MongoDB, Mongoose, GraphQL

```
📦Shopmate-backend
 ┣ 📜app.js         // root of all components, API routes and server entry point
 📦controllers      // javascript callback functions to execute commands
 ┣ 📜admin-routes-controller     
 ┗ 📜citizen-routes-controller
 📦graphql          // graphql schema and resolver for complex queries
 ┣ 📜resolver
 ┗ 📜schema
 📦models           //schemas for multiple collections and relations in mongodb
 ┣ 📜creator
 ┣ 📜httpError      //Error handling model , not a schema 
 ┣ 📜list           
 ┣ 📜post
 ┗ 📜user   
 ┣ 📂routes         // root of managing different API Endpoints in REST 
 ┃ ┣ 📜admin-routes.js
 ┃ ┗ 📜public-routes.js
```
## Author
- [Aakash Mishra](https://portfolio-aakash28.netlify.app/)
- [My Github ](https://github.com/Aakash-mishra2)