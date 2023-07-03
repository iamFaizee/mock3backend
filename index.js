const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config();
const cors = require('cors')

const {connection} = require('./config/db')
const {Usermodel} = require('./models/User.model')
const {router} = require('./routes/employee.routes')
const {authentication} = require('./middleware/authentication')

const app = express();

app.use(cors())

app.use(express.json());

app.get('/',(req,res) => {
    res.send("welcome to home")
})


app.post('/signup', async (req,res) => {
    try {
        const {email, password, confirmPassword} = req.body;

        if(password !== confirmPassword){
            res.json({error: 'Password not match'})
        }

    const hashed_password = bcrypt.hashSync(password, 8);
    const new_user = new Usermodel({
        email,
        password: hashed_password,
    })

    await new_user.save();

    res.json({success: 'Signup successful'})

    } catch (error) {

        console.log(error)
        res.json({error: 'Signup failed'})
    }
})


app.post('/login', async (req,res) => {
    try {
        const {email, password} = req.body
        const user = await Usermodel.findOne({email});

        if(!user){
            res.json({error: 'User not found'})
        }

        const hash = user.password
        const correct_password = bcrypt.compareSync(password, hash)

        if(!correct_password){
            return res.json({error: 'Invalid password'})
        }

        const token = jwt.sign({userID: user._id}, process.env.SECRET);

        res.json({success: 'Login successful', "token": token})

    } catch (error) {
        console.log(error)  
        res.json({error: 'Internal Server Error'})
    }
})


app.use('/employees', authentication, router)


app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})