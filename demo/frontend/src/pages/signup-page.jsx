import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {Outlet, Link, useNavigate} from 'react-router-dom';
import './signup-page.css';

const SignupPage = () => {

    const navigate = useNavigate();

    // const [fname, setFname] = useState('')
    // const [lname, setLname] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [confirmPassword, setConfirmPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

    const [userData, setUserData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirmPassword: '',
        contact: '',
        address: ''
    })
    const updateUser = (e) => {
        setValidPassword(false)
        setUserData({
          ...userData,  [e.target.name] : e.target.value
        })
    }
    const submitUser = (e) => {
        e.preventDefault()
        if(userData.password !== userData.confirmPassword){
            setValidPassword(true)
        }
        else{
            axios.post('http://localhost:5000/users/signup', userData)
            .then(res => {
                navigate('/');
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
        console.log(userData)
    }

    return (
        <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={submitUser}>
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="fname" onChange={updateUser} required /><br/>

            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lname" onChange={updateUser} required /><br />

            <label for="email">Email ID:</label>
            <input type="email" id="email" name="email" onChange={updateUser} required /><br />

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" onChange={updateUser} required /><br />

            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" onChange={updateUser} required /><br />

            <label for="contactNumber">Contact Number:</label>
            <input type="tel" id="contactNumber" name="contact" onChange={updateUser} required />
            
            {validPassword ? <label style={{color: 'red'}}>enter valid password</label> : <></>}
            <br></br>
            <label for="address">Address:</label>
            <textarea id="address" name="address" rows="4" onChange={updateUser} required></textarea><br />

            <div className='bottom'><p>If you have an account?</p><span><Link to="/login-page">LogIn</Link></span></div>
            <input type="submit" value="Sign Up" />
        </form>
        <Outlet />
    </div>
    );
};

export default SignupPage;