import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import "../../assets/css/DoneeList.css";
import "../../assets/css/receivedDonation.css";
import "../../assets/css/Dashboard.css";
import pizza from "../../images/pizza.jpg"
import pasta from "../../images/pasta.png"
import burger from "../../images/Burger.jpg"
import { IoPersonSharp, IoTime } from 'react-icons/io5';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaLocationDot, FaRegCalendarDays } from 'react-icons/fa6';
import { RiUserReceived2Fill } from 'react-icons/ri';
import { CiMenuKebab } from 'react-icons/ci';
import { HiMapPin } from 'react-icons/hi2';
import { RiTimeFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const onRunCardData = [
    { title: "Burger Available", serve: 12, expireDate: "17/23/2024", donee: "Armanur Rashid", receiver: "Rider", imgSrc: "../../../src/images/pizza.jpg", imgAlt: "Pizza" },
    { title: "Burger Available", serve: 12, expireDate: "17/23/2024", donee: "Armanur Rashid", receiver: "Rider", imgSrc: "../../../src/images/pizza.jpg", imgAlt: "Pizza" },
    { title: "Burger Available", serve: 12, expireDate: "17/23/2024", donee: "Armanur Rashid", receiver: "Rider", imgSrc: "../../../src/images/pizza.jpg", imgAlt: "Pizza" },
];

export default function Dashboard() {
    const [donationIds, setDonationIds] = useState([]);
    const [donationData, setDonationData] = useState([]);
    const [error, setError] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/addNewDonation');
    };
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                console.log(user_id)
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

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (donationData.length === 0) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <Navbar />
            <div className="homePage d-flex">
                <Sidebar />
                <div className="main-content mt-5 dashboardMain">
                    <div className="row mt-3">
                        <div className="col-12  d-flex justify-content-end mt-2">
                            <button className='btn btn-success mx-4 donationButton' onClick={handleButtonClick}>+ Add Donation</button>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-6 rightBorder">
                            <div className="mx-3 text-muted">
                                <h3 className='mb-0'>Donating</h3>
                                <hr /></div>
                            {donationData.map((donation, index) => (
                                <div className="py-3 ms-4 me-2" key={index}>
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
                                                                <h3>{donation.donationPost.post_name}</h3>
                                                                <h6 className='text-muted'>
                                                                    Validity: {donation.donationPost.expiredate} | <RiTimeFill className='text-primary' /> {donation.donationPost.receive_time} | Last Date: {donation.donationPost.last_receive_date}
                                                                </h6>
                                                                <h6 className='text-muted'>
                                                                    <HiMapPin className='text-danger' /> {donation.donationPost.pickup_location} |  {donation.donationPost.categories} | {donation.donationPost.serves} | {donation.donationPost.donee_type}
                                                                </h6>
                                                                {/* <p className='mt-2'>
                                                                    {donation.donationPost.post_description} <span className='text-success fw-bold'>Read More</span>
                                                                </p> */}
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
                                                            <button className='btn me-2 donationButton' style={{ height: "50px", fontSize: "20px", backgroundColor: "yellow" }}>
                                                                Edit
                                                            </button>
                                                            <button className='btn me-2 bg-danger text-white donationButton' style={{ height: "50px", fontSize: "20px" }}>
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-6">
                            <div className=' ms-3'>
                                <h3 className='fw-bold text-muted'>On Run</h3>
                                <hr />
                            </div>
                            {onRunCardData.map((card, index) => (
                                <div className="row mx-5" key={index}>
                                    <div className="text-center py-3 me-2">
                                        <div className="cardLink">
                                            <div className="card shadow cardBorder">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-1 ps-1 d-flex align-items-center">
                                                            <img src={card.imgSrc} alt={card.imgAlt} height={50} width={60} />
                                                        </div>
                                                        <div className="col-6">
                                                            <div className='d-flex flex-column  align-items-start'>
                                                                <h5 className='fw-bold'>{card.title}</h5>
                                                                <p><b className='text-muted'>Serve: </b>{card.serve} <b className='text-muted'>Expire Date: </b>{card.expireDate}</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-4 d-flex justify-content-end align-items-center">
                                                            <button className='btn markButton'>Mark as Delivered</button>
                                                        </div>
                                                        {/* <div className="col-1 d-flex align-items-center justify-content-center">
                                                            <CiMenuKebab />
                                                        </div> */}
                                                        <div className="col-1 d-flex align-items-center justify-content-center">
                                                            <div className="dropdown">
                                                                <CiMenuKebab
                                                                    id="dropdownMenuButton"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="false"
                                                                    style={{ cursor: 'pointer' }}
                                                                />
                                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                    <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#detailsModal">Cancel</button></li>
                                                                    <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#detailsModal">Details</button></li>
                                                                </ul>
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
                                                                                <div className="carousel-item active" style={{ height: "300px" }}>
                                                                                    <img src={pizza} className="d-block w-100" alt="..." style={{ maxHeight: "300px" }} />
                                                                                </div>
                                                                                <div className="carousel-item" style={{ height: "300px" }}>
                                                                                    <img src={pasta} className="d-block w-100" alt="..." style={{ maxHeight: "300px" }} />
                                                                                </div>
                                                                                <div className="carousel-item " style={{ height: "300px" }}>
                                                                                    <img src={burger} className="d-block w-100" alt="..." style={{ maxHeight: "300px" }} />
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
                                                                                <h6 className='text-start'>Description</h6>
                                                                                <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nesciunt quia doloremque dolorem sapiente, dignissimos totam sequi? Tenetur aut eligendi placeat nulla provident suscipit, ullam eius soluta praesentium amet atque culpa sit excepturi consequuntur minima, aliquam exercitationem! Similique, aliquid, id rerum expedita nulla dignissimos quaerat est magni ratione voluptatum temporibus.</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>

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
                                                                    <h6 className='text-muted'>{card.donee}</h6>
                                                                </div>
                                                                <div className="col-6 d-flex justify-content-start">
                                                                    <h6 className='text-muted'>{card.receiver}</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-4 d-flex flex-column justify-content-center">
                                                            <div>
                                                                <button className='btn donationButton' style={{ backgroundColor: "yellow" }}>Contact</button>
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
        </div>
    );
}