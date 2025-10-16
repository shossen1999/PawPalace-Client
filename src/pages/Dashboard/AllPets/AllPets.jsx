import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { MdDelete, MdEditSquare } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllPets = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // Pending pets for admin approval
  const { data: pendingPets = [], refetch: refetchPending } = useQuery({
    queryKey: ["pendingPets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pets/pending");
      return res.data;
    },
  });

  // Approved pets (optional to display alongside pending)
  const { data: approvedPets = [], refetch: refetchApproved } = useQuery({
    queryKey: ["approvedPets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/pets");
      return res.data;
    },
  });

  const refetchAll = () => {
    refetchPending();
    refetchApproved();
  };

  // Delete pet
  const handleDelete = (petId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the pet.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(`/pet/${petId}`);
          if (data.deletedCount > 0) {
            Swal.fire("Deleted!", "The pet has been deleted.", "success");
          }
          refetchAll();
        } catch (err) {
          toast.error(err.message);
        }
      }
    });
  };

  // Admin approve / reject
  const handleApprove = async (id) => {
    try {
      const { data } = await axiosSecure.put(`/pet/approve/${id}`);
      if (data?.success) {
        Swal.fire("Approved!", "Pet is now visible publicly.", "success");
        refetchAll();
      }
    } catch (e) {
      console.error(e);
      Swal.fire("Error", "Failed to approve pet.", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      const { data } = await axiosSecure.put(`/pet/reject/${id}`);
      if (data?.success) {
        Swal.fire("Rejected!", "Pet has been rejected.", "success");
        refetchAll();
      }
    } catch (e) {
      console.error(e);
      Swal.fire("Error", "Failed to reject pet.", "error");
    }
  };

  // Toggle adoption (admin)
  const handleAdoptionStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.put(`/pet/toggleAdoption/${id}`, { adopted: newStatus });
      refetchAll();
    } catch (error) {
      console.error("Error updating pet status:", error);
      toast.error("Failed to toggle adoption status");
    }
  };

  const Row = ({ pet, isPendingTable }) => (
    <tr key={pet._id}>
      <td className="px-6 py-4 whitespace-nowrap">{pet.pet_name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{pet.pet_age}</td>
      <td className="px-6 py-4 whitespace-nowrap">{pet.pet_category}</td>
      <td className="px-6 py-4 whitespace-nowrap">{pet.pet_location}</td>
      <td className="px-6 py-4 whitespace-nowrap">{pet.status || (isPendingTable ? "pending" : "approved")}</td>
      <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
        <Link to={`/dashboard/updatePet/${pet._id}`}>
          <button title="Edit"><MdEditSquare className="text-2xl" /></button>
        </Link>
        <button onClick={() => handleDelete(pet._id)} className="text-red-600 hover:text-red-900" title="Delete">
          <MdDelete className="text-2xl" />
        </button>
        <button
          className="bg-[#F07C3D] text-white px-2 py-1 font-medium rounded-md"
          onClick={() => handleAdoptionStatusChange(pet._id, !pet.adopted)}
          title="Toggle adoption"
        >
          {pet.adopted ? "Adopted" : "Not Adopted"}
        </button>

        {isPendingTable && (
          <>
            <button
              className="bg-green-600 text-white px-2 py-1 rounded-md"
              onClick={() => handleApprove(pet._id)}
              title="Approve"
            >
              Approve
            </button>
            <button
              className="bg-gray-500 text-white px-2 py-1 rounded-md"
              onClick={() => handleReject(pet._id)}
              title="Reject"
            >
              Reject
            </button>
          </>
        )}
      </td>
    </tr>
  );

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">All Pets (Admin)</h1>

      {/* Pending Table */}
      <h2 className="text-xl font-semibold mb-2">Pending Approval</h2>
      <table className="min-w-full divide-y divide-gray-200 mb-10">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Age</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pendingPets.length === 0 ? (
            <tr><td className="px-6 py-4" colSpan={6}>No pending pets 🎉</td></tr>
          ) : (
            pendingPets.map((pet) => <Row key={pet._id} pet={pet} isPendingTable />)
          )}
        </tbody>
      </table>

      {/* Approved Table (optional) */}
      <h2 className="text-xl font-semibold mb-2">Approved (Publicly Visible)</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Age</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {approvedPets.length === 0 ? (
            <tr><td className="px-6 py-4" colSpan={6}>No approved pets yet.</td></tr>
          ) : (
            approvedPets.map((pet) => <Row key={pet._id} pet={pet} isPendingTable={false} />)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllPets;
