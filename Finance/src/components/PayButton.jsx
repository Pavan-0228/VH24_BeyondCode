import axios from "axios";
import React from "react";

function PayButton() {
    const handlePayment = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `http://localhost:3000/api/v1/payment`,
                {
                    amount: 1000, // Amount in rupees
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem("accessToken")
                        )}`,
                    },
                }
            );

            console.log(response.data);

            if (response.data.success) {
                let options = {
                    key: response.data.key_id, // Enter the Key ID generated from the Dashboard
                    amount: response.data.amount, // Amount in paisa
                    currency: "INR", // Currency code
                    name: "Merchant Name",
                    description: "Purchase Description",
                    image: "/your_logo.png",
                    handler: function (response) {
                        alert(response.razorpay_payment_id);
                    },
                    prefill: {
                        name: "Harshil Mathur",
                        email: "harshil@razorpay.com",
                    },
                    notes: {
                        address: "Hello World",
                    },
                    theme: {
                        color: "#F37254",
                    },
                };

                let rzp = new window.Razorpay(options); // Use window.Razorpay to access the Razorpay instance
                rzp.open();
            } else {
                alert(response.data.message || "Payment order creation failed");
            }
        } catch (error) {
            console.error("Error creating Razorpay order:", error);
            alert(
                "There was an issue processing the payment. Please try again."
            );
        }
    };

    return (
        <div className="flex w-full h-screen justify-center items-center">
            <button onClick={handlePayment} className="btn btn-primary">
                Pay Now
            </button>
        </div>
    );
}

export default PayButton;
