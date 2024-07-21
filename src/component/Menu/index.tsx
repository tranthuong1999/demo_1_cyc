import React from 'react';
import "./style.scss";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTheme } from "@mui/material/styles";
import { Button, useMediaQuery } from "@mui/material";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DehazeIcon from '@mui/icons-material/Dehaze';

const MenuPage = () => {

    const theme = useTheme();
    const isComputer = useMediaQuery(theme.breakpoints.up(1024));



    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {['Đăng nhập', 'Đăng kí'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Lịch chiếu', 'Cụm rạp', 'Tin tức', "Ứng dụng"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div className='menu-bar'>
            <div className='img-logo'>
                <img src="https://demo1.cybersoft.edu.vn/logo.png" />
            </div>
            {
                isComputer ?
                    (
                        <>
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
                        </>
                    )
                    :
                    (
                        <div>
                            <div onClick={toggleDrawer(true)} className='icon-menu'>
                                <DehazeIcon sx={{ color: "red" }} />
                            </div>
                            <Drawer open={open} onClose={toggleDrawer(false)}>
                                {DrawerList}
                            </Drawer>
                        </div>
                    )
            }
        </div >
    )


}

export default MenuPage;