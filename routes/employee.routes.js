const express = require('express');
const router = express.Router();

const { Employeemodel } = require('../models/Employee.model')


router.get('/', async (req, res) => {
    try {
      const employees = await Employeemodel.find();
      res.json(employees);

    } catch (error) {
        
      console.error(error);
      res.json({ error: 'Server Error' });
    }
  });


router.post('/', async (req, res) => {
    const { firstName, lastName, email, department, salary } = req.body;

    try {
        const new_employee = new Employeemodel({
            firstName,
            lastName,
            email,
            department,
            salary,
        })

        await new_employee.save()
        res.json(new_employee)

    } catch (error) {
        console.log(error)
        res.json({ error: 'Server error' })
    }
})


router.put('/:id', async (req, res) => {
    const { firstName, lastName, email, department, salary } = req.body;

    try {
        const employee = await Employeemodel.findById(req.params.id)

        if (!employee) {
            return res.json({ error: 'Employee not found' })
        }

        employee.firstName = firstName;
        employee.lastName = lastName;
        employee.email = email;
        employee.department = department;
        employee.salary = salary;

        await employee.save();
        res.json(employee);

    } catch (error) {
        console.log(error);
        res.json({ error: 'Server error' })
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employeemodel.findById(req.params.id)

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        await employee.save();
        res.json({success: 'Employee Removed successfully'})

    } catch (error) {
        console.log(error)
        res.json({error: 'Can not delete employee'})
    }
})


module.exports = {router}