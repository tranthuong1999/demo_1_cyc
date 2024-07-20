import React from 'react'
import './style.scss';
import { useTheme } from "@mui/material/styles";
import { Button, useMediaQuery } from "@mui/material";
import classNames from "classnames";
import imageIphone from '../../assets/image-iphone.png';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const data = [
    "https://demo1.cybersoft.edu.vn/static/media/banner-slider-2.454924ec.jpg",
    "https://demo1.cybersoft.edu.vn/static/media/banner-slider-1.c4d5fe9e.jpg",
    "https://demo1.cybersoft.edu.vn/static/media/banner-slider-5.8a084f78.jpg",
    "https://demo1.cybersoft.edu.vn/static/media/banner-slider-4.16bf933f.jpg"
]


const DownloadApp = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(600));

    const renderSlider = (data: any[]) => {
        return data.map((item: any) => {
            return (
                <SwiperSlide>{item}</SwiperSlide>
            )
        })
    }
    return (
        <div className={classNames('download-app', isMobile ? "download-app-mobile" : "")}>
            <div className={classNames('list-content', isMobile ? "list-content-mobile" : "")}>
                <div className='block-1'>
                    <h3 className='title'> Ứng dụng tiện lợi dành cho người yêu điện ảnh</h3>
                    <p className='description'> Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p>
                    <button className='btn-download'> App miễn phí - Tải về ngay</button>
                    <p className='version'>
                        TIX có hai phiên bản<a href=""> IOS </a>&<a href="">Android</a>
                    </p>
                </div>
                {/* block2 */}
                <div className='block-2'>
                    <div>
                        <img src={imageIphone} />
                        <Swiper
                            pagination={{
                                clickable: true
                            }}
                            className="my-swiper"
                            loop={true}
                            slidesPerView={1}
                            centeredSlides={true}
                            modules={[Autoplay]}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                        >
                            {/* {renderSlider(data)} */}
                            <SwiperSlide>
                                <img src="https://demo1.cybersoft.edu.vn/static/media/banner-slider-2.454924ec.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://demo1.cybersoft.edu.vn/static/media/banner-slider-1.c4d5fe9e.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://demo1.cybersoft.edu.vn/static/media/banner-slider-5.8a084f78.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://demo1.cybersoft.edu.vn/static/media/banner-slider-4.16bf933f.jpg" />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DownloadApp;