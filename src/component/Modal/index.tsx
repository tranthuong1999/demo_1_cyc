import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ReactPlayer from 'react-player';
import classNames from "classnames";
import './style.scss';
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// box ? : tại sao không thêm được class vào box
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    minHeight: 400,
    outline: 0,
    border: null,
    borderRadius: 1,
    backgroundColor: " #fff"
};

export default function BasicModal(props: { open: boolean, onClose?: () => void, width?: string, urlVideo?: string, content?: any }) {
    const { open, onClose, width, urlVideo, content } = props;
    const theme = useTheme();
    const isTabnet = useMediaQuery(theme.breakpoints.between(600, 1024));
    const isMobile = useMediaQuery(theme.breakpoints.down(600));
    const isComputer = useMediaQuery(theme.breakpoints.up(1024));

    return (
        <Modal
            open={open}
            onClose={onClose}
            className='moadal-basic-common'
        >
            <div
                className={classNames('box', isTabnet ? "box-tabnet" : "", isMobile ? "box-mobile" : "")}
            >
                {
                    urlVideo ? (
                        <ReactPlayer
                            // @ts-ignore
                            url={urlVideo}
                            className={classNames('video-youtube', isTabnet ? "video-youtube-tabnet" : "", isMobile ? "video-youtube-mobile" : "")}
                        />) : (
                        <Box sx={style}>
                            {content}
                        </Box>
                    )
                }
                {urlVideo && <div className={classNames('icon-close', (isTabnet || isMobile) ? 'icon-close-hidden' : "")} onClick={onClose}>
                    <CloseIcon sx={{ width: 35, height: 35 }} />
                </div>}
            </div>
        </Modal>
    );
}