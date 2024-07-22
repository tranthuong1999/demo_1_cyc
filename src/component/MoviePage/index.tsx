import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react';
import movieStore from '../../store/MovieStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';
import "./style.scss";
import { useTheme } from "@mui/material/styles";
import { Button, useMediaQuery } from "@mui/material";
import classNames from "classnames";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { data } from './data';
import moment from 'moment';
import SearchIcon from '@mui/icons-material/Search';
import IconPlay from '../../assets/icon-play.png'
import BasicModal from '../Modal';


type Movie = {
    maPhim: string,
    tenPhim: string,
    biDanh: string,
    trailer: string,
    hinhAnh: string,
    moTa: string,
    maNhom: string,
    ngayKhoiChieu: string,
    danhGia: number
}

const MoviePage = observer(() => {
    const { fetchListMovie, listMovie, listCinema, fetchListCinema } = movieStore;
    const [page, setPage] = useState(3);
    const theme = useTheme();
    const isTabnet = useMediaQuery(theme.breakpoints.between(600, 1024));
    const isMobile = useMediaQuery(theme.breakpoints.down(600));
    const isComputer = useMediaQuery(theme.breakpoints.up(1024));
    const [dayShow, setDayShow] = useState('');
    const [movie, setMovie] = useState("");
    const [nameCinema, setNameCinema] = useState("");
    const [ngayChieuGioChieu, setNgayChieuGioChieu] = useState([])
    const [searchNameMovie, setSearchMovie] = useState<string | null>(null);
    const [isSearch, setIsSearch] = useState<string | null>(null);
    const [runVideo, setRunVideo] = useState<any>()



    function getNgayChieuGioChieuByTenCumRap(tenCumRap: string) {
        const result: any = [];
        data.heThongRapChieu.forEach(heThong => {
            heThong.cumRapChieu.forEach(cumRap => {
                if (cumRap.tenCumRap === tenCumRap) {
                    cumRap.lichChieuPhim.forEach(lichChieu => {
                        result.push(lichChieu.ngayChieuGioChieu);
                    });
                }
            });
        });
        return result;
    }

    const handleChangeMovieName = (event: SelectChangeEvent) => {
        const _movie = event.target.value as string
        setMovie(_movie)
        const _findCodeMovie = listMovie.find((item: Movie) => item.tenPhim === _movie)
        if (_findCodeMovie) {
            // @ts-ignore
            fetchListCinema(_findCodeMovie.maPhim);
        }
    };

    const handleChangeCinemaName = (event: SelectChangeEvent) => {
        const _cinema = event.target.value as string
        setNameCinema(_cinema)
        setNgayChieuGioChieu(getNgayChieuGioChieuByTenCumRap(_cinema))
    };

    const handleChangeDayShow = (event: any) => {
        setDayShow(event.target.value);
    }


    useEffect(() => {
        if (isTabnet || isMobile) {
            setPage(4)
            return;
        }
        if (isComputer) {
            setPage(3)
            return;
        }
    }, [isTabnet, isMobile, isComputer])

    useEffect(() => {
        fetchListMovie();
    }, [])

    const handleKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            setIsSearch(searchNameMovie);
        }
    }


    const renderItems = (startIndex: number, endIndex: number, searchName?: string) => {
        return (
            <SwiperSlide>
                <div className={classNames('list-movie', isTabnet ? "list-movie-tabnet" : "", isMobile ? "list-movie-mobile" : "")}>
                    {
                        ((searchName) ? listMovie.filter((movie: Movie) => movie.tenPhim.toLowerCase().includes(searchName.toLowerCase())) : listMovie?.slice(startIndex, endIndex)).map((movie: Movie) => {
                            return (
                                <div className={classNames('item-movie', isMobile ? "item-movie-mobile" : "")} onClick={() => setRunVideo(movie.trailer)}>
                                    <div className='item-movie-image'>
                                        <img src={movie.hinhAnh} />
                                        <div className='icon-run-video'>
                                            <img src={IconPlay} />
                                        </div>
                                    </div>
                                    <div className='item-movie-footer'>
                                        <p className='item-movie-name'>
                                            <span> C18</span> {movie.tenPhim}
                                        </p>
                                        <p className='item-movie-desc'>
                                            {movie.moTa}
                                        </p>
                                        <div onClick={(e: any) => {
                                            e.stopPropagation()
                                            // navigate("/purchase-ticket")
                                        }}>
                                            <button className={classNames('btn-buy-ticket', (isTabnet || isComputer) ? "btn-buy-ticket-large" : "")}                                            >
                                                Mua vé
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </SwiperSlide>
        )
    };

    const renderSearchMovie = () => {
        return (
            <div className={classNames('search-movie', isTabnet ? "search-movie-tabnet" : "")}>
                <div className='block-1'>
                    <FormControl fullWidth variant="standard">
                        <InputLabel sx={{ paddingLeft: "20px" }}>Phim</InputLabel>
                        <Select
                            id="select-movie"
                            value={movie}
                            label="Phim"
                            onChange={handleChangeMovieName}
                        >
                            {
                                listMovie.map((item: Movie) => {
                                    return (
                                        <MenuItem key={item.maPhim} value={item.tenPhim}> {item.tenPhim}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className='block-1'>
                    <FormControl fullWidth variant="standard">
                        <InputLabel sx={{ paddingLeft: "20px" }}>Rạp</InputLabel>
                        <Select
                            value={nameCinema}
                            label="Rạp"
                            onChange={handleChangeCinemaName}
                        >
                            {
                                listCinema?.heThongRapChieu?.map((item: any) => {
                                    return item.cumRapChieu.map((cinema: any) => {
                                        return (
                                            <MenuItem key={cinema.tenCumRap} value={cinema.tenCumRap}> {cinema.tenCumRap}</MenuItem>
                                        )
                                    })
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className='block-1' >
                    <FormControl fullWidth variant="standard">
                        <InputLabel sx={{ paddingLeft: "20px" }}>Ngày giờ chiếu</InputLabel>
                        <Select
                            value={dayShow}
                            label="Ngày giờ chiếu"
                            onChange={handleChangeDayShow}
                        >
                            {
                                ngayChieuGioChieu?.map((date: any) => {
                                    return (
                                        <MenuItem value={date}> {moment(date).format("DD/MM/YYYY ~ HH:mm")}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className='block-2'>
                    <Button>
                        Mua vé ngay
                    </Button>
                </div>

            </div>
        )
    }

    const renderSearchMovieTabnet = () => {
        return (
            <div className={classNames('search-movie-mobile')}>
                <input
                    placeholder='Tìm kiếm phim'
                    className='input-search-movie'
                    onChange={(e) => setSearchMovie(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div className='icon-search'>
                    <SearchIcon />
                </div>
            </div>
        )
    }

    return (
        <div className='movie-page'>
            {isComputer ? renderSearchMovie() : ""}
            {(isTabnet || isMobile) ? renderSearchMovieTabnet() : ""}
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
                {
                    (page === 3) ?
                        <>
                            {renderItems(0, 8)}
                            {renderItems(9, 17)}
                            {renderItems(18, 26)}
                        </>
                        :
                        <>
                            {renderItems(0, 6)}
                            {renderItems(7, 13)}
                            {renderItems(14, 20)}
                            {renderItems(21, 27)}
                        </>
                }
            </Swiper>
            {
                runVideo
                &&
                <BasicModal
                    open={runVideo}
                    onClose={() => setRunVideo(false)}
                    urlVideo={runVideo}
                />
            }

        </div>
    )
})

export default MoviePage