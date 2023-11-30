const mongoose = require('mongoose');
const userData = mongoose.Schema({
    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    contact: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
})


const studentData = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    dateofbirth: {
        type: Date,
        require: true
    },
    rollnumber: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    contact: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
})

const usersData = mongoose.model('userData', userData)
const studentsData = mongoose.model('studentData', studentData)

module.exports = {usersData, studentsData}
