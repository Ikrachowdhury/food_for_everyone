import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import "../../assets/css/RiderDashboard.css"
import check from "../../images/check.png"
import truck from "../../images/truck.png"
import error from "../../images/error.png"
import { useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { FaLocationDot, FaSquarePhone } from 'react-icons/fa6';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { CiMenuKebab } from 'react-icons/ci';
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJtYW4yOTYiLCJhIjoiY20wOWYwejBlMTJhajJrb21qOTR0YWYxYSJ9.2NVdAp3kdgwt2g9WBZeBJw';
import { useNavigate } from 'react-router-dom';

export default function RiderDashboard() {
    const [active, setActive] = useState('no');
    const [totalDelivery, setTotalDelivery] = useState(0);
    const [totalPending, setTotalPending] = useState(0);
    const [totalCanceled, setTotalCanceled] = useState(0);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [data, setData] = useState({ doneeInfo: {}, donorInfo: {} });
    const [requestedPostData, setRequestedPostData] = useState({ doneeInfo: {}, donorInfo: {} });
    const [mapData, setMapData] = useState({ origin: null, destination: null });
    const user_id = localStorage.getItem('user_id');
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const handleContactButtonClick = (donation_id, reciever_id) => { 
        navigate('/message', { state: { reciever_id , donation_id} });
      };
    if (count === 0) {
        setCount(1);
        handleAvailability("no");
    }

    const handleShowMapModal = (post_lon,post_lat, donee) => {
        const origin = [post_lon, post_lat];
        const destination = [donee.address_lon, donee.address_lat];
        console.log('Setting mapData:', { origin, destination });
        setMapData({
            origin,
            destination,
        });
    };

    useEffect(() => {
        const modalElement = document.getElementById('mapModal');
        const handleMapLoad = () => {
            if (!mapContainer.current) {
                console.error("Map container is not available.");
                return;
            }
            console.log("Initializing map...");
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: mapData.origin,
                zoom: 10,
            });

            const directions = new MapboxDirections({
                accessToken: mapboxgl.accessToken,
                unit: 'metric',
                profile: 'mapbox/driving',
                interactive: false,
                controls: {
                    instructions: false,
                },
            });

            map.current.addControl(directions, 'top-left');
            map.current.on('load', () => {
                console.log(mapData.origin);
                if (mapData.origin && mapData.destination) {
                    directions.setOrigin(mapData.origin);
                    directions.setDestination(mapData.destination);
                }
            });

            const handleGeolocation = (position) => {
                const { longitude, latitude } = position.coords;
                map.current.setCenter([longitude, latitude]);
                directions.setOrigin([longitude, latitude]);
            };

            const handleGeolocationError = () => {
                map.current.setCenter([-2.24, 53.48]);
            };

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(handleGeolocation, handleGeolocationError, {
                    enableHighAccuracy: true,
                });
            } else {
                handleGeolocationError();
            }
        };

        const handleModalShown = () => {
            if (!map.current) {
                handleMapLoad();
            } else {
                setTimeout(() => {
                    if (map.current) {
                        map.current = null;
                    }
                }, 200);
            }
        };

        const handleResize = () => {
            if (map.current) {
                map.current.resize();
            }
        };

        if (modalElement) {
            modalElement.addEventListener('shown.bs.modal', handleModalShown);
        } else {
            console.error("Modal element is not found.");
        }
        window.addEventListener('resize', handleResize);
        return () => {
            if (map.current) map.current.remove();
            if (modalElement) {
                modalElement.removeEventListener('shown.bs.modal', handleModalShown);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, [mapData]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/riderRunningDetails/${user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                if (response.status != 200) {
                    throw new Error('Network response was not ok');
                }
                if (response.status === 200) {
                    const result = await response.json();
                    setData(result);
                }
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/riderRequestedPostDetails/${user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                if (response.status != 200) {
                    throw new Error('Network response was not ok');
                }
                if (response.status === 200) {
                    const result = await response.json();
                    setRequestedPostData(result);
                }

            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch(`http://localhost:8000/api/riderTotalDelivery/${user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                if (response.status != 200) {
                    throw new Error('Network response was not ok');
                }
                if (response.status === 200) {
                    const result = await response.json();
                    setTotalDelivery(result.delivered_count)
                    setTotalPending(result.pending_count)
                    setTotalCanceled(result.canceled_count)
                }

            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    async function handleDelevered(req_id) {
        try {
            let item = { req_id };
            console.log(req_id)
            let response = await fetch("http://localhost:8000/api/riderDelivery", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            });

            let result = await response.json();
            console.log("Response:", result);

            if (response.status === 200) {
                // setDeliveryConfirmModal(false)
                window.location.reload();
                console.log("Password Changed Successfully");
            } else {
                console.log("An error occured during  the process");
                // setNumberToast(true);
                console.error("Failed to reset password", result);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
    async function riderPickedFood(req_id) {
        try {
            let item = { req_id };
            console.log(req_id)
            let response = await fetch("http://localhost:8000/api/riderPickedFood", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            });

            let result = await response.json();
            console.log("Response:", result);

            if (response.status === 200) {
                console.log("Successful Successfully");
            } else {
                console.log("An error occured during the process");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    async function handleRequestAccept(req_id, donationID) {
        try {
            let item = { req_id, donationID };
            // console.log(req_id)
            let response = await fetch("http://localhost:8000/api/riderAcceptRequest", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            });

            let result = await response.json();
            console.log("Response:", result);

            if (response.status === 200) {
                // setDeliveryConfirmModal(false)
                window.location.reload();
                console.log("Accepted Successfully");
            } else {
                console.log("An error occured during  the process");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    async function handleAvailability(updatedActive) {
        try {
            let item = { user_id, active: updatedActive };
            console.log(item.active);
            let response = await fetch("http://localhost:8000/api/riderAvailability", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            });
            console.log(response);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    // function haversineDistance(lat1, lon1, lat2, lon2) {
    //     const toRadians = (degree) => (degree * Math.PI) / 180;

    //     const R = 6371;
    //     const dLat = toRadians(lat2 - lat1);
    //     const dLon = toRadians(lon2 - lon1);

    //     const a =
    //         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //         Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    //         Math.sin(dLon / 2) * Math.sin(dLon / 2);

    //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    //     const distance = R * c;
    //     return distance;
    // }

    const handleRejectDeliveryRequest = async (donationID) => {
        console.log(donationID)
        //sets requested donation to pickup as rider cancelled
        const url = 'http://localhost:8000/api/rejectDelivery'; 
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ donationID })
            });
            let result = await response.json();
            console.log("Result:", result);

            //deleted the previously created inboxes for rider
            let response2 = await fetch(`http://localhost:8000/api/deleteInboxes/${donationID}/${user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }); 
            if (response.status === 200) {
                const result2 = await response2.json(); 
                console.log(result2)
            }  
            //creates new inbox for the doner and donee
            requestedPostData.forEach(async (item) => { 
                if (item.donation_id === donationID) {
                    const formData = new FormData(); 
                    formData.append("doner_id", item.donorInfo.id);
                    formData.append("reciever_id", item.doneeInfo.id);
                    formData.append("donation_id", item.donation_id);
                    formData.append("masg_type", "onRun");
            
                    let response3 = await fetch("http://localhost:8000/api/createInbox", {
                        method: 'POST',
                        body: formData,
                        headers: {
                            "Accept": 'application/json'
                        }
                    });
            
                    let result3 = await response3.json();
                    console.log("Result:", result3);
                    window.location.reload();
                }
            });
            
                 
                 // if (response.status === 200) {
            //     const postLocation = result.post_location[0];
            //     const postLat = postLocation.location_lat;
            //     const postLon = postLocation.location_lon;
            //     let minDistance = Infinity;
            //     let minRiderId = null;

            //     result.rider_locations.forEach(rider => {
            //         const riderLat = rider.address_lat;
            //         const riderLon = rider.address_lon;

            //         const distance = haversineDistance(postLat, postLon, riderLat, riderLon);

            //         if (distance < minDistance) {
            //             minDistance = distance;
            //             minRiderId = rider.id;
            //         }
            //     });

            //     console.log(minRiderId)
            //     try {
            //         let item = { donationID, minRiderId };
            //         console.log(item);
            //         let response = await fetch("http://localhost:8000/api/selectRider", {
            //             method: 'POST',
            //             headers: {
            //                 "Content-Type": "application/json",
            //                 "Accept": "application/json"
            //             },
            //             body: JSON.stringify(item)
            //         });
            //         if (response.status === 200) {
            //             window.location.reload();
            //         }
            //         console.log(response);
            //     } catch (error) {
            //         console.error("An error occurred:", error);
            //     }
            // } else {
            //     alert('Error: ' + result.message);
            // }

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while accepting the donation. ' + error.message);
        }
    };
    return (
        <div>
            <Navbar />
            <div className="homePage d-flex">
                <Sidebar />
                <div className="main-content mt-5 riderMain">
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <div>
                            <h5 className="mb-0">{requestedPostData.length > 0 ? 'Request' : ''}</h5>
                        </div>
                        <div className="btn-group my-2 d-flex justify-content-center" role="group">
                            <button
                                type="button"
                                className={`btn ${active === 'yes' ? 'active-btn' : 'inactive-btn'}`}
                                onClick={() => {
                                    setActive('yes');
                                    handleAvailability('yes');
                                }}
                                style={{ width: "120px", height: "40px" }}
                            >
                                Available
                            </button>
                            <button
                                type="button"
                                className={`btn ${active === 'no' ? 'active-btn' : 'inactive-btn'}`}
                                onClick={() => {
                                    setActive('no');
                                    handleAvailability("no");
                                }}
                                style={{ width: "100px", height: "40px" }}
                            >
                                Unavailable
                            </button>

                        </div>
                    </div>
                    <div>
                        {requestedPostData.length > 0 ? (
                            requestedPostData.map((item, index) => (
                                <div key={index} className="row mt-3">
                                    <div className="card shadow p-3 d-flex flex-row align-items-center justify-content-between BackgroundColor">
                                        <div className="d-flex flex-column justify-content-center">
                                            <h6 className='mb-3'><span className='text-muted'>Donor:</span> {item.donorInfo.name}</h6>
                                            <h6 className='mb-0'><span className='text-muted'>Donee:</span> {item.doneeInfo.name}</h6>
                                        </div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <h6 className='mb-3'><span className='text-muted'>Pickup Location:</span> {item.donorInfo.address}</h6>
                                            <h6 className='mb-0'><span className='text-muted'>Delivery Location:</span> {item.doneeInfo.address}</h6>
                                        </div>
                                        <div className="d-flex justify-content-center text-center me-3">
                                            <button type="button" className='mb-0 text-primary mx-2' data-bs-toggle="modal" data-bs-target="#mapModal" onClick={() => handleShowMapModal(item.post_lon, item.post_lat, item.doneeInfo)}>Map</button>

                                            <button className='mb-0 text-success mx-2' onClick={() => {
                                                const modalElement = new window.bootstrap.Modal(document.getElementById('acceptDelivery'));
                                                modalElement.show();
                                            }} >Accept</button>
                                            {/* <button type="button" className='mb-0 text-success mx-2'>Accept</button> */}

                                            <button type="button" className='mb-0 text-danger mx-2' onClick={() => handleRejectDeliveryRequest(item.donation_id)}>Deny</button>
                                        </div>
                                    </div>
                                    <div className="modal fade" id="acceptDelivery" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLongTitle">Confirmation</h5>
                                                    <button type="button" className="close text-danger" data-bs-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <div>
                                                        Please confirm that you want to deliver the order
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        data-bs-dismiss="modal" onClick={() => handleRequestAccept(item.req_id, item.donation_id)}>
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            ""
                        )}
                    </div>
                    <div className='mt-5'>
                        <h5 className="mb-0">Delivery Status</h5>
                    </div>
                    <div className="row mt-3">
                        <div className="col-4">
                            <div className="card shadow rounded px-5 d-flex flex-row align-items-center py-3 BackgroundColor">
                                <div className="d-flex align-items-center me-3">
                                    <img src={check} alt="Delivered" style={{ height: "45px" }} />
                                </div>
                                <div className="d-flex flex-column justify-content-center ms-3">
                                    <h4 className='mb-0'>{totalDelivery}</h4>
                                    <p className='mb-0 text-muted fw-bold'>Delivered</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card shadow rounded px-5 d-flex flex-row align-items-center py-3 BackgroundColor">
                                <div className="d-flex align-items-center me-3">
                                    <img src={truck} alt="Out for Delivery" style={{ height: "50px" }} />
                                </div>
                                <div className="d-flex flex-column justify-content-center ms-3">
                                    <h4 className='mb-0'>{totalPending}</h4>
                                    <p className='mb-0 text-muted fw-bold'>Running Delivery</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card shadow rounded px-5 d-flex flex-row align-items-center py-3 BackgroundColor">
                                <div className="d-flex align-items-center me-3">
                                    <img src={error} alt="Failed Order" style={{ height: "50px" }} />
                                </div>
                                <div className="d-flex flex-column justify-content-center ms-3">
                                    <h4 className='mb-0'>{totalCanceled}</h4>
                                    <p className='mb-0 text-muted fw-bold'>Failed Order</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-5'>
                        <h5 className="mb-0">{data.length > 0 ? 'Running Delivery' : ''}</h5>
                        <div className="row g-0 mt-3">
                            {isLoading ? (
                                <div className="centered-content">
                                    <div className="text">Loading...</div>
                                </div>
                            ) :
                                data.length > 0 ? (
                                    data.map((item, index) => (
                                        <div className="col-md-6 mb-4" key={index}>
                                            <div className="card shadow rounded runningCard me-2">
                                                <div className='d-flex justify-content-between  mt-2'>
                                                    <button type="button" className='mb-0 text-success ms-3' data-bs-toggle="modal" data-bs-target="#mapModal" onClick={() => handleShowMapModal(item.post_lon, item.post_lat, item.doneeInfo)}>Map</button>
                                                    <div className="d-flex align-items-center justify-content-center mx-5">
                                                        <div className="dropdown">
                                                            <CiMenuKebab
                                                                id="dropdownMenuButton"
                                                                data-bs-toggle="dropdown"
                                                                aria-expanded="false"
                                                                style={{ cursor: 'pointer' }}
                                                            />
                                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <li><button className="dropdown-item text-danger" onClick={() => riderPickedFood(item.req_id)}
                                                                >Picked</button></li>
                                                                <li ><button className="dropdown-item text-success" onClick={() => {
                                                                    const modalElement = new window.bootstrap.Modal(document.getElementById('staticBackdrop'));
                                                                    modalElement.show();
                                                                }}>Delivered</button></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    {/* <button className='mb-0 text-success me-3' onClick={() => {
                                                    const modalElement = new window.bootstrap.Modal(document.getElementById('staticBackdrop'));
                                                    modalElement.show();
                                                }} >Delivered</button> */}
                                                </div>
                                                <div className="row mt-1 mx-4">
                                                    <div className="col-12">
                                                        <div className="card shadow-sm rounded innerCard p-3">
                                                            <div className='d-flex justify-content-between'>
                                                                <h6 className='mb-0'>Pickup Information</h6>
                                                                <a href="" className='riderMessageLink' onClick={() => handleContactButtonClick(item.donation_id,item.donorInfo.id)}style={{ textDecoration: "none" }}>Message A</a>
                                                            </div>
                                                            <hr />
                                                            <div className='d-flex align-items-center mb-3'>
                                                                <h6 className='mb-0 me-2 d-flex align-items-center'><FaUser className='me-2' style={{ color: "blue" }} /> Name:</h6>
                                                                <p className='mb-0'>{item.donorInfo.name}</p>
                                                            </div>
                                                            <div className='d-flex align-items-center mb-3'>
                                                                <h6 className='mb-0 me-2 d-flex align-items-center'><FaSquarePhone className='me-2' style={{ color: "green" }} /> Number:</h6>
                                                                <p className='mb-0'>{item.donorInfo.phone}</p>
                                                            </div>
                                                            <div className='d-flex'>
                                                                <h6 className='mb-0 me-2 d-flex align-items-center'><FaLocationDot className='me-2' style={{ color: "red" }} />Address:</h6>
                                                                <p className='mb-0'>{item.donorInfo.address}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row my-3 mx-4">
                                                    <div className="col-12">
                                                        <div className="card shadow-sm rounded innerCard p-3">
                                                            <div className='d-flex justify-content-between'>
                                                                <h6 className='mb-0'>Receiver Information</h6>
                                                                <a href="" className='riderMessageLink'  onClick={() => handleContactButtonClick(item.donation_id,item.doneeInfo.id)}style={{ textDecoration: "none" }}>Message</a>
                                                            </div>
                                                            <hr />
                                                            <div className='d-flex align-items-center mb-3'>
                                                                <h6 className='mb-0 me-2 d-flex align-items-center'><FaUser className='me-2' style={{ color: "blue" }} /> Name:</h6>
                                                                <p className='mb-0'>{item.doneeInfo.name}</p>
                                                            </div>
                                                            <div className='d-flex align-items-center mb-3'>
                                                                <h6 className='mb-0 me-2 d-flex align-items-center'><FaSquarePhone className='me-2' style={{ color: "green" }} /> Number:</h6>
                                                                <p className='mb-0'>{item.doneeInfo.phone}</p>
                                                            </div>
                                                            <div className='d-flex'>
                                                                <h6 className='mb-0 me-2 d-flex align-items-center'><FaLocationDot className='me-2' style={{ color: "red" }} />Address:</h6>
                                                                <p className='mb-0'>{item.doneeInfo.address}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLongTitle">Confirmation</h5>
                                                            <button type="button" className="close text-danger" data-bs-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div>
                                                                Please confirm that you delivered the order {data.req_id}
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary"
                                                                data-bs-dismiss="modal" onClick={() => handleDelevered(item.req_id)}>
                                                                Confirm
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    ""
                                )}

                        </div>
                    </div>
                    <div className="modal fade" id="mapModal" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" tabIndex="-1" aria-labelledby="mapModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <div>
                                        <h6 className="modal-title text-info" id="mapModalLabel">A: Pickup Point</h6>
                                        <h6 className="modal-title" id="mapModalLabel" style={{ color: "#a47ae2" }}>B: Delivery Point</h6>
                                    </div>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div ref={mapContainer} style={{ height: '50vh', width: '100%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
