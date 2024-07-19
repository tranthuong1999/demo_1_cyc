import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import './style.scss'
import IconPlay from '../../assets/icon-play.png'
import 'swiper/css/pagination';
import BasicModal from '../Modal';
import { listImage, mapListVideo } from './data';

export default function IntroducePage() {

    const [videoActive, setVideoActive] = useState(0);
    const [runVideo, setRunVideo] = useState(false);

    const handlePlayVideo = () => {
        setRunVideo(true);
    }

    const renderSlider = (data: string[]) => {
        return data.map((item) => {
            return (
                <SwiperSlide>
                    <img
                        src={item}
                        className='image'
                    />
                </SwiperSlide>
            )
        })
    }

    return (
        <div className='introduce'>
            <Swiper
                pagination={{
                    clickable: true
                }}
                navigation={true}
                className="my-swiper"
                onSlideChange={(swiper: any) => {
                    setVideoActive(swiper.activeIndex)
                }}
                loop={true}
                slidesPerView={1}
                modules={[Pagination, Navigation]}
                centeredSlides={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
            >
                {renderSlider(listImage)}
            </Swiper>
            <div className='icon-play' onClick={handlePlayVideo}>
                <img src={IconPlay} />
            </div>
            {
                runVideo &&
                <BasicModal
                    open={runVideo}
                    onClose={() => setRunVideo(false)}
                    // @ts-ignore
                    urlVideo={mapListVideo[videoActive]}
                />
            }
        </div>
    );
}



