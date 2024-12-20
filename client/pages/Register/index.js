import React from 'react';
import {Form, Row, Col} from "antd";


function Register(){

    const onFinish =(values) =>{
        console.log("Received values of form: ", values);
    }

    return(
        <div className='m-5'>
            <div className="flex item-center justify-between">
            <h1 className="text-2xl">SpendZy - Register</h1>
            <h1 className="text-sm underline">Already a member? Log in</h1>
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