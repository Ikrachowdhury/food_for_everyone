import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import "../../assets/css/ReceiverDashboard.css";
import { useEffect, useState } from 'react';
import { IoPersonSharp, IoTime } from 'react-icons/io5';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaLocationDot, FaRegCalendarDays } from 'react-icons/fa6';
import { RiUserReceived2Fill } from 'react-icons/ri';

export default function ReceiverDashboard() {
    const [modelData, setModalData] = useState(null);
    const [delivery, setDelivery] = useState('Pickup');
    const [donation_id, setSelectedDonationId] = useState(null);
    const [donationData, setDonationData] = useState([]);
    const [error, setError] = useState(null);
    const user_id = localStorage.getItem('user_id');
    const [userlat, setUserlat] = useState(0);
    const [userlon, setUserlon] = useState(0);
    const [expandedDonationId, setExpandedDonationId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showRequestModal, setRequestModal] = useState(true);

    console.log(error)

    useEffect(() => {
        if (modelData) {
            const modalElement = document.getElementById('detailsModal');
            if (modalElement) {
                const modal = new window.bootstrap.Modal(modalElement);
                modal.show();
            }
        }
    }, [modelData]);

    const okButton = () => {
        window.location.reload();
    }

    useEffect(() => {
        console.log('User Latitude:', userlat);
        console.log('User Longitude:', userlon);
    }, [userlat, userlon]);

    const handleDetailsModal = (donation) => {
        setModalData(donation);
    };

    const handleRequestClick = (donationId) => {
        setSelectedDonationId(donationId);
    };
    const handleDeliveryChange = (e) => {
        setDelivery(e.target.value);
    };

    const toggleExpand = (donationId) => {
        setExpandedDonationId(prevId => (prevId === donationId ? null : donationId));
    };
    

    function haversineDistance(lat1, lon1, lat2, lon2) {
        const toRadians = (degree) => (degree * Math.PI) / 180;

        const R = 6371;
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c;
        return distance;
    }

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                const response = await fetch(`http://localhost:8000/api/profile/${user_id}`, {
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
                setUserlat(result.user.address_lat)
                setUserlon(result.user.address_lon)
                console.log(userlon)
                console.log(userlat)

            } catch (error) {
                setError(error.message);
            }
        };
        fetchProfileData();
    }, []);

    useEffect(() => {
        const fetchDonationData = async () => {
            try {
                const responseIds = await fetch(`http://localhost:8000/api/donee-dashboard/${user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                if (!responseIds.ok) {
                    throw new Error('Network response was not ok');
                }

                const donationIdsData = await responseIds.json();

                const donationPromises = donationIdsData.donation_ids_with_user_ids.map(async (donation) => {
                    const donationId = donation.donation_id;
                    const response = await fetch(`http://localhost:8000/api/dashboardDonations/${donationId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to fetch donation ${donationId}`);
                    }
                    const result = await response.json();
                    return result;
                });

                const donationResults = await Promise.all(donationPromises);
                setDonationData(donationResults);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setError(error.message);
            }
        };

        fetchDonationData();
    }, []);


    async function donationRequest(event) {
        event.preventDefault();
        const formData = {
            delivery: delivery,
            donation_id: donation_id,
            user_id: parseInt(user_id, 10),
            accept_status: 'Pending',
            run_status: 'Pending'
        };
        try {
            let response = await fetch("http://localhost:8000/api/requestdonation", {
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.status === 200) {
                const modalElement = new window.bootstrap.Modal(document.getElementById('sentRequest'));
                modalElement.show();
                setRequestModal(false);
            }
            else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let result = await response.json();
            console.log("Result:", result);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const filteredDonations = donationData.filter((donation) => {
        const donationLat = donation.donationPost.location_lat;
        const donationLon = donation.donationPost.location_lon;

        const distance = haversineDistance(userlat, userlon, donationLat, donationLon);

        return distance < 2; 
    });

    return (
        <div>
            <Navbar />
            <div className="homePage d-flex">
                <Sidebar />
                <div className="main-content mt-5 dashboardMain ">
                    <div className="row mt-5 px-5">
                        {isLoading ? (
                            <div className="centered-content">
                                <div className="text">Loading...</div>
                            </div>
                        ) :
                            filteredDonations.length > 0 ? (
                                filteredDonations.map((donation, index) => (
                                    <div className="col-6 py-3" key={index}>
                                        <div className="card shadow cardBorder">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-4 d-flex align-items-center">
                                                        <div >
                                                            <img src={donation.imagePaths[0]} className="img-fluid" alt="image" style={{ width: "300px", height: "170px" }} />
                                                        </div>
                                                    </div>
                                                    <div className="col-8 mt-1">
                                                        <div className='d-flex flex-column'>
                                                            <div>
                                                                <h6 >{donation.donationPost.post_name}</h6>
                                                                <h6 className='text-muted'>
                                                                    Validity: {donation.donationPost.expiredate}
                                                                </h6>
                                                                <p className='mt-2'>
                                                                    {expandedDonationId === donation.donationPost.donation_id || donation.donationPost.post_description.length <= 100
                                                                        ? donation.donationPost.post_description
                                                                        : `${donation.donationPost.post_description.substring(0, 100)}...`}
                                                                    {donation.donationPost.post_description.length > 100 && (
                                                                        <span
                                                                            className='text-success fw-bold'
                                                                            onClick={() => toggleExpand(donation.donationPost.donation_id)}
                                                                            style={{ cursor: 'pointer' }}
                                                                        >
                                                                            {expandedDonationId === donation.donationPost.donation_id ? ' Read Less' : ' Read More'}
                                                                        </span>
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className='mt-3'>
                                                            <button className='btn me-2' data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ backgroundColor: "#A0F0A8" }} onClick={() => handleRequestClick(donation.donationPost.donation_id)}>
                                                                Request
                                                            </button>
                                                            <button className='btn me-2 bg-secondary text-white' data-bs-toggle="modal" data-bs-target="#detailsModal" onClick={() => handleDetailsModal(donation)}>
                                                                Details
                                                            </button>
                                                        </div>
                                                        {showRequestModal && (
                                                            <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                                <div className="modal-dialog modal-lg modal-dialog-centered ">
                                                                    <div className="modal-content " style={{ backgroundColor: "#f9f9f9" }}>
                                                                        <div className="modal-header d-flex align-items-center justify-content-between">
                                                                            <h4 className="modal-title fs-5 " id="staticBackdropLabel">Food Request Form</h4>
                                                                            <button type="button" className="close text-danger" data-bs-dismiss="modal" aria-label="Close">
                                                                                <span aria-hidden="true">&times;</span>
                                                                            </button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            <div className="mb-3 mx-3">
                                                                                <label htmlFor="donee" className="form-label mt-2 ">Delivery <span className="text-danger">*</span></label>
                                                                                <select className="form-control textBox" id="donee" value={delivery} onChange={handleDeliveryChange}>
                                                                                    <option>Pickup</option>
                                                                                    <option>Rider</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-primary" onClick={donationRequest}>Done</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="modal fade " id="sentRequest" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                            <div className="modal-dialog modal-dialog-centered">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <strong className="me-auto text-success">Sent Request </strong>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <div className="mb-3 mt-2 ">
                                                                            Your Request has been sent
                                                                        </div>
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button type="button" className='btn-primary' data-bs-dismiss="modal" aria-label="Close" onClick={okButton} >Ok</button>
                                                                    </div>
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
                                    <div className="MainMessage">No Donation Post</div>
                                </div>
                            )}
                    </div>
                    {modelData && (
                        <div className="modal fade" id="detailsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">{modelData.donationPost.post_name}</h5>
                                        <button type="buttton" className="close text-danger" data-bs-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body" style={{ maxHeight: '680px', overflowY: 'auto' }}>
                                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                            <div className="carousel-indicators">
                                                {modelData.imagePaths.map((_, index) => (
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
                                                {modelData.imagePaths.map((image, index) => (
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
                                            {/* <p>{donation.donationPost}</p> */}
                                            <div className='d-flex justify-content-between'>
                                                <div className='d-flex'>
                                                    <IoPersonSharp />
                                                    <h6 className="card-text ms-2 text-muted">Serve</h6>
                                                </div>
                                                <div > <p className='text-muted'>{modelData.donationPost.serves} Person</p></div>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <div className='d-flex'>
                                                    <RiUserReceived2Fill />
                                                    <h6 className="card-text ms-2 text-muted">Receiver</h6>
                                                </div>
                                                <div > <p className='text-muted'>{modelData.donationPost.donee_type}</p></div>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <div className='d-flex'>
                                                    <FaLocationDot />
                                                    <h6 className="card-text ms-2 text-muted">Location</h6>
                                                </div>
                                                <div > <p className='text-muted'>{modelData.donationPost.pickup_location}</p></div>
                                            </div>
                                            <hr className='mt-0' />
                                            <div className='d-flex justify-content-between'>
                                                <div className='d-flex'>
                                                    <FaCalendarAlt />
                                                    <h6 className="card-text ms-2 text-muted">Last Receive Date</h6>
                                                </div>
                                                <div > <p className='text-muted'>{modelData.donationPost.last_receive_date}</p></div>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <div className='d-flex'>
                                                    <FaRegCalendarDays />
                                                    <h6 className="card-text ms-2 text-muted">Expire Date</h6>
                                                </div>
                                                <div > <p className='text-muted'>{modelData.donationPost.expiredate}</p></div>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <div className='d-flex'>
                                                    <IoTime />
                                                    <h6 className="card-text ms-2 text-muted">Pickup Time</h6>
                                                </div>
                                                <div > <p className='text-muted'>{modelData.donationPost.receive_time}</p></div>
                                            </div>
                                            <hr className='mt-0' />
                                            <div>
                                                <h6>Description</h6>
                                                <p className='text-justify'>{modelData.donationPost.post_description}</p>
                                            </div>
                                            <hr className='mt-0' />
                                            <div className='d-flex justify-content-end'>
                                                <button className='btn me-2' data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ backgroundColor: "#A0F0A8" }} onClick={() => handleRequestClick(modelData.donationPost.donation_id)}>
                                                    Request
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}