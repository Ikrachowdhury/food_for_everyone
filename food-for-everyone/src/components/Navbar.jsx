import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../redux/sidebarReducer';
// import { AiFillMessage } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { IoNotifications } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function Navbar() {
    const isOpen = useSelector(state => state.isOpen);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [notification, setNotification] = useState([]); // Initialize as an array
    const [hasNewNotification, setHasNewNotification] = useState(
        JSON.parse(localStorage.getItem('hasNewNotification')) || false // Retrieve from localStorage or set to false
    );
    const prevNotificationLength = useRef(notification.length);

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
        localStorage.setItem('isOpen', JSON.stringify(!isOpen));
    };

    useEffect(() => {
        // Compare notification lengths
        if (notification.length !== prevNotificationLength.current) {
            setHasNewNotification(true); 
            localStorage.setItem('hasNewNotification', JSON.stringify(true));
        }
        prevNotificationLength.current = notification.length; 

    }, [notification]);

    // Reset notification state when user views the notifications
    const handleViewNotifications = () => {
        setHasNewNotification(false); // Reset when user views notifications
        localStorage.setItem('hasNewNotification', JSON.stringify(false)); // Also reset in localStorage
    };


    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                const response = await fetch(`http://localhost:8000/api/getNotification/${user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setNotification(result.notifications);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchProfileData();
        const intervalId = setInterval(fetchProfileData, 1000); 
        return () => clearInterval(intervalId);
    }, []);


    // useEffect(() => {
    //     const fetchProfileData = async () => {
    //         try {
    //             const user_id = localStorage.getItem('user_id');
    //             const response = await fetch(`http://localhost:8000/api/getNotification/${user_id}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Accept': 'application/json',
    //                 },
    //             });

    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const result = await response.json();
    //             setNotification(result.notifications)
    //         } catch (error) {
    //             console.log(error.message);
    //         }
    //     };
    //     fetchProfileData();
    // }, []);


    return (
        <nav className="navbar navbar-light justify-content-between fixed-top" style={{ background: "#1976D3", height: "55px" }}>
            <div className="d-flex align-items-center">
                <i className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'}`} id="btn" onClick={handleToggleSidebar} style={{ color: 'white', fontSize: '25px' }}></i>
                <h5 className="text-white ml-3 mb-0">Food For Everyone</h5>
            </div>
            <div className="d-flex">
                <div className='listDiv'>
                    <button
                        className="btn"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasScrolling"
                        aria-controls="offcanvasScrolling"
                        // onClick={() => setHasNewNotification(false)}  
                        onClick={handleViewNotifications}
                    >
                        <IoNotifications
                            style={{
                                color: hasNewNotification ? "red" : "white",
                                fontSize: "22px",
                                cursor: "pointer"
                            }}
                            className="mx-2"
                        />
                    </button>
                    <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Notifications</h5>
                            <button type="button" className="btn-close text-danger" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body offcanvas-body-scroll">
                            {notification.length > 0 ? (
                                notification.map((alert, index) => (
                                    <div key={index} className={`alert alert-${alert.status} mx-3r`} role="alert">
                                        {alert.description}
                                    </div>
                                ))
                            ) : (
                                <div className='mx-5 text-danger'>No Notification</div>
                            )}
                        </div>
                    </div>
                </div>
                {/* <div className='listDiv'>
                    <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                        <IoNotifications style={{ color: "white", fontSize: "22px", cursor: "pointer" }} className="mx-2" />
                    </button>
                    <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Notifications</h5>
                            <button type="button" className="btn-close text-danger" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body offcanvas-body-scroll" >
                            {notification.length > 0 ? (
                                notification.map((alert, index) => (
                                    <div key={index} className={`alert alert-${alert.status} mx-3r`} role="alert">
                                        {alert.description}
                                    </div>
                                ))
                            ) : (
                                <div className='mx-5 text-danger'>No Notification</div>
                            )}
                        </div>
                    </div>
                </div> */}

                <div onClick={() => navigate('/profile')} className='listDiv'>
                    <FaUserCircle style={{ color: "white", fontSize: "22px", cursor: "pointer" }} className="mx-2 mt-2" />
                </div>
            </div>

        </nav>
    );
}

export default Navbar;
