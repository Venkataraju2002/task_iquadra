
import React, { useEffect, useState } from 'react';
import './home-page.css';

import axios from 'axios';

const HomePage = () => {

    const [showForm, setShowForm] = useState(false);
    const [details, setDetails] = useState(false)
    const [isNumberValid, setIsNumberValid] = useState(true);
    const [numberError, setNumberError] = useState(false)
    const [studentDetails, setStudentDetails] = useState([]);
    const [genderError, setGenderError] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:5000/get-student-data')
        .then((response) => {
            console.log(response.data)
            setStudentDetails(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [setShowForm])

    const [tasks, setTasks] = useState([]);
    const [studentData, setStudentData] = useState({
        name: '',
        dateofbirth: '',
        rollnumber: '',
        email: '',
        age: '',
        gender: '',
        contact: '',
    });

    

    //   const handleAddTask = (e) => {
      
    //   };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleChange = (e) => {
        setStudentData({
            ...studentData, [e.target.name]: e.target.value
          });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const numberPattern = /^\d{10}$/;
        setIsNumberValid(numberPattern.test(studentData.contact))
        if(isNumberValid === false){
            setNumberError(true)
        }

        // else if(!studentData.name || !studentData.rollnumber || !studentData.dateofbirth || !studentData.email || !studentData.contact || !studentData.gender || !studentData.age){
        //     setDetails(true)
        // }
        else{
            axios.post('http://localhost:5000/add-student', studentData)
            .then(res => {
                setShowForm(false)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            console.log(studentData);
        }
    };


    return (

        <div className="popup-container">
            <nav className="navbar">
            <h1>Student Regestration Form</h1>
          </nav>
          <p className='add-task' onClick={toggleForm}>Add Student Data</p>

            {showForm && (
                <div className="popup-form">
                    <div className="form-card">
                        <span className="close" onClick={toggleForm}>
                            &times;
                        </span>
                        <h2>Student Details Form</h2>
                        <form onSubmit={handleSubmit}>

                            <label htmlFor="firstName">*Student Name:</label>
                            <input type="text" id="firstName" name="name" onChange={handleChange} /><br />
                            
                            <label htmlFor="dateofbirth">*Date of Birth:</label>
                            <input  type="date" id="dateofbirth" name="dateofbirth" onChange={handleChange} required /><br />

                            <label htmlFor="rollnumber">*Roll Number:</label>
                            <input type="text" id="rollnumber" name="rollnumber" onChange={handleChange} required /><br />

                            <label htmlFor='contact'>*Contact:</label>
                            <input type='number' id='contact' name='contact' onChange={handleChange} required /><br />
                            {numberError ? <label style={{color: 'red'}}>Enter valid number</label> : <></> }<br />

                            <label htmlFor="email">*Email ID:</label>
                            <input type="email" id="email" name="email" onChange={handleChange} required /><br />

                            <label htmlFor="age">*Age:</label>
                            <input type="number" id="age" name="age" onChange={handleChange} required /><br />

                            <label htmlFor="gender">*Gender:(Male/Female)</label>
                            <input type="text" id="gender" name="gender" onChange={handleChange} required /><br />

                            <button type="submit">Submit</button>

                            {details ? <p style={{color: 'red'}}>Enter all the * fields</p> : <></>}
                        </form>
                    </div>
                </div>
            )}

            <div>
                {studentDetails.map((ele) => {
                    return (
                        <div className='each-detail'>
                            <ul>
                                <li>{ele.name}</li>
                                <li>{ele.dateofbirth}</li>
                                <li>{ele.age}</li>
                                <li>{ele.gender}</li>
                                <li>{ele.email}</li>
                                <li>{ele.contact}</li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default HomePage;
