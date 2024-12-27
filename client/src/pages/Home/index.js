import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle";

function Home() {

    const { user } = useSelector(state => state.users);
    const dispatch = useDispatch();

    return (
        <div>
            <PageTitle title={`
            Hey ${user.firstName} , Welcome to SpendZy
            `} />

            <div className="bg-secondary mt-2 br-3 p-2 flex flex-col gap-1">
                <div className="flex justify-between">
                    <h1 className="text-md uppercase"> Account Number</h1>
                    <h1 className="text-md">  {user._id} </h1>
                </div>

                <div className="flex justify-between">
                    <h1 className="text-md uppercase"> Balance</h1>
                    <h1 className="text-md"> &#8377; {user.balance || 0} </h1>
                </div>
            </div>

            <div className="card mt-2 br-3 p-2 flex flex-col gap-1">
                <div className="flex justify-between">
                    <h1 className="text-md uppercase"> First Name</h1>
                    <h1 className="text-md uppercase">  {user.firstName} </h1>
                </div>

                <div className="flex justify-between">
                    <h1 className="text-md uppercase"> Last Name</h1>
                    <h1 className="text-md uppercase"> {user.lastName} </h1>
                </div>

                <div className="flex justify-between">
                    <h1 className="text-md uppercase"> Email</h1>
                    <h1 className="text-md">  {user.email} </h1>
                </div>

                <div className="flex justify-between">
                    <h1 className="text-md uppercase"> Contact Number</h1>
                    <h1 className="text-md"> {user.contactNumber} </h1>
                </div>

                <div className="flex justify-between">
                    <h1 className="text-md uppercase"> Identification Type</h1>
                    <h1 className="text-md">  {user.identificationType} </h1>
                </div>

                <div className="flex justify-between">
                    <h1 className="text-md uppercase"> Identification Number</h1>
                    <h1 className="text-md"> {user.identificationNumber} </h1>
                </div>
            </div>
        </div>
    )
}

export default Home;