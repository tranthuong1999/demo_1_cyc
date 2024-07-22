import { makeAutoObservable } from 'mobx';
const BASE_URL = "https://movie0706.cybersoft.edu.vn/api"
class MovieStore {
    listMovie = [];
    listCinema: any = [];
    listSysmtemCinema: any = [];
    listSheduleCinemaSystem: any = [];
    constructor() {
        makeAutoObservable(this);
    }
    fetchListMovie = async () => {
        try {
            const response = await fetch(`${BASE_URL}/QuanLyPhim/LayDanhSachPhim?maNhom=GP09`);
            const data: any = await response.json();
            this.listMovie = data;
        }
        catch (error) {
            console.error('Failed to fetch todos', error);
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
            console.error('Failed to fetch todos', error);
        }
    }

    fetchListSystemCinema = async () => {
        try {
            const response = await fetch(`${BASE_URL}/QuanLyRap/LayThongTinHeThongRap`);
            const data: any = await response.json();
            this.listSysmtemCinema = data;
        }
        catch (error) {
            console.error('Failed to fetch todos', error);
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
            console.error('Failed to fetch todos', error);
        }
    }

}

const movieStore = new MovieStore();
export default movieStore;