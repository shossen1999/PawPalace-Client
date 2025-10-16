
import { useLoaderData } from "react-router-dom";
import DonateModal from "./DonateModal";
import { useState } from "react";

const DonationDetails = () => {
    const donation = useLoaderData()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isPaused = donation.pause;

    const handleDonation = () => {
        setIsModalOpen(true);
    }

    return (
        <div className="bg-gray-100 py-20">
            <div className="max-w-4xl mx-auto">
                <div key={donation._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img src={donation.petPicture} alt={donation.petName} className="w-full h-72 object-cover" />
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-2">{donation.petName}</h2>
                        <p className="text-gray-600 mb-2"><span className="font-bold">Short Description:</span> {donation.shortDescription}</p>
                        <p className="text-gray-600 mb-2"><span className="font-bold">Max Donation Amount:</span> ${donation.maxDonationAmount}</p>
                        <p className="text-gray-600 mb-2"><span className="font-bold">Donated Amount:</span> ${donation.donatedAmount}</p>
                        <p className="text-gray-600 mb-2"><span className="font-bold">Max Donation Amount:</span> {donation.longDescription}</p>
                        {/* Displaying Date */}
                        <p className="text-gray-600 mb-4"><span className="font-bold">Last Donation Date:</span> {donation.lastDate}</p>
                        {
                            !isPaused ? <button onClick={handleDonation} className="block w-full bg-[#F07C3D] text-white py-2 px-4 rounded hover:bg-[#ee6c26]">
                            Donate Now
                        </button> : <button disabled onClick={handleDonation} className="block w-full bg-slate-300 text-white py-2 px-4 rounded">
                            Donate Has Been Paused by Owner
                        </button>
                        }
                    </div>
                </div>
            </div>
            {isModalOpen && <DonateModal donation={donation} setIsModalOpen={setIsModalOpen}></DonateModal>}
        </div>
    );
};

export default DonationDetails;
