import { useQuery } from "@tanstack/react-query";

import { FaEdit, FaPause, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const AllDonations = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()
    const { data: donations = [], refetch } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosPublic.get('/donation-camps')
            return res.data
        }
    })
    //pause handle
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

    //delete a donation
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await axiosSecure.delete(`${import.meta.env.VITE_API_URL}/donation-camp/${id}`)
                    console.log(data)
                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                    refetch()
                }
                catch (err) {
                    toast.error(err.message)
                }

            }
        })
    }

    return (
        <div>
            <div className="container mx-auto px-4 h-screen my-12">
                <h2 className="text-2xl font-bold mb-4">All Donations</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donated Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Donated Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donation Last Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {donations.map((donation, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{donation.petName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${(parseFloat(donation.donatedAmount) || 0).toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${(parseFloat(donation.maxDonationAmount) || 0).toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{donation.lastDate || "N/A"}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <Link to={`/dashboard/updateCampaign/${donation._id}`}>
                                            <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                <FaEdit className="text-2xl"></FaEdit>
                                            </button>
                                        </Link>
                                        {donation.pause ? (
                                            <button onClick={() => handleUnpause(donation._id)} className="text-green-600 hover:text-green-900 focus:outline-none">
                                                <FaPlay className="text-2xl"></FaPlay>
                                            </button>
                                        ) : (
                                            <button onClick={() => handlePause(donation._id)} className="text-red-600 hover:text-red-900 focus:outline-none">
                                                <FaPause className="text-2xl"></FaPause>
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(donation._id)} className="text-red-600 hover:text-red-900">
                                            <MdDelete className='text-2xl ml-4'></MdDelete>
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDonations;