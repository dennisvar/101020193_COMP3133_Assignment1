const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const { ApolloServer, gql } = require('apollo-server-express');

const User = require('./models/user');
const Employee = require('./models/employee');

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DB , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log("CONNECTED!!")
}).catch(error => {
    console.log("FAILED TO CONNECT??")
})

const typeDefs = gql`
    type User {
        username: String
        email: String
        password: String
    }

    type Employee {
        _id: ID
        first_name: String
        last_name: String
        email: String
        gender: String
        salary: Float
    }

    type Query {
        login(
            email: String, 
            password: String
        ): User
        getAllEmployees: [Employee]
        searchEmployeeByEid(_id: ID): Employee
    }

    type Mutation {
        signup(
            username: String, 
            email: String, 
            password: String
        ): User
        addNewEmployee(
            first_name: String
            last_name: String
            email: String
            gender: String
            salary: Float
        ): Employee
        updateEmployeeByEid(
            _id: ID
            first_name: String
            last_name: String
            email: String
            gender: String
            salary: Float
        ): Employee
        deleteEmployeeByEid(_id: String): Employee
    }
`;

const resolvers = {
    Query: {
        login: async (parent, args) => {
            const { email, password } = args;
        },

        getAllEmployees: async () => {
            return Employee.find({});
        },

        searchEmployeeByEid: async (parent, args) => {
            return Employee.findById(args._id)
        }
    },

    Mutation: {
        signup: async (parent, args) => {
            let newUser = new User({
                username: args.username,
                email: args.email,
                password: args.password
            })

            return newUser.save()
        },

        addNewEmployee: async (parent, args) => {


            let newEmployee = new Employee({
                first_name: args.first_name,
                last_name: args.last_name,
                email: args.email,
                gender: args.gender,
                salary: args.salary
            })

            return newEmployee.save()
        },

        updateEmployeeByEid: async (parent, args) => {
            let updatedEmployee = await Employee.findById(args._id, args.input)

            return updatedEmployee.save();
        },
        deleteEmployeeByEid: async (parent, args) => {
            let deletedEmployee = await Employee.findByIdAndDelete(args._id)
            
            return deletedEmployee;
        }
    }
}

const app = express()

app.listen(process.env.PORT, () => {
    console.log(`Server running @ http://localhost:${process.env.PORT}`)
})

