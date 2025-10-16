import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";

const CreateDonationCampaign = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // Upload image to imgbb
            const formData = new FormData();
            formData.append("image", data.petPicture[0]);
            const imgbbApiKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
            const imgbbResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData);

            if (imgbbResponse.data.success) {
                const imageUrl = imgbbResponse.data.data.url;

                // Prepare donation campaign data
                const campaignData = {
                    email: user.email,
                    petPicture: imageUrl,
                    petName: data.petName,
                    maxDonationAmount: data.maxDonationAmount,
                    lastDate: data.lastDate,
                    shortDescription: data.shortDescription,
                    longDescription: data.longDescription,
                    dateAdded: new Date().toLocaleDateString('en-US'),
                    donatedAmount: parseInt(0)
                };

                // Send data to backend
                await axiosSecure.post('/donation-camp', campaignData);
                Swal.fire({
                    title: "Success!",
                    text: "Donation campaign created successfully!",
                    icon: "success",
                    confirmButtonText: "OK"
                });
                reset();
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Image upload failed.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        } catch (error) {
            console.error("Error creating donation campaign", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to create donation campaign.",
                icon: "error",
                confirmButtonText: "OK"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl mb-4 text-center font-bold">Create Donation Campaign</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Pet Picture</label>
                    <input id="image" type="file" {...register("petPicture", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    {errors.petPicture && <p className="text-red-500 text-xs italic">Pet picture is required.</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petName">Pet Name</label>
                    <input id="petName" type="text" {...register("petName", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Pet name" />
                    {errors.petName && <p className="text-red-500 text-xs italic">Pet name is required.</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxDonation">Maximum Donation Amount</label>
                    <input id="maxDonation" type="number" {...register("maxDonationAmount", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter maximum donation amount" />
                    {errors.maxDonationAmount && <p className="text-red-500 text-xs italic">Maximum donation amount is required.</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastDate">Last Date of Donation</label>
                    <input id="lastDate" type="date" {...register("lastDate", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    {errors.lastDate && <p className="text-red-500 text-xs italic">Last date of donation is required.</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shortDescription">Short Description</label>
                    <input id="shortDescription" type="text" {...register("shortDescription", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter short description" />
                    {errors.shortDescription && <p className="text-red-500 text-xs italic">Short description is required.</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longDescription">Long Description</label>
                    <textarea id="longDescription" {...register("longDescription", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter long description" rows="4"></textarea>
                    {errors.longDescription && <p className="text-red-500 text-xs italic">Long description is required.</p>}
                </div>
                <div className="flex items-center justify-center">
                    <input className="w-full bg-[#F07C3D] text-white font-bold py-2 px-4 rounded hover:bg-[#f3732e] cursor-pointer" type="submit" value={loading ? "Submitting..." : "Submit"} disabled={loading} />
                </div>
            </form>
        </div>
    );
};

export default CreateDonationCampaign;
