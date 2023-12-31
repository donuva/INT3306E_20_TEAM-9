import React, { useEffect, useState } from "react";
import { Form, Input, Button, notification, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setLoggedIn }) => {
    const [submit, setSubmit] = useState(false);
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { username, password } = values;

        const FormData = require("form-data");
        let data = new FormData();
        data.append("username", username);
        data.append("password", password);

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://fall2324w20g9.int3306.freeddns.org/api/login",
            data: data,
        };

        try {
            const response = await axios.request(config);
            localStorage.setItem("jwt", response.data);
            setSubmit(true);
        } catch (error) {
            console.error(error);
            setLoginError("Login Error!");
            message.error('Login Error!');
        }
    };

    useEffect(() => {
        var token = localStorage.getItem('jwt');
        token = 'Bearer ' + token;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://fall2324w20g9.int3306.freeddns.org/api/me',
            headers: {
                'Authorization': token,
            }
        };

        axios.request(config)
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data));
                if (response.data.role === 'TEACHER') {
                    axios.get('http://fall2324w20g9.int3306.freeddns.org/api/teacher/me', {
                        headers: {
                            'Authorization': token
                        }
                    }).then((response) => {
                        localStorage.setItem('teacher_id', response.data.id);
                    }).catch((error) => {
                        console.log(error);
                    })
                    setLoggedIn(true)
                    navigate('/app/courses');
                } else {
                    axios.get('http://fall2324w20g9.int3306.freeddns.org/api/student/me', {
                        headers: {
                            'Authorization': token
                        }
                    }).then((response) => {
                        localStorage.setItem('student_id', response.data.id);
                    }).catch((error) => {
                        console.log(error);
                    })
                    setLoggedIn(true)
                    navigate('/app/courses');
                }


            })
            .catch((error) => {
                console.log(error);

            });
    }, [submit]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",

                background: "url('https://static.vecteezy.com/system/resources/previews/000/568/517/original/vector-cartoon-illustration-of-school-classroom.jpg')",
                backgroundSize: '100% 100%'

            }}
        >
            <div
                style={{
                    height: "50%",
                    width: "20%",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    background: "rgba(255, 255, 255, 0.3)",
                }}
            >
                <h2 style={{ textAlign: "center" }}>Log In</h2>
                <Form
                    name="normal_login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: "Please input your Username!" },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: "Please input your Password!" },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            style={{ width: "100%" }}
                        >
                            Log in
                        </Button>

                    </Form.Item>
                    <Form.Item>
                        <Button
                            // type="primary"
                            backgroundColor="white"
                            htmlType="submit"
                            className="login-form-button"
                            style={{ width: "100%" }}
                            onClick={() => navigate('/sign-up')}
                        >
                            Sign up
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Link to="/changePassword">Forgot password</Link>

                    </Form.Item>
                    {/* {loginError && (
                        <p
                            style={{ color: "red", marginTop: "10px" }}
                            className="error-message"
                        >
                            {loginError}
                        </p>
                    )} */}
                </Form>
            </div>
        </div >
    );
};

export default Login;
