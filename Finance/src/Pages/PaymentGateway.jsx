import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogClose,
} from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import axios from "axios";

const stocks = [
    {
        id: 1,
        name: "Tech Corp",
        symbol: "TECH",
        price: "$150.00",
        quantity: 10,
        change: "+2.5%",
        imageSrc: "/api/placeholder/32/32",
        imageAlt: "Tech Corp logo",
    },
    {
        id: 2,
        name: "Green Energy Ltd",
        symbol: "GRN",
        price: "$75.50",
        quantity: 15,
        change: "-1.2%",
        imageSrc: "/api/placeholder/32/32",
        imageAlt: "Green Energy Ltd logo",
    },
];

export default function StockPurchaseUI() {
    const [open, setOpen] = useState(true); // Default: closed
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [paymentError, setPaymentError] = useState(""); // Payment error state

    const handlePayment = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setPaymentError("");
  
      try {
          // Step 1: Make a request to create the payment order
          const response = await axios.post(
              `http://localhost:3000/api/v1/payment`,
              { amount: 1000 }, // Amount in rupees
              {
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${JSON.parse(
                          localStorage.getItem("accessToken")
                      )}`,
                  },
              }
          );
  
          // Step 2: Check if the backend response was successful
          if (response.data.success) {
              let options = {
                  key: response.data.key_id,
                  amount: response.data.amount,
                  currency: "INR",
                  name: "Stock Merchant",
                  description: "Buying/Selling Stock",
                  image: "/your_logo.png", // Optional logo
                  handler: function (paymentResponse) {
                      alert(`Payment successful! Payment ID: ${paymentResponse.razorpay_payment_id}`);
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
                  // Step 3: Handle payment closure or cancellation
                  onClose: function () {
                      console.log("Payment popup closed by the user.");
                      setPaymentError("Payment was not completed.");
                  },
              };
  
              // Step 4: Open Razorpay payment form
              const rzp = new window.Razorpay(options);
              rzp.open();
          } else {
              // Handle failure response from the backend
              setPaymentError(response.data.message || "Payment order creation failed");
          }
      } catch (error) {
          // Log error details for debugging
          console.error("Error creating Razorpay order:", error);
          setPaymentError("There was an issue processing the payment. Please try again.");
      } finally {
          // Reset loading state after the process is complete
          setIsLoading(false);
      }
  };
  

    return (
        <div>
            {/* Buy Button */}
            <button
                onClick={() => setOpen(true)}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
                Buy Stocks
            </button>

            {/* Popup Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                {/* Backdrop */}
                <div className="fixed inset-0 bg-black/30" />

                {/* Dialog Content */}
                <DialogContent className="fixed inset-0 flex items-center justify-center px-4 sm:px-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg sm:max-w-md w-full">
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-lg font-medium text-gray-900">
                                Stock Portfolio
                            </DialogTitle>
                            <DialogClose asChild>
                                <button
                                    type="button"
                                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="sr-only">Close panel</span>
                                    <X className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </DialogClose>
                        </div>

                        <div className="mt-8">
                            <div className="flow-root">
                                <ul
                                    role="list"
                                    className="-my-6 divide-y divide-gray-200"
                                >
                                    {stocks.map((stock) => (
                                        <li
                                            key={stock.id}
                                            className="flex py-6"
                                        >
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
                                                        <p className="ml-4">
                                                            {stock.price}
                                                        </p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {stock.symbol}
                                                    </p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <p className="text-gray-500">
                                                        Qty {stock.quantity}
                                                    </p>
                                                    <p
                                                        className={`font-medium ${
                                                            stock.change.startsWith(
                                                                "+"
                                                            )
                                                                ? "text-green-600"
                                                                : "text-red-600"
                                                        }`}
                                                    >
                                                        {stock.change}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 border-t border-gray-200 pt-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Total Value</p>
                                <p>$3,625.00</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">
                                Values are updated in real-time based on market
                                prices.
                            </p>
                            <div className="mt-6">
                                <button
                                    onClick={handlePayment}
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? "Processing..."
                                        : "Purchase Stocks"}
                                </button>
                            </div>

                            {/* Error Message */}
                            {paymentError && (
                                <div className="mt-4 text-sm text-red-600">
                                    {paymentError}
                                </div>
                            )}

                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                    or{" "}
                                    <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() => setOpen(false)}
                                    >
                                        Continue to Dashboard
                                        <span aria-hidden="true"> &rarr;</span>
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
