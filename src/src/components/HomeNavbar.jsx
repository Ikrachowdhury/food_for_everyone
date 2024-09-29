import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function HomeNavbar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-light justify-content-between fixed-top" style={{ background: "#1976D3", height: "55px" }}>
            <div className="d-flex align-items-center">
                <h5 className="text-white ml-3 mb-0">Food For Everyone</h5>
            </div>
            <div className="d-flex me-5" style={{cursor:"pointer"}}>
                <div onClick={() => navigate('/home')} className='listDiv d-flex align-items-center'>
                    <FaHome style={{ color: "white", fontSize: "22px" }} className="mx-2" />
                    <h5 className='mb-0 text-white'>Home</h5>
                </div>
            </div>
        </nav>
    );
}

export default HomeNavbar;
