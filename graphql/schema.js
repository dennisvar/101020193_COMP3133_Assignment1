const { gql } = require('apollo-server-express');

module.exports = gql`
    type User {
        username: String!
        email: String!
        password: String!
    }

    type Employee {
        _id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        salary: Float!
    }

    type Query {
        login(
            email: String!
            password: String!
        ): User
        getAllEmployees: [Employee]
        searchEmployeeByEid(_id: ID!): Employee
    }

    type Mutation {
        signup(
            username: String!, 
            email: String!, 
            password: String!
        ): User
        addNewEmployee(
            first_name: String!
            last_name: String!
            email: String!
            gender: String!
            salary: Float!
        ): Employee
        updateEmployeeByEid(
            _id: ID!
            first_name: String!
            last_name: String!
            email: String!
            gender: String!
            salary: Float!
        ): Employee
        deleteEmployeeByEid(_id: String!): Employee
    }
`;