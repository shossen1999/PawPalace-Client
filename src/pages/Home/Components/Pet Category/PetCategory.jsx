

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

import cat from '../../../../assets/cat.jpg'
import dog from '../../../../assets/dog.jpg'
import rabbit from '../../../../assets/rabbit.jpg'
import fish from '../../../../assets/fish.jpg'
import bird from '../../../../assets/bird.jpg'


const PetCategory = () => {
  
    

    return (
        <div className="my-28 mx-auto container">
            <h2 className="text-4xl text-center font-semibold mb-12">Pet Categories</h2>
            <div className='flex items-center justify-center'>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={20}
                    freeMode={true}
                    pagination={{ clickable: true }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <Link to="/category/Cat">
                            <img src={cat} alt="" />
                            <h2 className='absolute flex items-center justify-center z-10 text-white top-5 text-xl md:text-3xl font-bold bg-white bg-opacity-15 px-10'>Cat</h2>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/category/Dog">
                            <img src={dog} alt="" />
                            <h2 className='absolute flex items-center justify-center z-10 text-white top-5 text-xl md:text-3xl font-bold bg-black bg-opacity-15 px-10'>Dog</h2>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/category/Rabbit">
                            <img src={rabbit} alt="" />
                            <h2 className='absolute flex items-center justify-center z-10 text-white top-5 text-xl md:text-3xl font-bold bg-white bg-opacity-15 px-10'>Rabbit</h2>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/category/Fish">
                            <img className='' src={fish} alt="" />
                            <h2 className='absolute flex items-center justify-center z-10 text-white top-5 text-xl md:text-3xl font-bold bg-white bg-opacity-15 px-10'>Fish</h2>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/category/Bird">
                            <img src={bird} alt="" />
                            <h2 className='absolute flex items-center justify-center z-10 text-white top-5 text-xl md:text-3xl font-bold bg-white bg-opacity-15 px-10'>Bird</h2>
                        </Link>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default PetCategory;