import { makeAutoObservable } from 'mobx';
const BASE_URL = "https://movie0706.cybersoft.edu.vn/api"

type Register = {
    confirmPassWord: string,
    email: string,
    hoTen: string,
    maLoaiNguoiDung: string,
    maNhom: string,
    matKhau: string,
    taiKhoan: string
}

type SignIn = {
    matKhau: string,
    taiKhoan: string
}

class AuthenticationStore {
    currentUser = {};
    userInfo = {};
    openModalLogin: boolean = false;
    openModalRegister: boolean = false;
    isLoginErr: boolean = false;
    openModalLogout: boolean = false;
    userInfoErr: any = {}
    constructor() {
        makeAutoObservable(this);
    }

    setOpenModalLogin = (status: boolean) => {
        this.openModalLogin = status;
    }
    setIsLoginError = (status: boolean) => {
        this.isLoginErr = status;
    }
    setOpenModalLogout = (status: boolean) => {
        this.openModalLogout = status;
    }

    setOpenModalRegister = (status: boolean) => {
        this.openModalRegister = status;
    }

    apiLogin = async (props: { data: SignIn }) => {
        const { data } = props;
        try {
            const response = await fetch(`${BASE_URL}/QuanLyNguoiDung/DangNhap`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result: any = await response.json();
            this.currentUser = result;
            this.isLoginErr = false;
            localStorage.setItem("currentUser", JSON.stringify(result));
        }
        catch (error) {
            this.isLoginErr = true;
        }
    }

    apiRegister = async (props: { data: Register }) => {
        const { data } = props;
        try {
            const response = await fetch(`${BASE_URL}/QuanLyNguoiDung/DangKy`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result: any = await response.json();
            this.userInfo = result;
        }
        catch (error) {
            console.error('Failed to fetch todos', error);
            this.userInfoErr = error;
        }
    }


}

const authenticationStore = new AuthenticationStore();
export default authenticationStore;