import React, { useState } from 'react';
import "./style.scss";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTheme } from "@mui/material/styles";
import { Avatar, Button, useMediaQuery } from "@mui/material";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DehazeIcon from '@mui/icons-material/Dehaze';
// @ts-ignore
import { Link } from 'react-scroll';
import classNames from 'classnames';
import LoginPage from '../Login';
import RegisterPage from '../Register';
import authenticationStore from '../../store/AuthenticationStore';
import { observer } from 'mobx-react-lite';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import LogoutPage from '../Logout';
import { deepOrange, deepPurple } from '@mui/material/colors';

const dataMenu = [
    { title: "Lịch chiếu", linkTo: "schedule" },
    { title: "Cụm rạp", linkTo: "cinemaSystem" },
    { title: "Tin tức", linkTo: "news" },
    { title: "Ứng dụng", linkTo: "app" },
]
const styleMenu = {
    color: 'red',
    backgroundColor: "#fff"
}

const MenuPage = observer(() => {
    const theme = useTheme();
    const isComputer = useMediaQuery(theme.breakpoints.up(1024));
    const isMobile = useMediaQuery(theme.breakpoints.down(600));
    const isTabnet = useMediaQuery(theme.breakpoints.between(600, 1024));
    const { openModalLogin, setOpenModalLogin, openModalLogout, openModalRegister, setOpenModalRegister, setOpenModalLogout, setIsLoginError } = authenticationStore;

    const currentUer = JSON?.parse(localStorage?.getItem("currentUser")!)

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {(!currentUer ? ['Đăng nhập', 'Đăng kí'] : [`${currentUer?.hoTen}`, "Đăng xuất"]).map((text, index) => (
                    <ListItem
                        key={text}
                        disablePadding
                        onClick={() => {
                            if (text == 'Đăng nhập') {
                                setOpenModalLogin(true)
                                setOpenModalRegister(false)
                                return;
                            }
                            if (text == "Đăng xuất") {
                                setOpenModalLogout(true)
                                return;
                            }
                            setOpenModalRegister(true);
                            setOpenModalLogin(false)
                        }}
                    >
                        <ListItemButton sx={{ '&:hover': styleMenu }}>
                            <ListItemIcon sx={{ '&:hover': styleMenu }}>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {dataMenu.map((item: any, index) => (
                    <ListItem key={item.title} disablePadding>
                        <Link to={item.linkTo} smooth={true} duration={1000}>
                            <ListItemButton sx={{ '&:hover': styleMenu }}>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div className={classNames("menu", (isMobile || isTabnet) ? "menu-screen-small" : "")}>
            <div className='menu-bar'>
                <div className='img-logo'>
                    <img src="https://demo1.cybersoft.edu.vn/logo.png" />
                </div>
                {
                    isComputer ?
                        (
                            <>
                                <div className='event-cinema'>
                                    <button className='btn'>
                                        <Link to="schedule" smooth={true} duration={1000}>
                                            Lịch chiếu
                                        </Link>
                                    </button>
                                    <button className='btn'>
                                        <Link to="cinemaSystem" smooth={true} duration={1000}>
                                            Cụm rạp
                                        </Link>
                                    </button>
                                    <button className='btn'>
                                        <Link to="news" smooth={true} duration={1000}>
                                            Tin tức
                                        </Link>
                                    </button>
                                    <button className='btn'>
                                        <Link to="app" smooth={true} duration={1000}>
                                            Ứng dụng
                                        </Link>
                                    </button>
                                </div>
                                <div className='event-user'>
                                    {
                                        !currentUer ?
                                            (
                                                <>
                                                    <Button startIcon={<AccountCircleIcon />} className='btn btn-login' onClick={() => { setOpenModalLogin(true); setOpenModalRegister(false); setIsLoginError(false) }}> Đăng nhập</Button>
                                                    <Button startIcon={<AccountCircleIcon />} className='btn' onClick={() => { setOpenModalRegister(true); setOpenModalLogin(false); setIsLoginError(false) }}>Đăng kí</Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Avatar src="https://mui.com/static/images/avatar/1.jpg" /><span className='current-user'>{currentUer?.hoTen} </span>
                                                    <Button startIcon={<ArrowCircleRightIcon />} className='btn' onClick={() => setOpenModalLogout(true)}> Đăng xuất </Button>
                                                </>
                                            )
                                    }

                                </div>
                            </>
                        )
                        :
                        (
                            <div>
                                <div onClick={toggleDrawer(!open)} className='icon-menu'>
                                    <DehazeIcon sx={{ color: "red" }} />
                                </div>
                                <Drawer open={open} onClose={toggleDrawer(false)}>
                                    {DrawerList}
                                </Drawer>
                            </div>
                        )
                }
            </div >
            {
                openModalLogin &&
                <LoginPage />
            }
            {
                openModalRegister &&
                <RegisterPage />
            }
            {
                openModalLogout && <LogoutPage />
            }
        </div >
    )
})

export default MenuPage;