const mongoose = require('mongoose')


const employeeSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    department: String,
    salary: Number,
})

const Employeemodel = mongoose.model('Employees', employeeSchema)

module.exports = {Employeemodel}