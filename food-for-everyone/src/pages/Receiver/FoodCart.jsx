import Sidebar from '../../components/Sidebar'
import "../../assets/css/RequestedDonation.css"
import { HiMapPin } from 'react-icons/hi2';
import { RiTimeFill } from 'react-icons/ri';
import Navbar from '../../components/Navbar';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
const user_id = localStorage.getItem('user_id');
const onRunCardData = [
    { title: "Burger Available", serve: 12, expireDate: "17/23/2024", donee: "Armanur Rashid", receiver: "Pickup", imgSrc: "../../../src/images/pizza.jpg", location: 'Town Hall', imgAlt: "Pizza" },
    { title: "Burger Available", serve: 12, expireDate: "17/23/2024", donee: "Armanur Rashid", receiver: "Rider", imgSrc: "../../../src/images/pizza.jpg", location: 'Town Hall', imgAlt: "Pizza" },
    { title: "Burger Available", serve: 12, expireDate: "17/23/2024", donee: "Armanur Rashid", receiver: "Rider", imgSrc: "../../../src/images/pizza.jpg", location: 'Town Hall', imgAlt: "Pizza" },
];
export default function FoodCart() {
    const [RequestedData, setRequestedData] = useState([]);
    const [error, setError] = useState(null);
    console.log(error)
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
                
            } catch (error) {
                setError(error.message);
            }
        };
        fetchData();
    }, []);
    console.log(RequestedData)
    return (
        <div>
            <Navbar />
            <div className="homePage d-flex">
                <Sidebar />
                <div className="main-content mt-5">
                    <div className="row mt-5">
                        <div className="col-6 rightBorder">
                            <div className="mx-3 text-muted">
                                <h3 className='fw-bold text-muted'>Requested</h3>
                                <hr />
                            </div>
                            {RequestedData.map((card, index) => (
                                <div className="py-3 ms-4 me-2" key={index}>
                                    <div href="#" className="cardLink">
                                        <div className="card shadow cardBorder">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-4 d-flex align-items-center">
                                                        <div>
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
                                                            <button className='btn me-2 bg-danger text-white donationButton' >
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
                                                        <div className="col-10">
                                                            <div className='d-flex flex-column align-items-start ms-3'>
                                                                <h5 className='fw-bold'>{card.title}</h5>
                                                                <p><b className='text-muted'>Expire Date: {card.expireDate}</b> <b className='text-muted'><FaMapMarkerAlt className='text-danger ms-2' /> {card.location}</b> </p>
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
    )
}