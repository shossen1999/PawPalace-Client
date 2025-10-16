import { useContext, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../Provider/AuthProvider";

const AdoptionRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [loadingId, setLoadingId] = useState(null);

  // Fetch adoption requests
  const {
    data: adoptionRequests = [],
    refetch,
  } = useQuery({
    queryKey: ["user-adoption-requests", user?.email],
    queryFn: async () => {
      const res = await axiosPublic(`/adoption-requests/${user?.email}`);
      return res.data;
    },
  });

  // ✅ Accept mutation
  const acceptMutation = useMutation({
    mutationFn: async (id) => {
      return axiosPublic.put(`/adoption/accept/${id}`);
    },
    onMutate: (id) => {
      setLoadingId(id);
    },
    onSuccess: (res, id) => {
      if (res.data.success) {
        Swal.fire({
          title: "Accepted!",
          text: "The adoption request has been accepted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        // Optimistic UI update
        refetch();
      }
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Failed to accept the request.",
        icon: "error",
      });
    },
    onSettled: () => {
      setLoadingId(null);
    },
  });

  // ✅ Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return axiosPublic.delete(
        `${import.meta.env.VITE_API_URL}/adoption/reject/${id}`
      );
    },
    onSuccess: (res, id) => {
      if (res.data.deletedCount > 0) {
        Swal.fire({
          title: "Rejected!",
          text: "The adoption request has been rejected.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        // Optimistic UI update
        refetch();
      }
    },
    onError: (err) => {
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
      });
    },
  });

  // Handle Accept
  const handleAccept = (id) => {
    acceptMutation.mutate(id);
  };

  // Handle Reject
  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(id);
      }
    });
  };

  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Pet Image</th>
              <th className="py-3 px-4 text-left">Pet Name</th>
              <th className="py-3 px-4 text-left">Requester Name</th>
              <th className="py-3 px-4 text-left">Requester Email</th>
              <th className="py-3 px-4 text-left">Phone Number</th>
              <th className="py-3 px-4 text-left">Location</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {adoptionRequests.map((request) => (
              <tr
                key={request._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <img
                    src={request.petImage}
                    alt={request.petName}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="py-3 px-4">{request.petName}</td>
                <td className="py-3 px-4">{request.userName}</td>
                <td className="py-3 px-4">{request.adopterEmail}</td>
                <td className="py-3 px-4">{request.adopterPhone}</td>
                <td className="py-3 px-4">{request.adopterAddress}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => handleAccept(request._id)}
                    disabled={
                      request.adopted ||
                      loadingId === request._id ||
                      acceptMutation.isLoading
                    }
                    className={`px-4 py-2 rounded-md text-white transition duration-300
                      ${
                        request.adopted
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                  >
                    {loadingId === request._id
                      ? "Accepting..."
                      : request.adopted
                      ? "Adopted"
                      : "Accept"}
                  </button>

                  <button
                    onClick={() => handleReject(request._id)}
                    disabled={request.adopted}
                    className={`px-4 py-2 rounded-md text-white transition duration-300
                      ${
                        request.adopted
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdoptionRequest;
