import { observer } from 'mobx-react-lite';
import "./style.scss"
import MenuPage from '../Menu';
import { useParams } from 'react-router-dom';


const BookTicketPage = observer(() => {
    const { code } = useParams();


    return (
        <div className='book-ticket-page'>
            <MenuPage />
            Buy Tickit
        </div>
    )
})

export default BookTicketPage;