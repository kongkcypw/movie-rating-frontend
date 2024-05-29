import React from 'react'
import { MoviePublic } from '../../pages/Home'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import MovieCard from '../card/MovieCard';

interface CardCarouselProps {
    movieList: MoviePublic[]
    topic: string
}

const CardCarousel: React.FC<CardCarouselProps> = ({ movieList, topic }) => {
    return (
        <div className="mx-auto max-w-7xl py-6">
            <div className=' border-l-4 border-l-blue-400 px-4 py-1 mb-4'>
                <h1 className='text-2xl font-semibold'>{topic}</h1>
            </div>
            <div className="relative drop-shadow-sm">
                <div className="swiper-button-next absolute top-36 bg-white text-slate-800 p-8 rounded-full"></div>
                <div className="swiper-button-prev absolute top-36 bg-white text-slate-800 p-8 rounded-full "></div>
                <Swiper
                    spaceBetween={16}
                    slidesPerView={6}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    modules={[Navigation]}
                    className=""
                >
                    {movieList && movieList.map((movie, index) => (
                        <SwiperSlide key={index}>
                            <MovieCard movie={movie} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default CardCarousel