import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import "../../assets/css/Dashboard.css";
import { IoPersonSharp, IoTime } from 'react-icons/io5';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaLocationDot, FaRegCalendarDays } from 'react-icons/fa6';
import { RiUserReceived2Fill } from 'react-icons/ri';
import { CiMenuKebab } from 'react-icons/ci';
import { HiMapPin } from 'react-icons/hi2';
import { RiTimeFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [donationData, setDonationData] = useState([]);
    const [onRunDonationData, setOnRunDonationData] = useState([]);
    const [error, setError] = useState(null);
    const [expandedDonationId, setExpandedDonationId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOnRunLoading, setIsOnRunLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState("")

    const handleDetailsModal = (donation) => {
        setSelectedDonation(donation);
        setShowModal(true);
    };
    useEffect(() => {
        if (showModal && selectedDonation) {
            const modalElement = document.getElementById('detailsModal');
            if (modalElement) {
                const modal = new window.bootstrap.Modal(modalElement);
                modal.show();
            }
        }
    }, [showModal, selectedDonation]);

    const handleAddNewDonation = () => {
        navigate('/addNewDonation');
    };
    const handleEditButton = (donations) => {
        navigate('/addNewDonation', { state: { donations } });
    };
    const toggleExpand = (donationId) => {
        setExpandedDonationId(prevId => (prevId === donationId ? null : donationId));
    };
    const okButton = () => {
        window.location.reload();
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                const responseIds = await fetch(`http://localhost:8000/api/donation-posts/${user_id}`, {
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

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                const response = await fetch(`http://localhost:8000/api/donorOnRunPost/${user_id}`, {
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
                setOnRunDonationData(result.accepted_donations)
                setIsOnRunLoading(false)
            } catch (error) {
                setIsOnRunLoading(false)
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    const handleAcceptDonation = async (donationID) => {
        // console.log(donationID)
        const url = 'http://localhost:8000/api/donorDeliveredDonation';
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ donationID })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let result = await response.json();
            console.log("Result:", result);
            if (result.success === true) {
                setMessage("Donation Delivered successfully!")
                const modalElement = new window.bootstrap.Modal(document.getElementById('deliveredModal'));
                modalElement.show();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred' + error.message);
        }
    };

    const handleRejectOnRun = async (donationID) => {
        const user_type = localStorage.getItem("user_type")
        let item = { donationID, user_type }
        const url = 'http://localhost:8000/api/reject-DonorOnRun';
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(item)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let result = await response.json();
            console.log("Result:", result);
            if (result.success) {
                alert('Donation canceled successfully!');
                window.location.reload();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while canceling the donation. ' + error.message);
        }
    };
    const handleCancelPost = async (donationId) => {
        console.log(donationId)
        const url = 'http://localhost:8000/api/delete-donation';
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
                const modalElement = new window.bootstrap.Modal(document.getElementById('cancelModal'));
                modalElement.show();
                // alert('Donation canceled successfully!');
                // window.location.reload();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while canceling the donation. ' + error.message);
        }
    };
    const handleChatting = async (donationId) => {

    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="homePage d-flex">
                <Sidebar />
                <div className="main-content mt-5 dashboardMain">
                    <div className="row mt-3">
                        <div className="col-12  d-flex justify-content-end mt-2">
                            <button className='btn btn-success mx-4 donationButton' onClick={handleAddNewDonation}>+ Add Donation</button>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-6 rightBorder">
                            <div className="mx-3 text-muted">
                                <h3 className='mb-0 fw-bold text-muted'>Donating</h3>
                                <hr /></div>
                            <div style={{ height: "75vh", overflow: "auto" }}>
                                {isLoading ? (
                                    <div className="centered-content">
                                        <div className="text">Loading...</div>
                                    </div>
                                ) : donationData.length > 0 ? (
                                    donationData.map((donation, index) => (
                                        <div
                                            className="py-3 ms-4 me-2"
                                            key={index}
                                        >
                                            <div href="#" className="cardLink">
                                                <div className="card shadow cardBorder">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-4 d-flex align-items-center">
                                                                <div className='imageDiv'>
                                                                    <img src={donation.imagePaths[0]} className="dashboardImage img-fluid" alt={donation.imgAlt} />
                                                                </div>
                                                            </div>
                                                            <div className="col-8 mt-1">
                                                                <div className='d-flex flex-column'>
                                                                    <div className="div">
                                                                        <div className='d-flex justify-content-between mb-1'>
                                                                            <h3 className='mb-0'>{donation.donationPost.post_name}</h3>
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
                                                                                                className="dropdown-item"
                                                                                                onClick={() => handleCancelPost(donation.donationPost.donation_id)}
                                                                                            >
                                                                                                Cancel
                                                                                            </button>
                                                                                        </li>
                                                                                        <li>
                                                                                            <button
                                                                                                className="dropdown-item"
                                                                                                data-bs-toggle="modal"
                                                                                                data-bs-target="#detailsModal"
                                                                                                onClick={() => handleDetailsModal(donation)}
                                                                                            >
                                                                                                Details
                                                                                            </button>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <h6 className='text-muted'>
                                                                            Validity: {donation.donationPost.expiredate} | <RiTimeFill className='text-primary' /> {donation.donationPost.receive_time} | Last Date: {donation.donationPost.last_receive_date}
                                                                        </h6>
                                                                        <h6 className='text-muted'>
                                                                            <HiMapPin className='text-danger' /> {donation.donationPost.pickup_location} | {donation.donationPost.categories} | {donation.donationPost.serves} | {donation.donationPost.donee_type}
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
                                                                    <button
                                                                        className='btn me-2 donationButton'
                                                                        style={{ height: "50px", fontSize: "20px", backgroundColor: "yellow" }}
                                                                        onClick={() => handleEditButton(donation)}
                                                                    >
                                                                        Edit
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
                                        <div className="MainMessage">No Donation Post</div>
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
                                        onRunDonationData.map((donations, index) => (
                                            <div className="row mx-5" key={index}>
                                                <div className="text-center py-3 me-2">
                                                    <div className="cardLink">
                                                        <div className="card shadow cardBorder">
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-1 ps-1 d-flex align-items-center">
                                                                        {donations.imagePaths && donations.imagePaths.length > 0 ? (
                                                                            <img src={donations.imagePaths[0]} alt={donations.post_name} height={50} width={60} />
                                                                        ) : (
                                                                            <img src="" alt="Default" height={50} width={60} />
                                                                        )}
                                                                    </div>
                                                                    <div className="col-10 ps-4">
                                                                        <div className='d-flex flex-column  align-items-start'>
                                                                            <h5 className='fw-bold'>{donations.donationPost.post_name}</h5>
                                                                            <p className='mb-0'><b className='text-muted'>Serve: </b>{donations.donationPost.serves}<b className='text-muted ms-3'>Expire Date: </b>{donations.donationPost.expiredate}</p>
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
                                                                                <li><button className="dropdown-item" onClick={() => handleRejectOnRun(donations.donationPost.donation_id)}>Cancel</button></li>
                                                                                <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#detailsModal" onClick={() => handleDetailsModal(donations)}>Details</button></li>
                                                                                <li ><button className="dropdown-item text-success" onClick={() => handleAcceptDonation(donations.donationPost.donation_id)}>Mark as Delivered</button></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    {showModal && selectedDonation && (
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
                                                                                                        <img src={image} className="d-block w-100" alt={`Slide ${index + 1}`}
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
                                                                </div>
                                                                <div className="row mt-4">
                                                                    <div className="col-8">
                                                                        <div className="row">
                                                                            <div className="col-6 d-flex justify-content-start">
                                                                                <h5 className='fw-bold'>Donee</h5>
                                                                            </div>
                                                                            <div className="col-6 d-flex justify-content-start">
                                                                                <h5 className='fw-bold'>Receiver</h5>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mt-1">
                                                                            <div className="col-6 d-flex justify-content-start">
                                                                                <h6 className='text-muted'>{donations.doneeName}</h6>
                                                                            </div>
                                                                            <div className="col-6 d-flex justify-content-start">
                                                                                <h6 className='text-muted'>{donations.delivery}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-4 d-flex flex-column justify-content-center">
                                                                        <div>
                                                                            <button className='btn donationButton' onClick={handleChatting(donations.donationId)} style={{ backgroundColor: "yellow" }}>Contact</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal fade " id="deliveredModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                            <div className="modal fade " id="cancelModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <strong className="me-auto text-success">Delete </strong>
                                        </div>
                                        <div className="modal-body">
                                            <div className="mb-3 mt-2 ">
                                                Your Post has been deleted
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
    );
}