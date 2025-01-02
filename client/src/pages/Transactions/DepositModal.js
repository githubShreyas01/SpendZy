import { Modal, Form, message } from "antd";
import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { DepositFunds } from "../../apicalls/transactions";

function DepositModal({
    showDepositModal,
    setShowDepositModal,
    reloadData
}) {

    const [form] = Form.useForm();
    //const dispatch = useDispatch();
    const onToken = async (token) => {
        try {
            //dispatch(ShowLoading());
            const response = await DepositFunds({ token, amount: form.getFieldValue("amount") });
            // dispatch(HideLoading());
            if (response.success) {
                reloadData();
                setShowDepositModal(false);
                message.success(response.message);
            }else{
                message.error(response.message);
            }
        } catch (error) {
            // dispatch(HideLoading());
            message.error(error.message);

        }
    }

    return (
        <div>
            <Modal
                title="Deposit"
                open={showDepositModal}
                onCancel={() => setShowDepositModal(false)}
                footer={null}
            >
                <div className="flex-col gap-1">
                    <Form
                        layout="vertical"
                        form={form}
                    >
                        <Form.Item
                            label="Amount"
                            name="amount"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input amount",
                                },
                            ]}
                        >
                            <input type="number" />
                        </Form.Item>

                        <div className="flex justify-end gap-1">
                            <button className="primary-outlined-btn">Cancel</button>
                            <StripeCheckout
                                token={onToken}
                                currency="INR"
                                amount={
                                    form.getFieldValue("amount") * 100
                                }
                                stripeKey="pk_test_51QcNnYGG88qGPv1jNwRsjheGnBpmUiZ2FAMOkyeRtuds3SWW2cWq5cAN0bdmY4VqvRr4d7lZeVPMmOQtI7dwDX1U00nr8h6m6X"
                            >
                                <button className="primary-contained-btn">Deposit</button>
                            </StripeCheckout>
                        </div>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default DepositModal;