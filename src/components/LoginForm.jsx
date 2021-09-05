import React, { useState } from "react";
import validator from 'validator'

function LoginForm(props) {
    const [serverError, setServerError] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const { value, name } = event.target;
        setCredentials((preValue) => {
        if (name === "email") {
            if ((validator.isEmail(value) || (value === '')) && (value.length < 50)) {
                setEmailError('')
            } else {
                setEmailError('Not a valid email')
            }
            return {
            email: value,
            password: preValue.password
            };
        } else if (name === "password") {
            if ((value.length >= 4 && value.length < 16) || (value === '')) {
                setPasswordError('')
            } else {
                setPasswordError('Not a valid password')
            }
                return {
                email: preValue.email,
                password:value
                };
            }
        });
    }

    const handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (passwordError !== '' || emailError !== ''){
            return false
        }
        fetch('http://dev.rapptrlabs.com/Tests/scripts/user-login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams(credentials),
        })
            .then(handleErrors)
            .then(response => {
                props.handleLoggedIn()
                setServerError(false)
                console.log("ok")
            })
            .catch(error => {
                    setServerError(true);
                    console.log(error);
            });
    }


    return (
        <div className="container">
            <h1>Rapptr Labs</h1>
            <form  onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label><br></br>
                    <i className="fas fa-user"></i>
                    <input className={ emailError !== '' ? "error": undefined} onChange={handleChange}  id="email" name="email" placeholder="user@rapptrlabs.com" /> <br></br>
                    <span>{emailError}</span><br></br>
                <label htmlFor="password">Password</label><br></br>
                    <i className="fas fa-lock"></i>
                    <input className={ passwordError !== '' ? "error": undefined} onChange={handleChange} type="password" id="password" name="password" placeholder="Must be at least 4 characters" /><br></br>
                    <span>{passwordError}</span><br></br>
                <div className="button-container">
                    <button className={passwordError !== '' || emailError !== '' ? "invalidButton": undefined} type="submit">Login</button><br></br>
                    {serverError && <span style={{ color: "red" }}>The server could not be reached. Please try again later.</span>} <br></br>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;