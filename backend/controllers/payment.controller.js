import dotenv from "dotenv";
import Razorpay from "razorpay";

dotenv.config();

const { RAZORPAY_PAY_ID, RAZORPAY_PAY_SECRET } = process.env;

var instance = new Razorpay({
    key_id: RAZORPAY_PAY_ID,
    key_secret: RAZORPAY_PAY_SECRET,
    headers: {
        "X-Razorpay-Account": "P4dkEJex7TSeir",
    },
});

export const createOrder = async (req, res) => {
    const { amount } = req.body;

    const currency = "INR";

    try {
        const order = await instance.orders.create({
            amount: amount * 100,
            currency,
            receipt: "pavanrasal4@gmail.com",
        });

        return res.status(200).json({
            success: true,
            id: order.id,
            currency: order.currency,
            amount: order.amount,
            key_id: RAZORPAY_PAY_ID,
            message: "Order created successfully",
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
