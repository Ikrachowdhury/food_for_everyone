import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

export default function ReceiverHistory() {
    return (
        <div>
            <Navbar />
            <div className="homePage d-flex">
                <Sidebar />
                <div className="main-content">
                    <div >
                        Receiver History
                    </div>
                </div>
            </div>
        </div>
    )
}
