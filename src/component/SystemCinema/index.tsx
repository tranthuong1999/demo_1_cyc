import React, { useEffect } from 'react'
import './style.scss'
import movieStore from '../../store/MovieStore'
import { Divider, useScrollTrigger } from '@mui/material'
import { toJS } from 'mobx'
import { observer } from 'mobx-react';
import moment from 'moment'


type SystemCinema = {
    maHeThongRap: string,
    tenHeThongRap: string,
    biDanh: string,
    logo: string
}

const SystemCinema = observer(() => {
    const { listSysmtemCinema, fetchListSystemCinema, listSheduleCinemaSystem, fetchInforSheduleCinemaSystem } = movieStore;

    useEffect(() => {
        fetchListSystemCinema()
    }, [])

    useEffect(() => {
        if (!listSheduleCinemaSystem.length) {
            fetchInforSheduleCinemaSystem("BHDStar")
        }

    }, [])

    const handleGetSystemCinema = (item: SystemCinema) => {
        fetchInforSheduleCinemaSystem(item.maHeThongRap)
    }

    return (
        <div className="list-system-cinema">
            <div className='img-shadown'>
                <img src="https://demo1.cybersoft.edu.vn/static/media/back-news.b9861f84.png" />
            </div>
            <div className='system-cinema'>
                <div className='item-left'>
                    {
                        (listSysmtemCinema).map((item: SystemCinema, index: number) => {
                            return (
                                <div className='list-item-logo' key={index} onClick={() => handleGetSystemCinema(item)}>
                                    <img src={item.logo} className='item-logo' />
                                    <Divider />
                                </div>
                            )
                        })
                    }
                </div>
                <div className='item-center'>
                    {
                        (listSheduleCinemaSystem).map((item: any) => {
                            return item.lstCumRap.map((list: any) => {
                                return (
                                    <div className='list-cinema'>
                                        <div className='name-cinema'> {list.tenCumRap}</div>
                                        <div className='location'> {list.diaChi}</div>
                                        <div className='detail'>
                                            <a href="url">[Chi tiết]</a>
                                        </div>
                                    </div>
                                )
                            })
                        })
                    }
                </div>
                <div className='item-right'>
                    {
                        toJS(listSheduleCinemaSystem).map((item: any) => {
                            return item.lstCumRap.map((list: any) => {
                                return (list.danhSachPhim.map((movie: any) => {
                                    return (
                                        <div className='list-movie'>
                                            <div className='block-1'>
                                                <img src={movie.hinhAnh} />
                                            </div>
                                            {/* block 2 */}
                                            <div className='block-2'>
                                                <div className='movie-name'>
                                                    <span> C18</span>{movie.tenPhim}
                                                </div>
                                                <div className='show-presenter'>
                                                    {movie.lstLichChieuTheoPhim.slice(0, 4).map((show: any) => {
                                                        return (
                                                            <div className="block-2-child">
                                                                <span className="date">{moment(show.ngayChieuGioChieu).format("DD/MM/YYYY")}</span> ~
                                                                <span className="time">{moment(show.ngayChieuGioChieu).format("HH:mm")}</span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }))
                            })
                        })
                    }

                </div>
            </div>
        </div>
    )


})


export default SystemCinema