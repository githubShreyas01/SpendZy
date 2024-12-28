import React, { useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import { Table, message } from "antd";
import TransferFundsModal from "./TransferFundsModal";
import { useDispatch } from "react-redux";
import { GetTransactionsOfUser } from "../../apicalls/transactions";
//import {HideLoading, ShowLoading} from "../../redux/loaderSlice";
import moment from "moment";

function Transactions() {
    const [showTransferFundsModal, setShowTransferFundsModal] = React.useState(false);
    const [data = [], setData] = React.useState([]);
    const dispatch = useDispatch();

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            render: (text, record) =>{
                return moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A")
            }
        },
        {
            title: "Transaction ID",
            dataIndex: "_id",
        },
        {
            title: "Amount",
            dataIndex: "amount",
        },
        {
            title: "Type",
            dataIndex: "type",
        },
        {
            title: "Reference",
            dataIndex: "reference",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
    ];
    const getData = async () => {
        try {
            //dispatch(ShowLoading());
            const response = await GetTransactionsOfUser();
            if (response.success) {
                setData(response.data);
            }
            //dispatch(HideLoading());
        } catch (error) {
            //dispatch(HideLoading());
            message.error(error.message);
        }
    };

    useEffect(() =>{
        getData();
    });

    return (
        <div>
            <div className="flex justify-between items-center">
                <PageTitle title="Transactions" />

                <div className="flex gap-1">
                    <button className="primary-outlined-btn">Deposit</button>
                    <button className="primary-contained-btn" onClick={() => setShowTransferFundsModal(true)}>Transfer</button>
                </div>
            </div>
            <Table columns={columns} dataSource={data} className="mt-2" />

            {showTransferFundsModal && <TransferFundsModal
                showTransferFundsModal={showTransferFundsModal}
                setShowTransferFundsModal={setShowTransferFundsModal}
            />}
        </div>
    )
}

export default Transactions