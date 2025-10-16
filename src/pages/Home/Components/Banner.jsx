import { Link } from 'react-router-dom';
import bannerImg from '../../../assets/banner1.png';

const Banner = () => {
  return (
    <div
      className="relative w-full bg-center bg-cover h-72 md:h-[750px] lg:h-[800px]"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      {/* Dark overlay to make text pop */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl px-6 lg:px-0 ml-0 lg:ml-44 flex flex-col justify-center h-full space-y-3 lg:space-y-6">
        <h2 className="text-2xl lg:text-4xl text-white font-semibold tracking-wide">
          Searching for a
        </h2>
        <h1 className="text-3xl lg:text-6xl text-[#F07C3D] font-extrabold drop-shadow-md">
          Best Friend 🐾
        </h1>
        <p className="text-white text-sm lg:text-lg w-full lg:w-6/12 leading-relaxed">
          Explore our selection of lovable pets awaiting their forever homes. Your new best friend is just a click away.
        </p>
        <div>
          <Link to="/pet-listing">
            <button className="mt-3 lg:mt-5 text-white bg-[#F07C3D] px-6 lg:px-8 py-2 lg:py-3 font-semibold rounded-md shadow-md hover:bg-[#f3732e] hover:scale-105 transform transition duration-200 ease-in-out">
              Adopt A Pet
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
