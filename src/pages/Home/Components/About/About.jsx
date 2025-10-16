
import dog2 from "../../../../assets/dog2.jpg"
import horse from "../../../../assets/horse.jpg"
const About = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div className="lg:w-1/2 relative">
                    <img
                        src={horse}
                        className="lg:w-3/4 w-full h-96 rounded-lg shadow-2xl" />
                    <img
                        src={dog2}
                        className="w-1/2  absolute right-5 top-3/4 border-8 border-white  rounded-lg shadow-2xl" />

                </div>

                <div className="lg:w-1/2 lg:pl-10">
                    <h2 className="text-3xl font-semibold mb-4">About Us</h2>
                    <p className="text-gray-700 mb-6">Welcome to our website! We are passionate about connecting pets with loving homes and helping people find their perfect companions. Our mission is to make the adoption process easier and more accessible for everyone.</p>
                    <p className="text-gray-700 mb-6">Our website was founded with the goal of addressing the challenges and barriers faced by both pet adopters and shelters. We believe that every pet deserves a loving home, and we are committed to making that a reality.</p>
                    <p className="text-gray-700 mb-6">At our core, we are driven by a love for animals and a desire to make a positive impact in the world. We are dedicated to providing a seamless and enjoyable experience for both pets and their new families.</p>
                    <p className="text-gray-700 mb-6">Thank you for visiting our website and for considering adoption. Together, we can make a difference in the lives of countless pets and people!</p>
                </div>
            </div>
        </div>
    );
};

export default About;