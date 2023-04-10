// 6) sample user detail to login
// {
//     "username": "pritesh",
//     "email": "pritesh@mail.com",
//     "password": "pass"
// }

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { ApolloServer } = require('apollo-server-express');
const cors = require("cors");

const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DB , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log("CONNECTED!!")
}).catch(error => {
    console.log("FAILED TO CONNECT??")
})

const app = express()

app.use(cors());

async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({app})

    app.listen(process.env.PORT, () => {
        console.log(`Server running @ http://localhost:${process.env.PORT}${server.graphqlPath}`)
    })
}

startServer();

