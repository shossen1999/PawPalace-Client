import { useQuery } from "@tanstack/react-query";
import swal from "sweetalert";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";

const Users = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleDeleteUser = user => {
        swal({
            title: "Are you sure you want to delete this user?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    const res = await axiosSecure.delete(`/users/${user._id}`);
                    if (res.data.deletedCount > 0) {
                        swal("Deleted Successfully!", {
                            icon: "success",
                        });
                        refetch();
                    }
                }
            });
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl text-center font-semibold">All Users</h2>
            <div>
                <h2 className="text-xl mb-8">Total Users: {users.length}</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-[#F07C3D] text-white uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">#</th>
                                <th className="py-3 px-6 text-left">Profile Picture</th>
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Roll</th>
                                <th className="py-3 px-6 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800 text-sm font-light">
                            {users.map((user, index) => (
                                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{index + 1}</td>
                                    <td className="py-3 px-6 text-left">
                                        <img
                                            src={user.image}
                                            alt={user.displayName}
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </td>
                                    <td className="py-3 px-6 text-left">{user.name}</td>
                                    <td className="py-3 px-6 text-left">{user.email}</td>
                                    <td className="py-3 px-6 text-left">
                                        {user.role === 'admin' ? "Admin" : (
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="bg-[#F07C3D] text-white px-4 py-2 rounded-md"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {user.role === 'admin' ? "Admin" : (
                                            <button
                                                onClick={() => handleDeleteUser(user)}
                                                className="btn btn-ghost btn-lg"
                                            >
                                              <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;