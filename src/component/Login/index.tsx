import React, { useState } from 'react';
import { observer } from 'mobx-react';
import BasicModal from '../Modal';
import authenticationStore from '../../store/AuthenticationStore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import "./style.scss";
import { Visibility, VisibilityOff } from '@mui/icons-material';




const LoginPage = observer(() => {
    const [credentials, setCredentials] = useState({ taiKhoan: '', matKhau: '' });
    const { apiLogin, openModalLogin, setOpenModalLogin } = authenticationStore;
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleChange = (e: any) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log("credentials", credentials)
        await apiLogin({ data: credentials });
    };

    const renderFormLogin = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className='login-page'>
                    <AccountCircleIcon sx={{ color: "#fb4226", width: 50, height: 50 }} />
                    <h6 className='title-login'> Đăng nhập</h6>
                    <TextField
                        required
                        label="Required"
                        placeholder="Tài khoản"
                        className='account'
                        name="taiKhoan"
                        value={credentials.taiKhoan}
                        onChange={handleChange}
                    />
                    <OutlinedInput
                        className='password'
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
                    <button className='btn-login' type="submit">Đăng nhập</button>
                    <div className='sign-up'>
                        <a href=""> Bạn chưa có tài khoản? Đăng ký</a>
                    </div>
                </div>
            </form>
        )
    }

    return (
        <BasicModal
            open={openModalLogin}
            onClose={() => setOpenModalLogin(false)}
            content={renderFormLogin()}
        />
    );
});

export default LoginPage;
