import React from 'react'
import './style.scss';
import logo_1 from '../../assets/logo_footer_1.jpeg'
import logo_2 from '../../assets/logo_footer_2.png'
import icon_fb from "../../assets/icon-fb.png";
import icon_zalo from "../../assets/icon-zalo.png"
import icon_human from "../../assets/icon-human.png"
import icon_apple from "../../assets/icon-apple.png"

import { useTheme } from "@mui/material/styles";
import classNames from "classnames";
import { useMediaQuery } from "@mui/material";


export const FooterPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(600));
    return (
        <div className='footer-page'>
            <div className='footer'>
                {!isMobile ? <div className='block-1'>
                    <div className='block-1-tix'>
                        <h6 className='title-footer'>TIX</h6>
                        <div className='child-2'>
                            <p>FAQ</p>
                            <p> Thỏa thuận sử dụng</p>
                        </div>
                        <div className='child-2'>
                            <p>Brand Guidelines</p>
                            <p> Chính sách bảo mật</p>
                        </div>
                    </div>
                    <div className='block-1-doi-tac'>
                        <h6 className='title-footer'> ĐỐI TÁC</h6>
                        <div className='list-image'>
                            <img src={icon_apple} />
                            <img src={icon_human} />
                            <img src={icon_fb} />
                            <img src={icon_zalo} />
                        </div>
                        <div className='list-image'>
                            <img src={icon_apple} />
                            <img src={icon_human} />
                            <img src={icon_fb} />
                            <img src={icon_zalo} />
                        </div>
                        <div className='list-image'>
                            <img src={icon_apple} />
                            <img src={icon_human} />
                            <img src={icon_fb} />
                            <img src={icon_zalo} />
                        </div>
                        <div className='list-image'>
                            <img src={icon_apple} />
                            <img src={icon_human} />
                            <img src={icon_fb} />
                            <img src={icon_zalo} />
                        </div>
                    </div>
                    <div className='block-1-social'>
                        <h6 className='title-footer'>
                            MOBILE APP
                        </h6>
                        <div className='image'>
                            <img src={icon_apple} />
                            <img src={icon_human} />
                        </div>
                    </div>
                    <div className='block-1-social'>
                        <h6 className='title-footer'>
                            SOCIAL
                        </h6>
                        <div className='image'>
                            <img src={icon_fb} />
                            <img src={icon_zalo} />
                        </div>

                    </div>
                </div> :
                    <div className='block-1-mobile'>
                        <div className='policy'>
                            <p> Thỏa thuận sử dụng</p>
                            <p> Thỏa thuận sử dụng</p>
                        </div>

                        <div className='image'>
                            <img src={icon_fb} />
                            <img src={icon_zalo} />
                        </div>
                    </div>}

                <div className={classNames("block-2", isMobile ? 'block-2-mobile' : "")}>
                    <div className='block-2-image-left'>
                        <img src={logo_1} />
                    </div>
                    <div className='block-2-center'>
                        <p className='title'>TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION </p>
                        <div className='desc'>
                            <p>Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam. </p>
                            <p>Giấy chứng nhận đăng ký kinh doanh số: 0101659783, </p>
                            <p>
                                đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
                            </p>
                            <p>
                                Số Điện Thoại (Hotline): 1900 545 436
                            </p>
                        </div>


                    </div>
                    <div className='block-2-image-right'>
                        <img src={logo_2} />
                    </div>
                </div>
            </div>
        </div>
    )
}
