import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./style.scss"
import MenuPage from '../Menu';
import { Rating } from '@mui/material';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useTheme } from "@mui/material/styles";
import { Button, useMediaQuery } from "@mui/material";
import classNames from "classnames";
import iconPlay from '../../assets/icon-play.png';
import moment from 'moment';
import BasicModal from '../Modal';
import movieStore from '../../store/MovieStore';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

const PurchasePage = observer(() => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(600));
    const [isRunTrailer, setIsRunTrailer] = useState(false);
    const { codeMovie } = useParams();
    const { fetchListCinema, listCinema } = movieStore;
    const { trailer, hinhAnh, ngayKhoiChieu, tenPhim, danhGia } = listCinema;
    const [codeCinema, setCodeCinema] = useState(toJS(listCinema).heThongRapChieu[0].maHeThongRap)

    useEffect(() => {
        fetchListCinema(Number(codeMovie))
    }, [codeMovie])


    function getCumRapAndShowtimes(maHeThongRap: any, data: any) {
        const heThongRap = data.heThongRapChieu.find((rap: any) => rap.maHeThongRap === maHeThongRap);
        if (!heThongRap) {
            return [];
        }
        return heThongRap.cumRapChieu.map((cumRap: any) => {
            return cumRap.lichChieuPhim.map((lichChieu: any) => {
                return {
                    tenCumRap: cumRap.tenCumRap,
                    ngayChieuGioChieu: lichChieu.ngayChieuGioChieu
                };
            });
        }).flat()
            .reduce((acc: any, current: any) => {
                const existing = acc.find((item: any) => item.tenCumRap === current.tenCumRap);
                if (existing) {
                    existing.ngayChieuGioChieu.push(current.ngayChieuGioChieu);
                } else {
                    acc.push({ tenCumRap: current.tenCumRap, ngayChieuGioChieu: [current.ngayChieuGioChieu] });
                }
                return acc;
            }, []);
    }

    return (
        <div className='purchase-ticket'>
            <MenuPage />
            <div className={classNames("block-1", isMobile ? "block-1-mobile" : "")}>
                <div className='img-show'>
                    <img src={hinhAnh} />
                    <div className='icon-play' onClick={() => setIsRunTrailer(true)}>
                        <img src={iconPlay} style={{ width: 50, height: 50 }} />
                    </div>
                </div>
                <div className='block-1-infor'>
                    <p className='date-time'>{moment(ngayKhoiChieu).format("DD/MM/YYYY")}</p>
                    <p className='name-movie'> {tenPhim}</p>
                    <p className='timer'>120phút </p>
                    <button className='btn-ticket'> Mua vé</button>
                </div>
                <div className={classNames("rating", isMobile ? "rating-mobile" : "")}>
                    <CircularProgressbar className='circular-bar' value={100} text={danhGia} />
                    <Rating className='star' name="read-only" value={5} readOnly />
                </div>
            </div>
            {
                isRunTrailer
                &&
                <BasicModal
                    open={isRunTrailer}
                    onClose={() => setIsRunTrailer(false)}
                    urlVideo={trailer}
                />
            }
            <div className="list-cinema">
                <div className='list-cinema-block-1'>
                    {
                        toJS(listCinema).heThongRapChieu?.map((item: any) => {
                            return (
                                <div className='img-logo' onClick={() => setCodeCinema(item.maHeThongRap)}>
                                    <img src={item.logo} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className='list-cinema-block-2'>
                    {
                        getCumRapAndShowtimes(codeCinema, toJS(listCinema)).map((item: any) => {
                            return (
                                <div>
                                    <p className='name-cinema'>{item.tenCumRap}</p>
                                    <div className='show-presentation'>
                                        {
                                            item.ngayChieuGioChieu.map((time: any) => {
                                                return (
                                                    <div className='item'>
                                                        <span className="date">{moment(time).format("DD/MM/YYYY")}</span> ~
                                                        <span className="time">{moment(time).format("HH:mm")}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
})

export default PurchasePage