import React from "react";
import axios from "axios";

const stocks = [
    {
        id: 1,
        name: "Tech Corp",
        symbol: "TECH",
        price: "$150.00",
        quantity: 10,
        change: "+2.5%",
        imageSrc: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/909970/capsule_616x353.jpg?t=1564073964",
        imageAlt: "Tech Corp logo",
    },
    {
        id: 2,
        name: "Green Energy Ltd",
        symbol: "GRN",
        price: "$75.50",
        quantity: 15,
        change: "-1.2%",
        imageSrc: "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2023/05/adani-1682961565.jpg",
        imageAlt: "Green Energy Ltd logo",
    },
];


function PaymentPage() {

    const backUrl = import.meta.env.VITE_APP_URL;


    const handlePayment = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${backUrl}/api/v1/payment`,
                { amount: 225 }, 
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
                    },
                }
            );
            if (response.data.success) {
                let options = {
                    key: response.data.key_id,
                    amount: response.data.amount,
                    currency: "INR",
                    name: "Stock Merchant",
                    description: "Buying/Selling Stock",
                    image: "/your_logo.png",
                    handler: function (response) {
                        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                    },
                    prefill: {
                        name: "Pavan Rasal",
                        email: "pavan@razorpay.com",
                    },
                    notes: {
                        address: "Stock Exchange",
                    },
                    theme: {
                        color: "#1A202C", // Dark theme color
                    },
                };

                let rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                alert(response.data.message || "Payment order creation failed");
            }
        } catch (error) {
            console.error("Error creating Razorpay order:", error);
            alert("There was an issue processing the payment. Please try again.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Stock Portfolio</h1>

            <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                    {stocks.map((stock) => (
                        <li key={stock.id} className="flex py-6">
                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-gray-200">
                                <img
                                    src={stock.imageSrc}
                                    alt={stock.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{stock.name}</h3>
                                        <p className="ml-4">{stock.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{stock.symbol}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty {stock.quantity}</p>
                                    <p className={`font-medium ${stock.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                                        {stock.change}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total Value</p>
                    <p>$3,625.00</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Values are updated in real-time based on market prices.</p>

                <div className="mt-6">
                    <button
                        onClick={handlePayment}
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                        Buy Stocks
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;
