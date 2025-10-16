

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import dog2 from '../../../../assets/dog2.jpg'
import adoptedDog from '../../../../assets/dog.jpg'
import adoptedRabbit from '../../../../assets/rabbit.jpg'
import adoptedFish from '../../../../assets/fish.jpg'
import adoptedHorse from '../../../../assets/horse.jpg'
import { Link } from 'react-router-dom';

const CallToAction = () => {
    return (
        <div className='bg-[#F07C3D] bg-opacity-5 py-8 mb-28'>
            <h2 className="text-4xl text-center font-semibold mb-12">Call to Action</h2>
            <div>
                <div className="my-12 mx-auto container text-center">
                    <div className="relative">
                        <img src={dog2} alt="Adopted Cat" className="w-full h-64 object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <h1 className="text-white text-5xl font-bold">Give a Pet a Better Life</h1>
                        </div>
                    </div>
                    <p className="text-xl my-6">Adopt a pet today and experience the joy of unconditional love.</p>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={20}
                        freeMode={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide className="relative">
                            <img src={adoptedDog} alt="Adopted Dog" className="w-full h-64 object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <p className="text-white text-lg">Buddy found his forever home and couldnot be happier!</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="relative">
                            <img src={adoptedRabbit} alt="Adopted Rabbit" className="w-full h-64 object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <p className="text-white text-lg">Coco is now living the dream with her new family.</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="relative">
                            <img src={adoptedFish} alt="Adopted Fish" className="w-full h-64 object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <p className="text-white text-lg">Nemo is exploring his new aquarium happily!</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="relative">
                            <img src={adoptedHorse} alt="Adopted Horse" className="w-full h-64 object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <p className="text-white text-lg">Star is enjoying the open fields with her new friends.</p>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <Link to="/pet-listing" className="mt-8 inline-block bg-[#F07C3D] text-white text-xl py-3 px-6 rounded-lg hover:bg-[#ef6e29] transition duration-300">Adopt a Pet Today</Link>
                </div>
            </div>
        </div>
    );
};

export default CallToAction;