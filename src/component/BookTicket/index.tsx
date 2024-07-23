import { observer } from 'mobx-react-lite';
import "./style.scss"
import MenuPage from '../Menu';
import { useNavigate, useParams } from 'react-router-dom';
import movieStore from '../../store/MovieStore';
import { useEffect, useState } from 'react';
import { toJS } from 'mobx';
import classNames from 'classnames';
import BasicModal from '../Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const BookTicketPage = observer(() => {
    const { code } = useParams();
    const { fetchInforTicketRoom, listRoom, listTicketBook, setListTicketBook, apiBookingTicket } = movieStore;
    const currentUser = JSON.parse(localStorage.getItem("currentUser")!)
    const navigate = useNavigate();
    const [wraningChooseTicket, setWraningChooseTicket] = useState(false)
    const [isTicketSucc, setIsTickerSucc] = useState(false)

    useEffect(() => {
        fetchInforTicketRoom(Number(code))
    }, [])
    // useEffect(() => {
    //     if (isTicketSucc) {
    //         const timer = setTimeout(() => {
    //             navigate("/")
    //         }, 3000)
    //         return () => clearTimeout(timer)
    //     }
    // }, [isTicketSucc,navigate])

    const handleChooseTicket = (item: any) => {
        if (!item.daDat) {
            setListTicketBook(item)
        }
    }
    const caculateTicket = (data: any[]) => {
        if (!data) return;
        return data.reduce((acc, item) => acc + item.giaVe, 0)
    }

    const handleBookTicket = async () => {
        if (!currentUser) {
            navigate("/sign-in")
            return;
        }
        if (!listTicketBook.length) {
            setWraningChooseTicket(true)
            return;
        }
        const data = {
            danhSachVe: toJS(listTicketBook),
            maLichChieu: code,
            taiKhoanNguoiDung: currentUser?.taiKhoan
        }
        await apiBookingTicket({ data })
        setIsTickerSucc(true)
        setListTicketBook(undefined, true)
    }

    const renderContentWarning = () => {
        return (
            <div className='modal-warning-booked'>
                <HighlightOffIcon sx={{ width: 100, height: 100, color: "rgb(244,153,156)" }} />
                <h4 className='title'> Bạn chưa chọn ghế</h4>
                <p className='seat'>Vui lòng chọn ghế ?</p>
                <button className='btn-understand' onClick={() => setWraningChooseTicket(false)}> Đã hiểu</button>
            </div>
        )
    }

    const renderContentBookSuccess = () => {
        return (
            <div className='modal-booked-success'>
                <CheckCircleOutlineIcon sx={{ width: 100, height: 100, color: "rgba(165,220,134,.3)" }} />
                <h4 className='title'>Đặt vé thành công</h4>
                <p className='seat'>Kiểm tra trong lịch sử đặt vé</p>
                <button className='btn-understand' onClick={() => setIsTickerSucc(false)}> Đã hiểu</button>
            </div>
        )
    }

    return (
        <div className='book-ticket-page'>
            <MenuPage />
            <div className='item-left'>
                <div className='show-person'>
                    {
                        toJS(listRoom)?.danhSachGhe?.map((item: any, index: any) => {
                            const isActive = (listTicketBook).findIndex((ticket: any) => ticket.maGhe === item.maGhe)
                            return (
                                <div
                                    className={classNames("seat", item.daDat ? "seat-booked" : "",
                                        ((!item.daDat && item.loaiGhe == "Thuong") ? "seat-thuong" : ""),
                                        ((!item.daDat && item.loaiGhe == "Vip") ? "seat-vip" : ""),
                                        (isActive > -1 ? 'seat-active' : "")
                                    )}
                                    onClick={() => handleChooseTicket(item)}
                                >
                                    {item.daDat ? "X" : item.tenGhe}
                                </div>
                            )
                        })
                    }
                </div>

                <div className='list-item-seat'>
                    <div className='seat'>
                        <button className='btn-booking'>X</button>
                        <p> Đã đặt</p>
                    </div>
                    <div className='seat'>
                        <button className='btn-normal'></button>
                        <p>Thường</p>
                    </div>
                    <div className='seat'>
                        <button className='btn-vip'></button>
                        <p>Vip</p>
                    </div>
                </div>

            </div>

            <div className='item-right'>
                <div className='item-child'>
                    <p className='money'>{caculateTicket(toJS(listTicketBook))}VND</p>
                </div>
                <div className='item-child item-seminar'>
                    <h3 className='name-left'> Cụm Rạp:</h3>
                    <p className='name-right'>{listRoom?.thongTinPhim?.tenCumRap}</p>
                </div>
                <div className='item-child item-seminar'>
                    <h3 className='name-left'> Địa chỉ:</h3>
                    <p className='name-right'>{listRoom?.thongTinPhim?.diaChi}</p>
                </div>
                <div className='item-child item-seminar'>
                    <h3 className='name-left'> Địa chỉ:</h3>
                    <p className='name-right'>{listRoom?.thongTinPhim?.tenRap} </p>
                </div>
                <div className='item-child item-seminar'>
                    <h3 className='name-left'>Ngày giờ chiếu:</h3>
                    <p className='name-right'>
                        <span className='date'>{listRoom?.thongTinPhim?.ngayChieu}</span> ~
                        <span className='time'> {listRoom?.thongTinPhim?.gioChieu}</span>
                    </p>
                </div>
                <div className='item-child item-seminar'>
                    <h3 className='name-left'>Tên Phim:</h3>
                    <p className='name-right'>{listRoom?.thongTinPhim?.tenPhim}</p>
                </div>
                <div className='item-child item-seminar'>
                    <h3 className='name-left'>Chọn:</h3>
                    Ghế:
                    {
                        toJS(listTicketBook).map((item: any, index: any) => {
                            return (
                                <div className='list-table'>
                                    {item.tenGhe}{index < listTicketBook.length - 1 ? "," : ""}
                                </div>
                            )
                        })
                    }
                </div>
                <div className='item-child'>
                    <button className='btn-book-ticket' onClick={handleBookTicket}> Đặt vé</button>
                </div>

            </div>
            {
                wraningChooseTicket &&
                <BasicModal
                    open={wraningChooseTicket}
                    onClose={() => setWraningChooseTicket(false)}
                    content={renderContentWarning()}
                />
            }
            {
                isTicketSucc &&
                <BasicModal
                    open={isTicketSucc}
                    onClose={() => setIsTickerSucc(false)}
                    content={renderContentBookSuccess()}
                />
            }
        </div >
    )
})

export default BookTicketPage;