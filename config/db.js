const mongoose = require('mongoose')

const connection = mongoose.connect("mongodb://127.0.0.1:27017/mock3db")
// const connection = mongoose.connect(process.env.MONGO_CONNECTION)
.then((res) => {
    console.log('connection established')
})
.catch((err) => {
    console.log('error connecting to DB')
})


module.exports = {connection}