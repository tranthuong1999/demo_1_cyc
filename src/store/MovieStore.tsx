
import { makeAutoObservable } from 'mobx';

const BASE_URL = "https://movie0706.cybersoft.edu.vn/api"


class MovieStore {
    listMovie = [];
    listCinema: any = [];
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
            console.log("list ciname", data)
            this.listCinema = data;
        }
        catch (error) {
            console.error('Failed to fetch todos', error);
        }
    }
}

const movieStore = new MovieStore();
export default movieStore;