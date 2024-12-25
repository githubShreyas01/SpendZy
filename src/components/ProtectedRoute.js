import React, { useEffect } from "react";
import { GetUserInfo } from "../apicalls/users";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function ProtectedRoute(props) {

    const [userData, setUserData] = React.useState(null)
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const response = await GetUserInfo()
            if (response.success) {
                setUserData(response.data)
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    useEffect(() => {
        if(localStorage.getItem("token")){
            if(!userData){
                getData();
            }
        }else{
            navigate("/login");
        }
    }, []);

    return (
        <div>
            {props.children}
        </div>
    )
}

export default ProtectedRoute;