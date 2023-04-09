const User = require('../models/user');
const Employee = require('../models/employee');

module.exports = {
    Query: {
        login: async (parent, args) => {
            const { email, password } = args;

            if (!User) {
                throw new Error('User does not exist.');
            }

            if (User.password !== args.password) {
                throw new Error('Password is incorrect.');
            }

            return "Your are logged in.";
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
