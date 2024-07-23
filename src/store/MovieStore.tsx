import { makeAutoObservable } from 'mobx';
const BASE_URL = "https://movie0706.cybersoft.edu.vn/api"
type Ticket = {
    daDat: boolean,
    giaVe: number,
    loaiGhe: string,
    maGhe: number,
    maRap: number,
    stt: string,
    taiKhoanNguoiDat: string,
    tenGhe: string
}
type BookTicket = {
    maLichChieu?: string,
    account?: string,
    danhSachVe?: Ticket[]
}
class MovieStore {
    listMovie = [];
    listCinema: any = [];
    listSysmtemCinema: any = [];
    listSheduleCinemaSystem: any = [];
    listRoom: any = {};
    isBookingRoom: boolean = false;
    listTicketBook: any = [];
    listHistoryBooking: any = [];
    constructor() {
        makeAutoObservable(this);
    }

    setListTicketBook = (item?: Ticket, isClear?: boolean) => {
        const isExit = this.listTicketBook.findIndex((ticket: any) => ticket.maGhe === item?.maGhe)
        if (isExit === -1) {
            this.listTicketBook.push(item);
        }
        else {
            const _listTicketBook = [...this.listTicketBook]
            _listTicketBook.splice(isExit, 1)
            this.listTicketBook = _listTicketBook;
        }

        if (isClear) {
            this.listTicketBook = []
        }
    }

    fetchListMovie = async () => {
        try {
            const response = await fetch(`${BASE_URL}/QuanLyPhim/LayDanhSachPhim?maNhom=GP09`);
            const data: any = await response.json();
            this.listMovie = data;
        }
        catch (error) {
            console.error('fetchListMovie', error);
        }
    }

    fetchListCinema = async (movieCode: number) => {
        try {
            const response = await fetch(`${BASE_URL}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieCode}`);
            const data: any = await response.json();
            console.log("fetchListCinema", data)
            this.listCinema = data;
        }
        catch (error) {
            console.error('fetchListCinema', error);
        }
    }

    fetchListSystemCinema = async () => {
        try {
            const response = await fetch(`${BASE_URL}/QuanLyRap/LayThongTinHeThongRap`);
            const data: any = await response.json();
            this.listSysmtemCinema = data;
        }
        catch (error) {
            console.error('fetchListSystemCinema', error);
        }
    }

    fetchInforSheduleCinemaSystem = async (codeCinemeSystem: string) => {
        try {
            const response = await fetch(`${BASE_URL}/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${codeCinemeSystem}&maNhom=GP09`);
            const data: any = await response.json();
            console.log("data", data)
            this.listSheduleCinemaSystem = data;
        }
        catch (error) {
            console.error('fetchInforSheduleCinemaSystem', error);
        }
    }

    fetchInforTicketRoom = async (codeRoom: number) => {
        try {
            const response = await fetch(`${BASE_URL}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${codeRoom}`);
            const data: any = await response.json();
            this.listRoom = data;
        }
        catch (error) {
            console.error('fetchInforTicketRoom', error);
        }
    }

    apiBookingTicket = async (props: { data: BookTicket }) => {
        const { data } = props;
        const token = JSON.parse(localStorage.getItem("currentUser")!).accessToken
        try {
            const response = await fetch(`${BASE_URL}/QuanLyDatVe/DatVe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            const result: any = await response.json();
            this.isBookingRoom = true;
        }
        catch (error) {
            console.log("apiBookingTicket", error)
            this.isBookingRoom = false;
        }
    }

    apiFetchHistoryBookTicker = async (tuKhoa: string) => {
        try {
            const response = await fetch(`${BASE_URL}/QuanLyNguoiDung/ThongTinTaiKhoa`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(tuKhoa),
            });
            const data: any = await response.json();
            this.listHistoryBooking = data;
        }
        catch (error) {
            console.error('Failed to fetch todos', error);
        }
    }



}

const movieStore = new MovieStore();
export default movieStore;