import React, { useEffect, useState } from "react";
import axios from "axios";
import { json, useNavigate } from "react-router-dom";

function Login({ setLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submit, setSubmit] = useState(false);
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        const FormData = require("form-data");

        let data = new FormData();
        data.append("username", username);
        data.append("password", password);

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:8080/lms/login",

            data: data,
        };

        await axios
            .request(config)
            .then((response) => {

                localStorage.setItem("jwt", response.data);
                console.log(localStorage.getItem("jwt"));

                setSubmit(true);

            })
            .catch((error) => {
                console.log(error);
                setLoginError("Login Error!")
            });


    };
    useEffect(() => {
        var token = localStorage.getItem('jwt');
        token = 'Bearer ' + token;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/lms/me',
            headers: {
                'Authorization': token,
            }
        };

        axios.request(config)
            .then((response) => {
                console.log('Authorization' + `Bearer ${token}`);
                localStorage.setItem('user', JSON.stringify(response.data));
                if (response.data.role === 'TEACHER') {
                    console.log("TEACHER");
                    axios.get('http://localhost:8080/lms/teacher/me', {
                        headers: {
                            'Authorization': token
                        }
                    }).then((response) => {
                        localStorage.setItem('teacher_id', response.data.id);
                    }).catch((error) => {
                        console.log(error);
                    })
                    setLoggedIn(true)
                    navigate('/app/course');
                } else {
                    console.log("STUDENT");
                    axios.get('http://localhost:8080/lms/student/me', {
                        headers: {
                            'Authorization': token
                        }
                    }).then((response) => {
                        localStorage.setItem('student_id', response.data.id);
                    }).catch((error) => {
                        console.log(error);
                    })
                    setLoggedIn(true)
                    navigate('/app/course');
                }


            })
            .catch((error) => {
                console.log(error);
                console.log('Authorization' + token);

            });


    }, [submit])


    return (
        <div className="login-container">
            <h2>Log In</h2>
            <input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Submit</button>
            {loginError && <p style={{ color: 'red', marginTop: '10px' }} className="error-message">{loginError}</p>}
        </div>
    );
}

export default Login;
