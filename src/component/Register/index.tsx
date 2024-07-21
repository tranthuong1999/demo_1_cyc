import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import BasicModal from '../Modal';
import authenticationStore from '../../store/AuthenticationStore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import "./style.scss";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import DoneIcon from '@mui/icons-material/Done';

const RegisterPage = observer((props: { open?: boolean, onClose?: () => void }) => {
    const { open, onClose } = props;
    const [credentials, setCredentials] = useState({
        taiKhoan: '',
        matKhau: '',
        confirmPassWord: "",
        email: "",
        hoTen: "",
        maLoaiNguoiDung: "",
        maNhom: "GP09",
    });
    const { apiRegister, userInfoErr } = authenticationStore;
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [registerSucess, setRegisterSucess] = useState(false)

    useEffect(() => {
        if (registerSucess) {
            const timer = setTimeout(() => {
                setRegisterSucess(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [registerSucess]);

    const handleChange = (e: any) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await apiRegister({ data: credentials })
        setRegisterSucess(true)
    };

    const renderFormRegister = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className='register-page'>
                    <AccountCircleIcon sx={{ color: "#fb4226", width: 50, height: 50 }} />
                    <h6 className='title-login'> Đăng ký</h6>
                    <TextField
                        required
                        label="Tài khoản"
                        placeholder="Tài khoản"
                        className='account'
                        name="taiKhoan"
                        value={credentials.taiKhoan}
                        onChange={handleChange}
                    />
                    <OutlinedInput
                        required
                        className="password"
                        name="matKhau"
                        value={credentials.matKhau}
                        onChange={handleChange}
                        placeholder="Mật khẩu"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                    <OutlinedInput
                        required
                        className="confirm-password"
                        name="confirmPassWord"
                        value={credentials.confirmPassWord}
                        onChange={handleChange}
                        placeholder="Xác nhận mật khẩu"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Confirm Password"
                    />
                    <TextField
                        required
                        label="Họ tên"
                        placeholder="Họ tên"
                        className='names'
                        name="hoTen"
                        value={credentials.hoTen}
                        onChange={handleChange}
                    />
                    <TextField
                        type="email"
                        required
                        label="Email"
                        placeholder="Email"
                        className='email'
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                    />
                    <button className='btn-login' type="submit">Đăng ký</button>
                    <div className='sign-up'>
                        <a href="">Bạn đã có tài khoản? Đăng nhập</a>
                    </div>
                </div>
            </form>
        )
    }

    const renderFormRegisterSucess = () => {
        return (
            <div className="register-sucess">
                <DoneIcon sx={{ color: "#1da1f2c2", width: 50, height: 50 }} />
                <h6 className='title-succ'> Đăng kí thành công</h6>
                <button className='btn-close'> Đóng </button>
            </div>
        )
    }

    return (
        <div>
            <BasicModal
                open={open!}
                onClose={onClose}
                content={renderFormRegister()}
            />
            {
                registerSucess &&
                <BasicModal
                    open={registerSucess}
                    onClose={() => setRegisterSucess(false)}
                    content={renderFormRegisterSucess()}
                />
            }
        </div>

    );
});

export default RegisterPage;
