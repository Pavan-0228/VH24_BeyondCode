import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3000/api/v1/auth/user/${userId}`);
                setUserData(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg text-black">
            <h2 className="text-2xl font-bold mb-4">{userData.fullName}</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <p className="text-gray-700">
                    <strong>Username:</strong> {userData.username}
                </p>
                <p className="text-gray-700">
                    <strong>Email:</strong> {userData.email}
                </p>
                <p className="text-gray-700">
                    <strong>Investor Type:</strong> {userData.investorType}
                </p>
            </div>
            <h3 className="text-xl font-bold mb-4">Recommended Funds</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b">Fund Name</th>
                            <th className="py-2 px-4 border-b">Risk Level</th>
                            <th className="py-2 px-4 border-b">Expected Return</th>
                            <th className="py-2 px-4 border-b">Minimum Investment</th>
                            <th className="py-2 px-4 border-b">Recommended Duration</th>
                            <th className="py-2 px-4 border-b">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.funds.map((fund, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="py-2 px-4 border-b">{fund.fundName}</td>
                                <td className="py-2 px-4 border-b">{fund.riskLevel}</td>
                                <td className="py-2 px-4 border-b">{fund.expectedReturn}</td>
                                <td className="py-2 px-4 border-b">₹{fund.minimumInvestment}</td>
                                <td className="py-2 px-4 border-b">{fund.recommendedDuration}</td>
                                <td className="py-2 px-4 border-b">{fund.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserProfile;