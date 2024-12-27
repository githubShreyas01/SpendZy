import React from "react";
import { Form, Modal } from "antd";
import { useDispatch } from "react-redux";
import { VerifyAccount } from "../../apicalls/transactions";
//import {ShowLoading, HideLoading} from "../../redux/loaderSlice"

function TransferFundsModal({
    showTransferFundsModal,
    setShowTransferFundsModal,
    reloadData
}) {
    const [isVerified, setIsVerified] = React.useState('');
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const verifyAccount = async () => {
        try {
            //dispatch(ShowLoading());
            const response = await VerifyAccount({
                receiver: form.getFieldValue("receiver")
            });
            //dispatch(HideLoading())
            if (response.success) {
                setIsVerified('true');
            } else {
                setIsVerified('false');
            }
        } catch (error) {
            //dispatch(HideLoading());
            setIsVerified('false');
        }
    }

    return (
        <div>
            <Modal
                title="Transfer Funds"
                open={showTransferFundsModal}
                onCancel={() => setShowTransferFundsModal(false)}
                onClose={() => setShowTransferFundsModal(false)}
                footer={null}
            >
                <Form layout="vertical" form={form}>
                    <div className="flex gap-2 items-center">
                        <Form.Item label="Account Number" name="receiver" className="w-100">
                            <input type="text" />
                        </Form.Item>
                        <button className="primary-contained-btn mt-1" type="button" onClick={verifyAccount}> VERIFY</button>
                    </div>

                    {isVerified === "true" && (
                        <div className="success-bg">
                            Account Verified Successfully!
                        </div>
                    )}

                    {isVerified === "false" && (
                        <div className="error-bg">
                            Invalid Account!
                        </div>
                    )}

                    <Form.Item label="Amount" name="amount">
                        <input type="text" />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <textarea type="text" />
                    </Form.Item>

                    <div className="flex justify-end gap-1">
                        <button className="primary-outlined-btn">Cancel</button>
                        <button className="primary-contained-btn">Transfer</button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default TransferFundsModal;