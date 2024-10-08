import Sidebar from '../../components/Sidebar'
import "../../assets/css/RequestedDonation.css"
import { HiMapPin } from 'react-icons/hi2';
import { RiTimeFill, RiUserReceived2Fill } from 'react-icons/ri';
import Navbar from '../../components/Navbar';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { IoPersonSharp, IoTime } from 'react-icons/io5';
import { FaLocationDot, FaRegCalendarDays } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
const user_id = localStorage.getItem('user_id');
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJtYW4yOTYiLCJhIjoiY20wOWYwejBlMTJhajJrb21qOTR0YWYxYSJ9.2NVdAp3kdgwt2g9WBZeBJw';

export default function FoodCart() {
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [onRunDonationData, setOnRunDonationData] = useState([]);
    const [RequestedData, setRequestedData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOnRunLoading, setIsOnRunLoading] = useState(true);
    const [message, setMessage] = useState("")
    const navigate = useNavigate();
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [mapData, setMapData] = useState({ origin: null, destination: null });
    const user_id = localStorage.getItem('user_id');
 

    const handleContactButtonClick = (donation_id) => {
        navigate('/message', { state: { donation_id } });
    };
    const okButton = () => {
        window.location.reload();
    }

    const handleShowMapModal = (post_lon, post_lat, doneeLon, doneeLat) => {
        const origin = [post_lon, post_lat];
        const destination = [doneeLon, doneeLat];
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
        if (selectedDonation) {
            const modalElement = document.getElementById('detailsModal');
            if (modalElement) {
                const modal = new window.bootstrap.Modal(modalElement);
                modal.show();
            }
        }
    }, [selectedDonation]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/doneeRequestedPost/${user_id}`, {
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
                setRequestedData(result)
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/doneeOnRunPost/${user_id}`, {
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
                console.log(result)
                setOnRunDonationData(result.accepted_donations)
                setIsOnRunLoading(false)
            } catch (error) {
                setIsOnRunLoading(false)
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    const handleDetailsModal = (donation) => {
        setSelectedDonation(donation);
    };
    const handleCancelPost = async (donationID) => {

        const url = 'http://localhost:8000/api/cancelDoneeRequest';
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ donationID,user_id})
            });
            console.log(donationID)

            let result = await response.json();
            console.log("Result:", result);
            if (result.success === true) {
                setMessage("Reques canceled sucessfully")
                const modalElement = new window.bootstrap.Modal(document.getElementById('cancelRequestModal'));
                modalElement.show();
            } else {
                console.log("Df")
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while canceling the donation. ' + error.message);
        }
    };

    // const handleRejectOnRun = async (donationID) => {
    //     const user_type = localStorage.getItem("user_type")
    //     let item = { donationID, user_type }
    //     console.log(item)
    //     const url = 'http://localhost:8000/api/reject-DonorOnRun';
    //     try {
    //         let response = await fetch(url, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json'
    //             },
    //             body: JSON.stringify(item)
    //         });
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //         let result = await response.json();
    //         console.log("Result:", result);
    //         if (result.success) {
    //             setMessage("Donation canceled successfully!")
    //             const modalElement = new window.bootstrap.Modal(document.getElementById('cancelRequestModal'));
    //             modalElement.show();
    //         } else {
    //             alert('Error: ' + result.message);
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         alert('An error occurred while canceling the donation. ' + error.message);
    //     }
    // };

    const handleAcceptDonation = async (donationId) => {
        console.log(donationId)
        const url = 'http://localhost:8000/api/doneeDeliveredDonation';
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ donationID: donationId })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let result = await response.json();
            console.log("Result:", result);

            if (result.success) {
                setMessage("Donation Received successfully!")
                const modalElement = new window.bootstrap.Modal(document.getElementById('cancelRequestModal'));
                modalElement.show();
            } else {
                alert('Error: ' + result.message);
            }

            let response2 = await fetch(`http://localhost:8000/api/deleteInboxes/${donationId}/${user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            // if (!response2.ok) {
            //     const errorData = await response2.json();
            //     throw new Error(`Error fetching response2: ${errorData.message || 'Unknown error'}`);
            // }
            // const result2 = await response2.json();
            // console.log(result2);
             
        } catch (error) {
            console.error('Error:', error);
            // alert('An error occurred while accepting the donation. ' + error.message);
        }
    };
    return (
        <div>
            <Navbar />
            <div className="homePage d-flex">
                <Sidebar />
                <div className="main-content mt-5" style={{ overflowX: "hidden" }}>
                    <div className="row mt-5">
                        <div className="col-6 rightBorder">
                            <div className="mx-3 text-muted">
                                <h3 className='fw-bold text-muted'>Requested</h3>
                                <hr />
                            </div>
                            <div style={{ height: "75vh", overflow: "auto" }}>
                                {isLoading ? (
                                    <div className="centered-content">
                                        <div className="text">Loading...</div>
                                    </div>
                                ) :
                                    RequestedData.length > 0 ? (
                                        RequestedData.map((card, index) => (
                                            <div className="py-3 ms-4 me-2" key={index}>
                                                <div href="#" className="cardLink">
                                                    <div className="card shadow cardBorder">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-4 d-flex align-items-center">
                                                                    <div className='imageDiv' style={{ height: "150px", width: "80%" }}>
                                                                        <img src={card.image_paths[0]} className="dashboardImage img-fluid" alt={card.imgAlt} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-8 mt-1">
                                                                    <div className='d-flex flex-column'>
                                                                        <div className="div">
                                                                            <h3>{card.post_name}</h3>
                                                                            <h6 className='text-muted'>
                                                                                Validity: {card.expiredate} | <RiTimeFill className='text-primary' /> {card.receive_time} | Last Date: {card.last_receive_date}
                                                                            </h6>
                                                                            <h6 className='text-muted'>
                                                                                <HiMapPin className='text-danger' /> {card.pickup_location} | {card.categories} | {card.serves} | {card.donee_type}
                                                                            </h6>
                                                                        </div>
                                                                    </div>
                                                                    <div className='mt-3 d-flex justify-content-end me-3'>
                                                                        <button className='btn me-2 bg-danger text-white donationButton' onClick={() => handleCancelPost(card.donation_id)}>
                                                                            Cancel
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="centered-content">
                                            <div className="text">
                                                <span>Ooops...</span>
                                            </div>
                                            <div className="MainMessage">No Request</div>
                                        </div>
                                    )}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className=' ms-3'>
                                <h3 className='fw-bold text-muted'>On Run</h3>
                                <hr />
                            </div>
                            <div style={{ height: "75vh", overflow: "auto" }}>
                                {isOnRunLoading ? (
                                    <div className="centered-content">
                                        <div className="text">Loading...</div>
                                    </div>
                                ) :
                                    onRunDonationData.length > 0 ? (
                                        onRunDonationData.map((donation, index) => (
                                            <div className="row mx-5" key={index}>
                                                <div className="text-center py-3 me-2">
                                                    <div className="cardLink">
                                                        <div className="card shadow cardBorder">
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-1 ps-1 d-flex align-items-center">
                                                                        {donation.imagePaths && donation.imagePaths.length > 0 ? (
                                                                            <img src={donation.imagePaths[0]} alt={donation.post_name} height={50} width={60} />
                                                                        ) : (
                                                                            <img src="" alt="Default" height={50} width={60} />
                                                                        )}
                                                                    </div>
                                                                    <div className="col-10 ps-4">
                                                                        <div className='d-flex flex-column  align-items-start ms-3'>
                                                                            <h5 className='fw-bold'>{donation.donationPost.post_name}</h5>
                                                                            <p className='mb-0'><b className='text-muted'>Expire Date: {donation.donationPost.expiredate}</b> <b className='text-muted'><FaMapMarkerAlt className='text-danger ms-2' /> {donation.donationPost.pickup_location}</b> </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1 d-flex align-items-center justify-content-center">
                                                                        <div className="dropdown">
                                                                            <CiMenuKebab
                                                                                id="dropdownMenuButton"
                                                                                data-bs-toggle="dropdown"
                                                                                aria-expanded="false"
                                                                                style={{ cursor: 'pointer' }}
                                                                            />
                                                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <li>
                                                                                    <button
                                                                                        className="dropdown-item" data-bs-toggle="modal" data-bs-target="#mapModal" onClick={() => handleShowMapModal(donation.donationPost.location_lon, donation.donationPost.location_lat, donation.doneeLon, donation.doneeLat)}
                                                                                    >
                                                                                        Map
                                                                                    </button>
                                                                                </li>
                                                                                <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#detailsModal" onClick={() => handleDetailsModal(donation)}>Full Details</button></li>
                                                                                <li ><button className="dropdown-item text-success" onClick={() => handleAcceptDonation(donation.donationPost.donation_id)}>Mark as Delivered</button></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="row mt-4">
                                                                    <div className="col-8">
                                                                        <div className="row">
                                                                            <div className="col-6 d-flex justify-content-start">
                                                                                <h5 className='fw-bold'>Donor</h5>
                                                                            </div>
                                                                            <div className="col-6 d-flex justify-content-start">
                                                                                <h5 className='fw-bold'>Delivery</h5>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mt-1">
                                                                            <div className="col-6 d-flex justify-content-start">
                                                                                <h6 className='text-muted'>{donation.donorName}</h6>
                                                                            </div>
                                                                            <div className="col-6 d-flex justify-content-start">
                                                                                <h6 className='text-muted'>{donation.delivery}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-4 d-flex flex-column justify-content-center">
                                                                        <div>
                                                                            <button className='btn donationButton' onClick={() => handleContactButtonClick(donation.donationPost.donation_id)} style={{ backgroundColor: "yellow" }}>Contact</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="centered-content">
                                            <div className="text">
                                                <span>Ooops...</span>
                                            </div>
                                            <div className="MainMessage">No Running Donation</div>
                                        </div>
                                    )}
                            </div>
                        </div>
                        {selectedDonation && (
                            <div className="modal fade" id="detailsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">{selectedDonation.donationPost.post_name}</h5>
                                            <button type="button" className="close text-danger" data-bs-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body" style={{ maxHeight: '680px', overflowY: 'auto' }}>
                                            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                                <div className="carousel-indicators">
                                                    {selectedDonation.imagePaths.map((_, index) => (
                                                        <button
                                                            key={index}
                                                            type="button"
                                                            data-bs-target="#carouselExampleIndicators"
                                                            data-bs-slide-to={index}
                                                            className={index === 0 ? "active" : ""}
                                                            aria-current={index === 0 ? "true" : undefined}
                                                            aria-label={`Slide ${index + 1}`}
                                                        ></button>
                                                    ))}
                                                </div>
                                                <div className="carousel-inner">
                                                    {selectedDonation.imagePaths.map((image, index) => (
                                                        <div
                                                            key={index}
                                                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                                                            style={{ height: "300px" }}
                                                        >
                                                            <img
                                                                src={image}
                                                                className="d-block w-100"
                                                                alt={`Slide ${index + 1}`}
                                                                style={{ maxHeight: "300px" }}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                                <button
                                                    className="carousel-control-prev"
                                                    type="button"
                                                    data-bs-target="#carouselExampleIndicators"
                                                    data-bs-slide="prev"
                                                >
                                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button
                                                    className="carousel-control-next"
                                                    type="button"
                                                    data-bs-target="#carouselExampleIndicators"
                                                    data-bs-slide="next"
                                                >
                                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </div>

                                            <div className="card-body">
                                                <div className='d-flex justify-content-between'>
                                                    <div className='d-flex'>
                                                        <IoPersonSharp />
                                                        <h6 className="card-text ms-2 text-muted">Serve</h6>
                                                    </div>
                                                    <div > <p className='text-muted'>{selectedDonation.donationPost.serves} Person</p></div>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='d-flex'>
                                                        <RiUserReceived2Fill />
                                                        <h6 className="card-text ms-2 text-muted">Receiver</h6>
                                                    </div>
                                                    <div > <p className='text-muted'>{selectedDonation.donationPost.donee_type}</p></div>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='d-flex'>
                                                        <FaLocationDot />
                                                        <h6 className="card-text ms-2 text-muted">Location</h6>
                                                    </div>
                                                    <div > <p className='text-muted'>{selectedDonation.donationPost.pickup_location}</p></div>
                                                </div>
                                                <hr className='mt-0' />
                                                <div className='d-flex justify-content-between'>
                                                    <div className='d-flex'>
                                                        <FaCalendarAlt />
                                                        <h6 className="card-text ms-2 text-muted">Last Receive Date</h6>
                                                    </div>
                                                    <div > <p className='text-muted'>{selectedDonation.donationPost.last_receive_date}</p></div>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='d-flex'>
                                                        <FaRegCalendarDays />
                                                        <h6 className="card-text ms-2 text-muted">Pickup Date</h6>
                                                    </div>
                                                    <div > <p className='text-muted'>{selectedDonation.donationPost.expiredate}</p></div>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='d-flex'>
                                                        <IoTime />
                                                        <h6 className="card-text ms-2 text-muted">Pickup Time</h6>
                                                    </div>
                                                    <div > <p className='text-muted'>{selectedDonation.donationPost.receive_time}</p></div>
                                                </div>
                                                <hr className='mt-0' />
                                                <div>
                                                    <h6 className='text-start'>Description</h6>
                                                    <p className='text-justify'>{selectedDonation.donationPost.post_description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="modal fade " id="cancelRequestModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <strong className="me-auto text-success">Confirmation</strong>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3 mt-2 ">
                                            {message}
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className='btn-primary' data-bs-dismiss="modal" aria-label="Close" onClick={okButton} >Ok</button>
                                    </div>
                                </div>
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
            </div>
        </div>
    )
}