import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-toastify";

const SignUp = () => {
    const [error, setError] = useState('');
    const axiosPublic = useAxiosPublic();
    const { createUser, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { fullName, email, password } = data;
        const imageFile = data.image[0];

        // password validation
        if (password.length < 6) {
            setError("Password should be at least 6 characters or longer");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError("Must have an Uppercase letter in the password");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError("Must have a Lowercase letter in the password");
            return;
        }
        setError("");

        try {
            // upload image
            const formData = new FormData();
            formData.append("image", imageFile);

            const uploadRes = await axiosPublic.post(imageHostingApi, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const imageUrl = uploadRes.data.data.display_url;

            // create user
            const userCredential = await createUser(email, password);
            const user = userCredential.user;

            // update profile in Firebase
            await updateUser(fullName, imageUrl);

            // save user in DB
            const userInfo = {
                email: user.email,
                name: fullName,
                image: imageUrl,
                role: "user",
            };
            await axiosPublic.post("/users", userInfo);

            toast.success("Sign Up Successful!");
            navigate("/login");
        } catch (err) {
            setError("Something went wrong");
            console.error(err);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center my-20">
                <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-[#fffaf7] text-gray-800">
                    <h1 className="text-2xl font-bold text-center">Register</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-1 text-sm">
                            <label className="block text-gray-600">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                placeholder="email"
                                className="w-full px-4 py-3 rounded-md border-gray-300 bg-white text-gray-800 focus:border-[#F07C3D]"
                            />
                            {errors.email && <span className="text-red-600">This field is required</span>}
                        </div>

                        <div className="space-y-1 text-sm">
                            <label className="block text-gray-600">Your Name</label>
                            <input
                                type="text"
                                {...register("fullName", { required: true })}
                                placeholder="Your name"
                                className="w-full px-4 py-3 rounded-md border-gray-300 bg-white text-gray-800 focus:border-[#F07C3D]"
                            />
                            {errors.fullName && <span className="text-red-600">This field is required</span>}
                        </div>

                        <div className="space-y-1 text-sm">
                            <label className="block text-gray-600">Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("image", { required: true })}
                                className="w-full px-4 py-3 rounded-md border-gray-300 bg-white text-gray-800 focus:border-[#F07C3D]"
                            />
                            {errors.image && <span className="text-red-600">This field is required</span>}
                        </div>

                        <div className="space-y-1 text-sm">
                            <label className="block text-gray-600">Password</label>
                            <input
                                type="password"
                                {...register("password", { required: true })}
                                placeholder="Password"
                                className="w-full px-4 py-3 rounded-md border-gray-300 bg-white text-gray-800 focus:border-[#F07C3D]"
                            />
                            {errors.password && <span className="text-red-600">This field is required</span>}
                        </div>

                        {error && <p className="text-red-600 text-center mb-2">{error}</p>}

                        <input
                            className="block w-full p-3 text-center rounded-sm text-white bg-[#F07C3D] cursor-pointer"
                            type="submit"
                            value="Sign Up"
                        />
                    </form>

                    <div className="flex items-center pt-4 space-x-1">
                        <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                        <p className="px-3 text-sm text-gray-600">+</p>
                        <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                    </div>

                    <p className="text-xs text-center sm:px-6 text-gray-600">
                        Already have an account?
                        <Link className="text-[#F07C3D] font-bold" to="/login"> Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
