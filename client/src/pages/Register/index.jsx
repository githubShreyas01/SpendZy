import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Form, Row, message, Col} from "antd";
import { RegisterUser } from '../../apicalls/users';


function Register(){

    const navigate = useNavigate();
    const onFinish = async (values) =>{
        try {
            const response = await RegisterUser(values);
            if(response.success){
                message.success(response.message);
                navigate('/login');
            }else{
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
        
    }

    return(
        <div className='m-5'>
            <div className="flex item-center justify-between">
            <h1 className="text-2xl">SpendZy - Register</h1>
            <h1 className="text-sm underline" onClick={() => navigate("/login")}>Already a member? Log in</h1>
            </div>
            <hr />
            <Form layout='vertical' onFinish={onFinish}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item label="First Name" name="firstName">
                            <input type="text"/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Last Name" name="lastName">
                            <input type="text"/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Email" name="email">
                            <input type="text"/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Contact Number" name="contactNumber">
                            <input type="text"/>
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item label="Identification Type" name="identificationType">
                            <select>
                                <option value="Choose one">Choose one</option>
                                <option value="Aadhar Card">Aadhar Card</option>
                                <option value="Pan Card">PAN Card</option>
                                <option value="Driving License">Driving License</option>
                                <option value="Passport">Passport</option>
                            </select>
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item label="Identification Number" name="identificationNumber">
                            <input type="text" />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item label="Address" name="address">
                            <textarea type="text" />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item label="Password" name="password">
                            <input type="password" />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item label="Confirm Password" name="confirmPassword">
                            <input type="password" />
                        </Form.Item>
                    </Col>
                </Row>

                <div className="flex justify-end">
                    <button className="primary-contained-btn" type="submit">Register</button>
                </div>

            </Form>
        </div>
    )
}

export default Register;