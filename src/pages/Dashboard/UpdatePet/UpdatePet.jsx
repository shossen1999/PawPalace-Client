import Select from 'react-select';
import { Controller, useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useLoaderData } from 'react-router-dom';

const petCategories = [
    { value: 'Dog', label: 'Dog' },
    { value: 'Cat', label: 'Cat' },
    { value: 'Bird', label: 'Bird' },
    { value: 'Rabbit', label: 'Rabbit' },
    { value: 'Fish', label: 'Fish' }
];


const UpdatePet = () => {
    const { _id,pet_image, pet_name, pet_age, pet_category, pet_location, short_description, long_description } = useLoaderData()
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        if (!user) {
            Swal.fire("Error", "You must be logged in to add a pet.", "error");
            return;
        }

        // ✅ Make sure category is properly set
        if (!data.category) {
            Swal.fire("Error", "Please select a category.", "error");
            return;
        }

        // ✅ Create pet object
        const petData = {
            email: user.email,
            pet_image: data.imageUrl,
            pet_name: data.name,
            pet_age: parseInt(data.age),
            pet_category: data.category, 
            pet_location: data.location,
            short_description: data.shortDescription,
            long_description: data.longDescription,
           
        };

        console.log("Submitting Pet Data:", petData); // ✅ Debugging Output

        try {
            const petRes = await axiosPublic.patch(`/updatePet/${_id}`, petData);
            console.log("API Response:", petRes.data); // ✅ Debugging Output

            if (petRes.data.modifiedCount > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.name} is updated.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                throw new Error("Pet update failed.");
            }
        } catch (error) {
            console.error("Error update pet data:", error);
            Swal.fire("Error", "Failed to update pet. Try again later.", "error");
        }
    };
    return (
        <div className="flex items-center justify-center w-full h-screen">
        <div>
            <h2 className="text-4xl font-semibold">Update A Pet</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full p-6 bg-white shadow-lg rounded-lg">

            <div className="grid grid-cols-2 gap-4">
                {/* Pet Image URL */}
                <div className="col-span-2">
                            <label className="block text-gray-700 font-bold mb-1">Pet Image URL</label>
                            <input type="text" {...register('imageUrl', { required: 'Pet image URL is required' })} 
                            defaultValue={pet_image}
                            className="w-full px-3 py-1.5 border rounded" />
                            {errors.imageUrl && <p className="text-red-500 text-xs italic">{errors.imageUrl.message}</p>}
                        </div>

                <div >
                    <label className="block text-gray-700 font-bold mb-2">Pet Name</label>
                    <input {...register('name', { required: 'Pet name is required' })}
                        defaultValue={pet_name}
                        className="w-full px-3 py-2 border rounded" />
                    {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
                </div>

                <div >
                    <label className="block text-gray-700 font-bold mb-2">Pet Age</label>
                    <input type="number" {...register('age', { required: 'Pet age is required' })}
                        defaultValue={pet_age}
                        className="w-full px-3 py-2 border rounded" />
                    {errors.age && <p className="text-red-500 text-xs italic">{errors.age.message}</p>}
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700 font-bold mb-2">Pet Category</label>
                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: 'Pet category is required' }}
                        defaultValue={pet_category}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={petCategories}
                                className="w-full"
                                onChange={(option) => field.onChange(option.value)}
                                value={petCategories.find(option => option.value === field.value)}
                            />
                        )}
                    />
                    {errors.category && <p className="text-red-500 text-xs italic">{errors.category.message}</p>}
                </div>

                <div >
                    <label className="block text-gray-700 font-bold mb-2">Pet Location</label>
                    <input {...register('location', { required: 'Pet location is required' })}
                        defaultValue={pet_location}
                        className="w-full px-3 py-2 border rounded" />
                    {errors.location && <p className="text-red-500 text-xs italic">{errors.location.message}</p>}
                </div>

                <div >
                    <label className="block text-gray-700 font-bold mb-2">Short Description</label>
                    <input {...register('shortDescription', { required: 'Short description is required' })}
                        defaultValue={short_description}
                        className="w-full px-3 py-2 border rounded" />
                    {errors.shortDescription && <p className="text-red-500 text-xs italic">{errors.shortDescription.message}</p>}
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700 font-bold mb-2">Long Description</label>
                    <textarea {...register('longDescription', { required: 'Long description is required' })}
                        defaultValue={long_description}
                        className="w-full px-3 py-2 border rounded" />
                    {errors.longDescription && <p className="text-red-500 text-xs italic">{errors.longDescription.message}</p>}
                </div>

            </div>
                 
                <button type="submit" className="w-full bg-[#F07C3D] text-white font-bold py-2 px-4 rounded hover:bg-[#f3732e]">Submit</button>
            </form>
        </div>
    </div>
    );
};

export default UpdatePet;