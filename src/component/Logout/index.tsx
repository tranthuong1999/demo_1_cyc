import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import authenticationStore from '../../store/AuthenticationStore';
import BasicModal from '../Modal';
import './style.scss';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// @ts-ignore
import AOS from 'aos';
import 'aos/dist/aos.css';


const LogoutPage = observer(() => {

    const { openModalLogout, setOpenModalRegister, setOpenModalLogout } = authenticationStore;

    useEffect(() => {
        AOS.init({
            duration: 1000
        });
    }, []);


    const handleConfirmLogout = () => {
        localStorage.clear()
        setOpenModalLogout(false)
    }

    const handleCancelLogout = () => {
        setOpenModalLogout(false)
    }

    const renderContentLogout = () => {
        return (
            <div className="logout-page">

                <div data-aos="flip-right">
                    <HelpOutlineIcon sx={{ width: 70, height: 70, color: "#87adbd", borderColor: "#c9dae1" }} />
                </div>
                <h4 className='title'>Bạn có chắc chắn muốn đăng xuất?</h4>
                <div className='list-button'>
                    <button className='btn btn-confirm' onClick={handleConfirmLogout}>Đồng ý</button>
                    <button className='btn btn-cancel' onClick={handleCancelLogout}>Huỷ bỏ</button>
                </div>
            </div>
        )
    }


    return (
        <BasicModal
            open={openModalLogout}
            onClose={() => setOpenModalRegister(false)}
            content={renderContentLogout()}
        />
    )
})

export default LogoutPage;