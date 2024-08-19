import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import "../../assets/css/ReceiverDashboard.css";
import { useEffect, useState } from 'react';
import pizza from "../../images/pizza.jpg"
import pasta from "../../images/pasta.png"
import burger from "../../images/Burger.jpg"
import { IoPersonSharp, IoTime } from 'react-icons/io5';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaLocationDot, FaRegCalendarDays } from 'react-icons/fa6';
import { RiUserReceived2Fill } from 'react-icons/ri';
export default function ReceiverDashboard() {
    // const [value, setValue] = useState('');
    const [delivery, setDelivery] = useState('Pickup');
    const [location, setUserLocation] = useState('');
    const [donation_id, setSelectedDonationId] = useState(null);
    const [donationIds, setDonationIds] = useState([]);
    const [donationData, setDonationData] = useState([]);
    const [error, setError] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const user_id = localStorage.getItem('user_id');
    console.log(error)
    const handleRequestClick = (donationId) => {
        setSelectedDonationId(donationId);
    };
    console.log('Selected Donation ID:', donation_id);
    const handleDeliveryChange = (e) => {
        setDelivery(e.target.value);
    };

    const handleUserLocationChange = (e) => {
        setUserLocation(e.target.value);
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const valueFromLocalStorage = localStorage.getItem('user_type');
                // if (valueFromLocalStorage) {
                //     setValue(valueFromLocalStorage);
                // }
                const responseIds = await fetch(`http://localhost:8000/api/donee-dashboard`, {
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
                console.log(donationIdsData.total_donation_ids);
                setDonationIds(donationIdsData.donation_ids_with_user_ids);
                console.log(donationIds)

                const donationPromises = donationIdsData.donation_ids_with_user_ids.map(async (donation) => {
                    console.log(donation.donation_id)
                    const donationId = donation.donation_id;
                    console.log(donationId)
                    const response = await fetch(`http://localhost:8000/api/dashboardDonations/${donationId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                    });
                    console.log(response)
                    if (!response.ok) {
                        throw new Error(`Failed to fetch donation ${donationId}`);
                    }
                    const result = await response.json();
                    console.log(result);

                    return result;
                    // return response.json();
                });

                const donationResults = await Promise.all(donationPromises);
                setDonationData(donationResults);
                console.log(donationData)
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    async function donationRequest(event) {
        event.preventDefault();
        const formData = {
            delivery: delivery,
            location: location,
            donation_id: donation_id,
            user_id: parseInt(user_id, 10),
            accept_status: 'Pending',
            run_status: 'Pending'
        };
        console.log('Form Data:', formData);
        try {
            let response = await fetch("http://localhost:8000/api/requestdonation", {
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let result = await response.json();
            console.log("Result:", result);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="homePage d-flex">
                <Sidebar />
                <div className="main-content mt-5 dashboardMain ">
                    <div className="row mt-5 px-5">
                        {donationData.map((donation, index) => (
                            <div className="col-6 py-3" key={index}>
                                <div className="card shadow cardBorder">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-4 d-flex align-items-center">
                                                <div className=''>
                                                    <img src={donation.imagePaths[0]} className="dashboardImage img-fluid" alt="image" />
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
                                                            {isExpanded || donation.donationPost.post_description.length <= 100
                                                                ? donation.donationPost.post_description
                                                                : `${donation.donationPost.post_description.substring(0, 100)}...`}
                                                            {donation.donationPost.post_description.length > 100 && (
                                                                <span
                                                                    className='text-success fw-bold'
                                                                    onClick={toggleExpand}
                                                                    style={{ cursor: 'pointer' }}
                                                                >
                                                                    {isExpanded ? ' Read Less' : ' Read More'}
                                                                </span>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='mt-3'>
                                                    <button className='btn me-2' data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ backgroundColor: "#A0F0A8" }} onClick={() => handleRequestClick(donation.donationPost.donation_id)}>
                                                        Request
                                                    </button>
                                                    <button className='btn me-2 bg-secondary text-white' data-bs-toggle="modal" data-bs-target="#detailsModal">
                                                        Details
                                                    </button>
                                                </div>
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
                                                                    <label htmlFor="foodName" className="form-label mt-2 formLabel">Location <span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control formInput" id="userLocation" required="required" style={{ backgroundColor: "#EEEEEE" }} onChange={handleUserLocationChange} />
                                                                </div>
                                                                <div className="mb-3 mx-3">
                                                                    <label htmlFor="donee" className="form-label mt-2 ">Delivery <span className="text-danger">*</span></label>
                                                                    <select className="form-control textBox" id="donee" value={delivery} onChange={handleDeliveryChange}>
                                                                        <option>Pickup</option>
                                                                        <option>Rider</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-primary" onClick={donationRequest}>done</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal fade" id="detailsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="exampleModalLongTitle">Burger Delight</h5>
                                                                <button type="button" className="close text-danger" data-bs-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body" style={{ maxHeight: '680px', overflowY: 'auto' }}>
                                                                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                                                    <div className="carousel-indicators">
                                                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                                                    </div>
                                                                    <div className="carousel-inner">
                                                                        <div className="carousel-item active" style={{height:"300px"}}>
                                                                            <img src={pizza} className="d-block w-100" alt="..." style={{maxHeight:"300px"}}/>
                                                                        </div>
                                                                        <div className="carousel-item" style={{height:"300px"}}>
                                                                            <img src={pasta} className="d-block w-100" alt="..." style={{maxHeight:"300px"}}/>
                                                                        </div>
                                                                        <div className="carousel-item " style={{height:"300px"}}>
                                                                            <img src={burger} className="d-block w-100" alt="..." style={{maxHeight:"300px"}}/>
                                                                        </div>
                                                                    </div>
                                                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                                        <span className="visually-hidden">Previous</span>
                                                                    </button>
                                                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
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
                                                                        <div > <p className='text-muted'>9 Person</p></div>
                                                                    </div>
                                                                    <div className='d-flex justify-content-between'>
                                                                        <div className='d-flex'>
                                                                            <RiUserReceived2Fill />
                                                                            <h6 className="card-text ms-2 text-muted">Receiver</h6>
                                                                        </div>
                                                                        <div > <p className='text-muted'>Individual Person</p></div>
                                                                    </div>
                                                                    <div className='d-flex justify-content-between'>
                                                                        <div className='d-flex'>
                                                                            <FaLocationDot />
                                                                            <h6 className="card-text ms-2 text-muted">Location</h6>
                                                                        </div>
                                                                        <div > <p className='text-muted'>Sonapur Zero Point</p></div>
                                                                    </div>
                                                                    <hr className='mt-0' />
                                                                    <div className='d-flex justify-content-between'>
                                                                        <div className='d-flex'>
                                                                            <FaCalendarAlt />
                                                                            <h6 className="card-text ms-2 text-muted">Last Receive Date</h6>
                                                                        </div>
                                                                        <div > <p className='text-muted'>13/08/2024</p></div>
                                                                    </div>
                                                                    <div className='d-flex justify-content-between'>
                                                                        <div className='d-flex'>
                                                                            <FaRegCalendarDays />
                                                                            <h6 className="card-text ms-2 text-muted">Expire Date</h6>
                                                                        </div>
                                                                        <div > <p className='text-muted'>14/08/2024</p></div>
                                                                    </div>
                                                                    <div className='d-flex justify-content-between'>
                                                                        <div className='d-flex'>
                                                                            <IoTime />
                                                                            <h6 className="card-text ms-2 text-muted">Pickup Time</h6>
                                                                        </div>
                                                                        <div > <p className='text-muted'>9:00 AM - 4:00 PM </p></div>
                                                                    </div>

                                                                    <hr className='mt-0' />
                                                                    <div>
                                                                            <h6>Description</h6>
                                                                            <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nesciunt quia doloremque dolorem sapiente, dignissimos totam sequi? Tenetur aut eligendi placeat nulla provident suscipit, ullam eius soluta praesentium amet atque culpa sit excepturi consequuntur minima, aliquam exercitationem! Similique, aliquid, id rerum expedita nulla dignissimos quaerat est magni ratione voluptatum temporibus.</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}