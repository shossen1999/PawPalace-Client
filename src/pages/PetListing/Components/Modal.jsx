import { useState, useContext } from "react";

import PropTypes from 'prop-types';

import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Modal = ({ pet, setIsModalOpen }) => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [adopterPhone, setAdopterPhone] = useState("");
    const [adopterAddress, setAdopterAddress] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const adoptionData = {
            petId: pet._id,
            petName: pet.pet_name,
            petImage: pet.pet_image,
            ownerEmail: pet.email,
            userName: user.displayName,
            adopterEmail: user.email,
            adopterPhone,
            adopterAddress,
        };

        try {
            const res = await axiosPublic.post('http://localhost:5000/adoption', adoptionData);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully requested to adopt the pet",
                    showConfirmButton: false,
                    timer: 1500
                  });
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Error submitting adoption request:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-3xl text-center font-bold mb-4">Adopt {pet.pet_name}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Pet Name</label>
                        <input type="text" value={pet.pet_name} disabled className="w-full mt-1 p-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">User Name</label>
                        <input type="text" value={user.displayName} disabled className="w-full mt-1 p-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" value={user.email} disabled className="w-full mt-1 p-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            value={adopterPhone}
                            onChange={(e) => setAdopterPhone(e.target.value)}
                            className="w-full mt-1 p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            value={adopterAddress}
                            onChange={(e) => setAdopterAddress(e.target.value)}
                            className="w-full mt-1 p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="mr-4 px-4 py-2 bg-gray-300 rounded">
                            Cancel
                        </button>
                        <input className="px-4 py-2 bg-[#F07C3D] text-white rounded cursor-pointer" type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

Modal.propTypes = {
    pet: PropTypes.object.isRequired,
    setIsModalOpen: PropTypes.func
}

export default Modal;