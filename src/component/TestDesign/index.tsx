import React, { useEffect, useState } from 'react'
import './style.scss'
import movieStore from '../../store/MovieStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import "./style.scss";

const TestDesign = () => {

    const { fetchListMovie, listMovie } = movieStore;

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09')
            .then(response => response.json())
            .then(data => setItems(data))
    }, [])

    const renderItems = (startIndex: number, endIndex: number) => {
        return (
            <SwiperSlide>
                <div className='list-movie'>
                    {
                        items.slice(startIndex, endIndex).map((movie: any, index) => {
                            return (
                                <div className='item-movie'>
                                    <div className='item-movie-image'>
                                        <img src={movie.hinhAnh} />
                                    </div>
                                    <div className='item-movie-footer'>
                                        <p className='item-movie-name'>
                                            <span> C18</span> {movie.tenPhim}
                                        </p>
                                        <p className='item-movie-desc'>
                                            {movie.moTa}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </SwiperSlide>
        )
    };

    return (
        <div className="test-design">
            <Swiper
                 pagination={{
                    clickable: true
                }}
                navigation={true}
                className="movie-page-swiper"
                loop={true}
                slidesPerView={1}
                modules={[Pagination]}
                centeredSlides={true}
            >
                <SwiperSlide> 1</SwiperSlide>
                <SwiperSlide> 2</SwiperSlide>
                <SwiperSlide> 3</SwiperSlide>
                {/* {renderItems(0, 8)} */}
            </Swiper>
        </div>
    )
}

export default TestDesign