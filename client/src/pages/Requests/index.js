import React from "react";
import { Tabs } from "antd";
import PageTitle from "../../components/PageTitle";
import NewRequestModal from "./NewRequestModal";

const { TabPane } = Tabs;
function Requests() {
    const [data, setData] = React.useState([]);
    const [showNewRequestModal, setShowNewRequestModal] = React.useState([]);

    const columns = [
        {
            title: "Request Id",
            dataIndex: "_id",
        },
        {
            title: "User",
            dataIndex: "user",
        },
        {
            title: "Amount",
            dataIndex: "amount",
        },
        {
            title: "Date",
            dataIndex: "date",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
    ]
    return (
        <div>
            <div className="flex justify-between">
                <PageTitle title="requests" />
                <button
                    className="primary-outlined-btn"
                    onClick={() => setShowNewRequestModal(true)}
                >Request Funds</button>
            </div>

            <Tabs defaultActiveKey="1">
                <TabPane tab="Sent" key="1">
                    Sent
                </TabPane>
                <TabPane tab="Received" key="2">
                    Received
                </TabPane>
            </Tabs>

            {showNewRequestModal && <NewRequestModal
                showNewRequestModal={showNewRequestModal}
                setShowNewRequestModal={setShowNewRequestModal}
            />}
        </div>
    )
}

export default Requests;