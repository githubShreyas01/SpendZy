import React, { useEffect } from "react";
import { GetUserInfo } from "../apicalls/users";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import DefaultLayout from "./DefaultLayout";

function ProtectedRoute(props) {

    const {user} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const response = await GetUserInfo()
            if (response.success) {
                dispatch(SetUser(response.data));
            }else{
                message.error(response.message);
            }
        } catch (error) {
            navigate("/login");
            message.error(error.message);
        }
    };

    useEffect(() => {
        if(localStorage.getItem("token")){
            if(!user){
                getData();
            }
        }else{
            navigate("/login");
        }
    }, []);

    return (
        user && 
        <div>
            <DefaultLayout>
                {props.children}
            </DefaultLayout>
        </div>
    )
}

export default ProtectedRoute;