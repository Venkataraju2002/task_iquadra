const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { usersData, studentsData } = require('./mongo/data-schema');

const app = express();


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));

const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://root:admin@dsp.51ylmqg.mongodb.net/';

mongoose.connect(mongoURI, { useUnifiedTopology: true });

// Check if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.post('/users/signup', (req, res) => {
    const user_data = req.body;
    console.log(user_data);
    const user = new usersData(user_data);
    user.save()
    .then(() => {
        res.json({message: "User registered successfully"});
    })
    .catch((err) => {
        console.log(err);
    })
})


app.post('/get-user-by-email', (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    usersData.findOne({email: email})
    .then((user) => {
        res.json(user);
    })
    .catch((err) => {
        console.log(err);
    })
})

app.post('/add-student', (req,res) => {
    const student_data = req.body
    console.log(req.body);
    const user = new studentsData(student_data);
    user.save()
    .then(() => {
        res.json({message: "Student registered successfully"});
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/get-student-data', (req, res) => {
    
    studentsData.find()
    .then((result) => {
       res.json(result)
    }).catch((error) => {
        console.log(error)
    })
})


app.listen(5000, () => {
    console.log('Server running at port 6000');
})