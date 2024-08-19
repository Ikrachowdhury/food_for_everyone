import Sidebar from '../../components/Sidebar'
import "../../assets/css/RequestedDonation.css"
import image1 from "../../images/avatar.jpg"
import Navbar from '../../components/Navbar'
import { useEffect, useState } from 'react'
import { HiMapPin } from 'react-icons/hi2'
import { IoMdNotifications } from 'react-icons/io'

export default function RequestedDonation() {
    const user_id = localStorage.getItem('user_id');
    const [donationID, setDonationID] = useState(0);
    const [RequestedData, setRequestedData] = useState([]);
    const [error, setError] = useState(null);
    const handleDonationID = (donationId) => {
        setDonationID(donationId);
    };

    console.log(error)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/donorsideRequestedPost/${user_id}`, {
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

    const handleAcceptDonation = async () => {
        console.log(donationID)
        const url = 'http://localhost:8000/api/accept-DonationRequest';
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
            if (result.success) {
                alert('Donation accepted successfully!');
                window.location.reload(); // Reload the page
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while accepting the donation. ' + error.message);
        }
    };
    const handleRejectDonation = async () => {
        console.log(donationID)
        const url = 'http://localhost:8000/api/reject-DonationRequest';
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
            if (result.success) {
                alert('Donation rejected successfully!');
                window.location.reload();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while rejecting the donation. ' + error.message);
        }
    };


    return (
        <div>
            <Navbar />
            <div className="homePage d-flex">
                <Sidebar />
                <div className="main-content mt-5">
                    <div className="container mt-5">
                        <div className="row">
                            {RequestedData.length < 1 ? (
                                <div className="centered-content">
                                    <div className="text">
                                        <span>Ooops...</span>
                                        
                                    </div>
                                    <div className="number">No Request</div>
                                    
                                </div>
                            ) : (
                                RequestedData.map((card, index) => (
                                    <div className="col-md-6 mb-4" key={index}>
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
                                                            <div>
                                                                <div className="d-flex justify-content-between">
                                                                    <h3>{card.donation_post.post_name}</h3>
                                                                    <div className="position-relative d-inline-flex align-items-center mx-2">
                                                                        <IoMdNotifications size={30} className='text-primary' />
                                                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                                            {card.pending_count}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <h6 className='text-muted'>
                                                                    Validity: {card.donation_post.expiredate}
                                                                </h6>
                                                                <h6 className='text-muted'>
                                                                    <HiMapPin className='text-danger' /> {card.donation_post.pickup_location} | {card.donation_post.categories} |  {card.donation_post.serves} | {card.donation_post.donee_type}
                                                                </h6>
                                                            </div>
                                                        </div>
                                                        <div className='mt-2'>
                                                            <button className='btn me-2 donationButton position-relative' style={{ height: "40px", fontSize: "15px", backgroundColor: "#A0F0A8", width: "180px" }} data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleDonationID(card.donation_id)}>
                                                                See all request
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}

                        </div>
                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                                <div className="modal-content" style={{ width: "1500px" }}>
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Requests</h5>
                                        <button type="button" className="close text-danger" data-bs-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="text-center"> Donor </th>
                                                    <th className="text-center"> Name </th>
                                                    <th className="text-center"> Location</th>
                                                    <th className="text-center"> Donee Type</th>
                                                    <th className="text-center"> Delivery </th>
                                                    <th className="text-center"> Contact </th>
                                                    <th className="text-center"> Action </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {RequestedData.map(data => (
                                                    data.donation_id === donationID ? (
                                                        <tr key={data.id} style={{ height: "50px" }}>
                                                            <td className="text-center"><img src={image1} alt="" height={40} width={40} /></td>
                                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.user.name}</td>
                                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.location}</td>
                                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.user.user_type}</td>
                                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.delivery}</td>
                                                            <td className="text-center" style={{ verticalAlign: 'middle' }}><button className="btn btn-outline-secondary">Donee</button></td>
                                                            <td className="text-center">
                                                                <button className="btn btn-outline-success mx-2" onClick={handleAcceptDonation}>✓</button>
                                                                <button className="btn btn-outline-danger mx-2" onClick={handleRejectDonation}>X</button>
                                                            </td>
                                                        </tr>
                                                    ) : null
                                                ))}
                                            </tbody>
                                        </table>
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