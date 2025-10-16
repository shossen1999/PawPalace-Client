import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const DonateCard = ({ donation }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={donation.petPicture} alt={donation.petName} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{donation.petName}</h2>
                <p className="text-gray-600 mb-2"><span className="font-bold">Max Donation Amount:</span> ${donation.maxDonationAmount}</p>
                <p className="text-gray-600 mb-2"><span className="font-bold">Donated Amount:</span> ${donation.donatedAmount}</p>
                <Link to={`/donationDetails/${donation._id}`} className="inline-block bg-[#F07C3D] text-white py-2 px-4 rounded hover:bg-[#ee6c26]">
                    View Details
                </Link>
            </div>
        </div>
    );
};
DonateCard.propTypes = {
    donation: PropTypes.object.isRequired
}
export default DonateCard;