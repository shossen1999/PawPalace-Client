import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PropTypes from 'prop-types';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);

const DonateModal = ({ setIsModalOpen, donation }) => {
    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Donate</h2>
                        <button
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                            onClick={() => setIsModalOpen(false)}
                        >
                            &times;
                        </button>
                    </div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm donation={donation}></CheckoutForm>
                    </Elements>
                </div>
            </div>
        </div>
    );
};
DonateModal.propTypes = {
    donation: PropTypes.object,
    setIsModalOpen: PropTypes.func
}
export default DonateModal;