
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const DonatorsModal = ({ isOpen, onClose, postId }) => {
    const [donators, setDonators] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (isOpen && postId) {
            axiosSecure.get(`/donation-camps/donators/${postId}`)
                .then(response => {
                    setDonators(response.data);
                })
                .catch(error => {
                    console.error("Error fetching donators:", error);
                });
        }
    }, [isOpen, postId, axiosSecure]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-3xl">
                <div className="bg-gray-100 px-6 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Donators List
                            </h3>
                            <div className="mt-4">
                                {donators.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donated Amount</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {donators.map((donator, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{donator.email}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${donator.donatedAmount}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(donator.date).toLocaleDateString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-gray-600">No donators yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-6 py-3 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#F07C3D] text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
DonatorsModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    postId: PropTypes.object
}
export default DonatorsModal;