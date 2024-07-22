import React from 'react'
import { useNavigate } from "react-router-dom";
import "./style.scss"
import MenuPage from '../Menu';

const PurchasePage = () => {

    const navigate = useNavigate();


    return (
        <div className='purchase-ticket'>
            <MenuPage />
            PurchasePage
        </div>
    )
}

export default PurchasePage