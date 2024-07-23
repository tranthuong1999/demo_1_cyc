import { observer } from 'mobx-react-lite';
import MenuPage from '../Menu';
import bgr_login from '../../assets/bgr-main.jpg'
import BasicModal from '../Modal';


const HistoryTickerPage = observer(() => {

    const renderViewHistoryTicker = () => {
        return (
            <div>
                abcd
            </div>
        )
    }

    return (
        <div className='history-book-ticket'>
            <img src={bgr_login} style={{ width: "100%", minHeight: "1100px", objectFit: "cover" }} />
            <MenuPage />
            <BasicModal
                open={true}
                content={renderViewHistoryTicker()}
            />
        </div>
    )
})

export default HistoryTickerPage;