import React from "react";
import { Shield, Gauge } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const RiskAssessmentResult = ({ showResult, riskCategory, totalScore }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    if (!showResult) return null;

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="w-full max-w-2xl bg-gray-800 shadow-xl rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#753efc] to-[#9161fc] text-white p-6">
                    <div className="flex items-center space-x-4">
                        <Shield size={32} />
                        <h2 className="text-2xl font-bold">
                            Your Risk Assessment Result
                        </h2>
                    </div>
                </div>
                <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-semibold text-gray-200">
                            {riskCategory.investorType}
                        </h3>
                        <div className="bg-[#753efc] text-white rounded-full px-4 py-2 text-sm font-medium">
                            Score: {totalScore}
                        </div>
                    </div>
                    <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                        {riskCategory.description}
                    </p>
                    <div className="bg-gray-700 rounded-lg p-6 flex items-center space-x-4">
                        <Gauge size={24} className="text-[#753efc]" />
                        <p className="text-gray-300">
                            Your risk tolerance is aligned with a{" "}
                            {riskCategory.investorType.toLowerCase()} investment
                            strategy.
                        </p>
                    </div>

                    {/* Navigation Button to Dashboard */}
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => navigate('/dashboard')} // Navigate to dashboard
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiskAssessmentResult;
