import React from 'react';
import "./style.scss";
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate()
    return (
        <div className='not-found-page'>
            <p className='title-err'> 404</p>
            <div className='img-logo'>
                <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" />
            </div>
            <h1 className='header'>Có gì đó sai ở đây</h1>
            <button className='btn-error' onClick={() => navigate("/")}>Quay về trang chủ</button>
        </div>
    )
}

export default NotFoundPage