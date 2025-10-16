import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";

import { FaEdit, FaPause, FaPlay } from "react-icons/fa";
import { Progress } from "flowbite-react";

import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DonatorsModal from "./DonatorsModal";

const MyDonationCampaigns = () => {
     const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const { data: donations = [], refetch } = useQuery({
        queryKey: ['donations', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donation-camps/${user.email}`)
            return res.data
        }
    })

    const handlePause = async (id) => {
        try {
            await axiosSecure.patch(`/donation-camp/pause/${id}`);
            console.log('paused successful')
            refetch()
        }
        catch (err) {
            console.error('Failed to pause', err)
        }
    }

    const handleUnpause = async (id) => {
        try {
            await axiosSecure.patch(`/donation-camp/unpause/${id}`);
            console.log('unpaused successful')
            refetch()
        }
        catch (err) {
            console.error('Failed to unpause', err)
        }
    }

    const openModal = (postId) => {
        setSelectedPostId(postId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPostId(null);
    };
   

    return (
       <div className="mx-auto container mt-12">
            <h2 className="text-3xl font-medium mb-12">My Donation Campaigns</h2>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-[#F07C3D]">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Pet Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Maximum Donation Amount
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Donation Progress
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Edit
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Pause
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Donators
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {donations.map((donation, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{donation.petName}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{donation.maxDonation}$</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="w-full bg-gray-200 rounded-full">
                                                    <Progress progress={(donation.donatedAmount / donation.maxDonation) * 100} size="lg" labelProgress />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link to={`/dashboard/updateCampaign/${donation._id}`}>
                                                    <button className="text-indigo-600 hover:text-indigo-900">
                                                        <FaEdit className="text-2xl"></FaEdit>
                                                    </button>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {donation.pause ? (
                                                    <button onClick={() => handleUnpause(donation._id)} className="text-green-600 hover:text-green-900 focus:outline-none">
                                                        <FaPlay className="text-2xl"></FaPlay>
                                                    </button>
                                                ) : (
                                                    <button onClick={() => handlePause(donation._id)} className="text-red-600 hover:text-red-900 focus:outline-none">
                                                        <FaPause className="text-2xl"></FaPause>
                                                    </button>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => openModal(donation._id)}
                                                    className="text-white bg-[#F07C3D] px-2 py-2 rounded-sm hover:text-indigo-900 focus:outline-none">View Donators</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <DonatorsModal isOpen={isModalOpen} onClose={closeModal} postId={selectedPostId}></DonatorsModal>
        </div>
    );
};

export default MyDonationCampaigns;
