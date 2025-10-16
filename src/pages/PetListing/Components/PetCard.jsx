import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';

const PetCard = ({ pet }) => {
    const { _id, pet_image, pet_name, pet_age, pet_location, short_description } = pet || {}

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
            {pet ? (
                <>
                    <img className="w-full h-72 object-cover" src={pet_image} alt="Adopt a Pet" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{pet_name}</div>
                        <p className="text-gray-700 text-base">
                            {short_description}
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-[#F07C3D] mr-2 mb-2"><span>Age:</span> {pet_age}</span>
                        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-[#F07C3D] mr-2 mb-2"><span>Location: </span> {pet_location}</span>
                    </div>
                    <div className="px-6 py-4">
                        <Link to={`/petDetails/${_id}`}>
                            <button className="bg-[#F07C3D] hover:bg-[#ee6c26] text-white font-bold py-2 px-4 rounded">
                                View Details
                            </button>
                        </Link>
                    </div>
                </>
            ) : (
                <div>
                    <Skeleton height={200} />
                    <div className="px-6 py-4">
                        <Skeleton height={20} width={120} />
                        <Skeleton height={16} width={180} />
                    </div>
                    <div className="px-6 pt-2 pb-4">
                        <Skeleton height={16} width={100} />
                        <Skeleton height={16} width={160} />
                    </div>
                    <div className="px-6 py-4">
                        <Skeleton height={40} width={200} />
                    </div>
                </div>
            )}
        </div>
    );
};

PetCard.propTypes = {
    pet: PropTypes.object.isRequired
}

export default PetCard;
