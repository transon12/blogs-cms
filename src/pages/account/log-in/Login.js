import './style.scss';
import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import image from '../../../assets/images/login/Image.png';
import image1 from '../../../assets/images/login/Vector.png';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { useDispatch, useSelector } from 'react-redux';
import { responseSuccess } from '../../../redux/login/actions';
import { responseLogin } from '../../../redux/login/actions';
import Password from 'antd/lib/input/Password';

import { notification } from 'antd';
function Login() {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    const [username, setUserName] = useState();
    const [useremail, setUserEmail] = useState();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const key = 'updatable';
    const dispatch = useDispatch();
    const { unInfo } = useSelector((state) => state.Login);
    const userData = useSelector((state) => state.Login.userInformation);
    console.log(userData);

    // const data = [
    //     {
    //         id: 1,
    //         name: 'nguyen truong an',
    //         password: '123456',
    //     },
    //     {
    //         id: 2,
    //         name: 'dang tan dung',
    //         password: '123456',
    //     },
    // ];

    const pass = (googleData) => {
        console.log(googleData);
        setUserName(googleData.profileOnj.name);
    };

    const fail = (result) => {
        console.log(result.error);
    };
    const responseFacebook = (response) => {
        console.log(response);
        setProfile(response.data);
        dispatch(responseSuccess({ response }));
    };
    const componentClicked = (result) => {
        console.log(result.error);
    };
    const onFinish = (event) => {
        console.log(event);
        const data = {
            email: event.email,
            password: event.password,
        };
        console.log(data);
        fetch('https://dev-api.rikkeiacademy.com/api/student/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    localStorage.setItem('datatoken', JSON.stringify(data.data.access_token));
                    localStorage.setItem('datauser', JSON.stringify(data.data.user));
                    window.location.href='http://localhost:3000/dashboard'
                    dispatch(responseLogin(data.data));
                } else {
                    notification.open({
                        key,
                        message: data.message,
                    });
                    // setTimeout(() => {
                    //     notification.open({
                    //         key,
                    //         message: 'New Title',
                    //         description: 'New description.',
                    //     });
                    // }, 1000);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    // 12345678
    return (
        <>
            <div className="login-form">
                <div className="error">{error}</div>
                <div className="narbar">
                    <div className="icon-alen">
                        <img src={image1} alt="" />
                        <div className="alen-hepl">
                            <label className="alen">alem</label>
                            <label className="hepl">help</label>
                        </div>
                    </div>
                    <div className="login-registe">
                        <div className="resetto1">
                            <button className="register">
                                <ion-icon name="person-outline" />
                                Register
                            </button>
                        </div>
                        <div className="resetto2">
                            <button className="loginpage">Login</button>
                        </div>
                    </div>
                </div>
                <div className="form-tong">
                    <div className="wew-login">
                        <div className="from-nho1">
                            <div className="we-mid">
                                <p className="missed-you">We've Missed You!</p>
                                <p className="more-than">
                                    More than 150 questions are waiting for your wise suggestions
                                </p>
                            </div>
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}>
                                <Form.Item
                                    name="email"
                                    className="form-chu1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Email!',
                                        },
                                    ]}>
                                    <Input
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        placeholder="Email"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                        },
                                    ]}>
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                    </Button>
                                </Form.Item>
                            </Form>
                            <div className="google-facebook">
                                <div className="google">
                                    <GoogleLogin
                                        clientId="766994831553-kmvo31pkvvqgco22e7jld039jvfn5slo.apps.googleusercontent.com"
                                        render={(renderProps) => (
                                            <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                                <ion-icon className="google-loginform" name="logo-google"></ion-icon>
                                                Google
                                            </button>
                                        )}
                                        buttonText="Login"
                                        onSuccess={pass}
                                        onFailure={fail}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                    ,
                                </div>
                                <div className="facebook">
                                    <FacebookLogin
                                        appId="741537744233850"
                                        autoLoad={true}
                                        fields="name,email,picture"
                                        callback={responseFacebook}
                                        cssClass="my-facebook-button-class"
                                        icon="fa-facebook"
                                    />
                                    ,
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="imagee-img">
                        <img src={image} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
