import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Row, message, Col } from "antd";
import { LoginUser } from '../../apicalls/users';


function Login() {

    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const response = await LoginUser(values);
            console.log('Full response:', response); // Full response
            if (response.success) {
                localStorage.setItem("token", response.data.token);
                window.location.href = "/";
                message.success(response.message);
            } else {
               message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    return (
        <div className='bg-primary flex items-center justify-center h-screen'>
            <div className='card w-400 p-2'>
                <div className="flex item-center justify-between">
                    <h1 className="text-2xl">SpendZy - Login</h1>

                </div>
                <hr />

                <Form layout='vertical' onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Email" name="email">
                                <input type="text" />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item label="Password" name="password">
                                <input type="password" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <button className="primary-contained-btn w-100" type="submit">Login</button>

                    <h1 className="text-sm underline mt-2" onClick={() => navigate('/register')}>Not a member? Click Here to Register</h1>
                </Form>
            </div>
        </div>
    )
}

export default Login;