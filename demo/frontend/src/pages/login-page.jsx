import React, { useState } from 'react';
import './login-page.css';
import {Link, useNavigate} from 'react-router-dom';

import axios from 'axios';

function LoginPage() {

    const navigate = useNavigate();

    const [data, setData] = useState(false);
    const [validPassword, setValidPassword] = useState(false)

    const [userData, setUserData] = useState({
        email: '',
        check_password: ''
    })

    const updateUser = (e) => {
        setData(false);
        setValidPassword(false);
        setUserData({
            ...userData, [e.target.name]: e.target.value
        })
    }

    const CheckUserData = (e) => {
        e.preventDefault();
        console.log(userData)
        axios.post('http://localhost:5000/get-user-by-email', userData)
        .then(res => {
            console.log(res.data)
            if(!res.data){
                setData(true)
            }
            else if(res.data.password === userData.check_password){
                navigate('/home-page');
            }
            else{
                setValidPassword(true)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }


    return (
        <div class="login-form">
        <h2>Login</h2>
        <form onSubmit={CheckUserData}>
            <label for="email">Email ID:</label>
            <input type="email" id="email" name="email" onChange={updateUser} required /><br />

            {data ? <label for="remember" style={{color: 'red'}}>Email is not registered</label> : <></>}
            <br />

            <label for="password">Password:</label>
            <input type="password" id="password" name="check_password" onChange={updateUser} required /><br />

            {validPassword ? <label for="remember" style={{color: 'red'}}>Password is not matched</label> : <></>}

            <div className='bottom'><p>If you don't have an account?</p><span><Link to="/signup-page">Signup</Link></span></div>
            <input type="submit" value="Login" />
        </form>
    </div>

    );
}

export default LoginPage;