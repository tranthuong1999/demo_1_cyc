import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import './style.scss'
import IconPlay from '../../assets/icon-play.png'
import 'swiper/css/pagination';
import BasicModal from '../Modal';
import { listImage, mapListVideo } from './data';


export default function IntroducePage() {

    const [videoActive, setVideoActive] = useState(0);
    const [runVideo, setRunVideo] = useState(false);
    const swiperRef = useRef(null);
    const [isRunSlide, setIsRunSlide] = useState(false)

    useEffect(() => {
        // if (!isRunSlide) {
        //     // @ts-ignore
        //     const swiperInstance = swiperRef?.current?.swiper
        //     const interval = setInterval(() => {
        //         if (swiperInstance) {
        //             swiperInstance.slideNext();
        //         }
        //     }, 5000);
        //     return () => clearInterval(interval);
        // }
    }, [swiperRef?.current, isRunSlide]);



    const handlePlayVideo = () => {
        setRunVideo(true);
        setIsRunSlide(true);
    }

    const renderSlider = (data: string[]) => {
        return data.map((item, key) => {
            return (
                <SwiperSlide key={key}>
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
                ref={swiperRef}
                pagination={{
                    clickable: true
                }}
                navigation={true}
                className="my-swiper"
                onSlideChange={(swiper: any) => setVideoActive(swiper.realIndex)}
                slidesPerView={1}
                loop={true}
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
                    onClose={() => { setRunVideo(false); setIsRunSlide(false) }}
                    // @ts-ignore
                    urlVideo={mapListVideo[videoActive]}
                />
            }
        </div>
    );
}



