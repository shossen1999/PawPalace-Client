import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import PropTypes from 'prop-types';
import { AuthContext } from './../../../Provider/AuthProvider';
import useAxiosSecure from './../../../hooks/useAxiosSecure';

const CheckoutForm = ({ donation }) => {
    const { _id, petName, email, petPicture } = donation
    const [error, setError] = useState();
    const [donationAmount, setDonationAmount] = useState('');
    const { user } = useContext(AuthContext)
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (donationAmount) {
            axiosSecure.post('/create-payment-intent', { donate: donationAmount })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, donationAmount])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error)
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('')
        }
        //confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName || "anonymous"
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === "succeeded") {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Donation Successful",
                    showConfirmButton: false,
                    timer: 1500
                });

                //now save the payment in db
                const payment = {
                    donatedAmount: parseInt(donationAmount),
                    postId: _id,
                    email: user.email,
                    date: new Date(),
                    transactionId: paymentIntent.id,
                    postOwnerEmail: email,
                    petPicture,
                    petName
                }
                const res = await axiosSecure.post('/donates', payment)
                console.log(res)
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    className="mb-4 w-full"
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                />
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="flex items-center w-full justify-center">
                    <button className="font-medium bg-[#F07C3D] text-white mt-8 px-3 py-1 rounded-sm" type="submit" disabled={!stripe || !clientSecret}>
                        Donate
                    </button>
                </div>
                <p className="text-red-600 mt-2">{error}</p>
            </form>
        </div>
    );
};

CheckoutForm.propTypes = {
    donation: PropTypes.object,
}
export default CheckoutForm;