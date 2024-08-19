import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../redux/sidebarReducer';
// import { AiFillMessage } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { IoNotifications } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const isOpen = useSelector(state => state.isOpen);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
        localStorage.setItem('isOpen', JSON.stringify(!isOpen));
    };

    return (
        <nav className="navbar navbar-light justify-content-between fixed-top" style={{ background: "#1976D3", height: "55px" }}>
            <div className="d-flex align-items-center">
                <i className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'}`} id="btn" onClick={handleToggleSidebar} style={{ color: 'white', fontSize: '25px' }}></i>
                <h5 className="text-white ml-3 mb-0">Food For Everyone</h5>
            </div>
            <div className="d-flex">
                {/* <div onClick={() => navigate('/requestedDonation')} className='listDiv'>
                    <AiFillMessage style={{ color: "white", fontSize: "22px", cursor: "pointer" }} className="mx-2" />
                </div> */}
                <div className='listDiv'>
                    <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                        <IoNotifications style={{ color: "white", fontSize: "22px", cursor: "pointer" }} className="mx-2" />
                    </button>
                    <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Notifications</h5>
                            <button type="button" className="btn-close text-danger" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <div className="alert alert-primary" role="alert">
                                A simple primary alert—check it out!
                            </div>
                            <div className="alert alert-secondary" role="alert">
                                A simple primary alert—check it out!
                            </div>
                            <div className="alert alert-success" role="alert">
                                A simple primary alert—check it out!
                            </div>
                            <div className="alert alert-warning" role="alert">
                                A simple primary alert—check it out!
                            </div>
                            <div className="alert alert-info" role="alert">
                                A simple primary alert—check it out!
                            </div>
                        </div>
                    </div>
                </div>

                <div onClick={() => navigate('/profile')} className='listDiv'>
                    <FaUserCircle style={{ color: "white", fontSize: "22px", cursor: "pointer" }} className="mx-2 mt-2" />
                </div>
            </div>

        </nav>
    );
}

export default Navbar;
