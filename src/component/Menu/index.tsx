import React from 'react';
import "./style.scss";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';

const MenuPage = () => {
    return (
        <div className='menu-bar'>
            <div className='img-logo'>
                <img src="https://demo1.cybersoft.edu.vn/logo.png" />
            </div>
            <div className='event-cinema'>
                <button className='btn'> Lịch chiếu</button>
                <button className='btn'> Cụm rạp</button>
                <button className='btn'> Tin tức</button>
                <button className='btn'>Ứng dụng</button>
            </div>
            <div className='event-user'>
                <Button startIcon={<AccountCircleIcon />} className='btn btn-login'> Đăng nhập</Button>
                <Button startIcon={<AccountCircleIcon />} className='btn'>Đăng kí</Button>
            </div>

        </div >
    )
}

export default MenuPage;