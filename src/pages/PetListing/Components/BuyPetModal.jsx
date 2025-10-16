import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BuyPetModal = ({ pet, setIsBuyModalOpen }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [processing, setProcessing] = useState(false);

  const handleBuy = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      // 1. Create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        donate: pet.price, // reuse 'donate' field name from your backend route
      });

      const clientSecret = res.data.clientSecret;

      // 2. Confirm card payment
      const card = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: { email: user.email, name: user.displayName },
        },
      });

      if (error) {
        Swal.fire("Payment Failed", error.message, "error");
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // 3. Save purchase info
        const purchaseData = {
          petId: pet._id,
          petName: pet.pet_name,
          petImage: pet.pet_image,
          buyerEmail: user.email,
          ownerEmail: pet.email,
          amount: pet.price,
          paymentId: paymentIntent.id,
        };

        await axiosSecure.post("/purchases", purchaseData);

        Swal.fire("Success!", "You have successfully bought this pet!", "success");
        setIsBuyModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-3xl text-center font-bold mb-4">
          Buy {pet.pet_name} (${pet.price})
        </h2>
        <form onSubmit={handleBuy}>
          <CardElement className="border p-3 rounded mb-4" />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsBuyModalOpen(false)}
              className="mr-4 px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              disabled={processing}
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {processing ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

BuyPetModal.propTypes = {
  pet: PropTypes.object.isRequired,
  setIsBuyModalOpen: PropTypes.func,
};

export default BuyPetModal;
