import { observer } from 'mobx-react-lite';
import MenuPage from '../Menu';
import bgr_login from '../../assets/bgr-main.jpg'
import BasicModal from '../Modal';
import { data } from './data';
import "./style.scss";
import { Box, Modal } from '@mui/material';
import moment from 'moment';
import movieStore from '../../store/MovieStore';
import { useEffect } from 'react';
import { toJS } from 'mobx';

const HistoryTickerPage = observer(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")!);
    const { apiFetchHistoryBookTicker, listHistoryBooking } = movieStore;
    useEffect(() => {
        if (currentUser) {
            apiFetchHistoryBookTicker(currentUser.taiKhoan)
        }
    }, [])

    return (
        <div className='history-book-ticket'>
            <img src={bgr_login} style={{ width: "100%", minHeight: "1100px", objectFit: "cover" }} />
            <MenuPage />
            <Modal
                open={true}
            >
                <div className="modal-history-booking">
                    <h3 className='title'>Lịch sử đặt vé</h3>
                    <div className='list-ticket'>
                        {
                            listHistoryBooking?.thongTinDatVe?.map((item: any, index: number) => {
                                console.log(`item ${index}`, item)
                                return (
                                    <div className='item-ticket'>
                                        <p className='date'>
                                            Ngày đặt: <span>{moment(item.ngayDat).format("DD - MM - YYYY")}</span> | <span>{moment(item.ngayDat).format("HH:mm")}</span>
                                        </p>
                                        <p className='name-movie'>Tên phim : {item.tenPhim}</p>
                                        <p className='time'>Thời lượng:{item.thoiLuongPhim}, Giá vé:{item.giaVe}</p>
                                        <p className="rap">Rạp:{item.danhSachGhe[0]?.tenHeThongRap}</p>
                                        <div className="list-seat">
                                            Ghế số:
                                            {
                                                item.danhSachGhe.map((ghe: any, index: number) => {
                                                    return (
                                                        <div >
                                                            {ghe.tenGhe}{index < item.danhSachGhe.length - 1 ? ', ' : ''}
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
            </Modal>
        </div>
    )
})

export default HistoryTickerPage;