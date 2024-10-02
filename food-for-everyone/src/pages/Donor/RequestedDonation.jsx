import Sidebar from '../../components/Sidebar'
import "../../assets/css/RequestedDonation.css"
import image1 from "../../images/avatar.png"
import Navbar from '../../components/Navbar'
import { useEffect, useState } from 'react'
import { HiMapPin } from 'react-icons/hi2'
import { IoMdNotifications } from 'react-icons/io'

export default function RequestedDonation() {
    const user_id = localStorage.getItem('user_id');
    const [donationID, setDonationID] = useState(0);
    const [RequestedData, setRequestedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [toast, setToast] = useState(false);
    const [message, setMessage] = useState("");
    const [showRequestModal, setRequestModal] = useState(true);

    const okButton = () => {
        window.location.reload();
    }

    // const closeToast = () => {
    //     setToast(false)
    //     window.location.reload();
    // }
    const handleDonationID = (donationId) => {
        setDonationID(donationId);
    };
    function getRequestsForDonation(donationID) {
        // Find the donation that matches the given donationID
        const donation = RequestedData.find(donation => donation.donation_id === donationID);
        
        if (donation && donation.requests) {
            // Check if requests are in array form or object form
            if (Array.isArray(donation.requests)) {
                return donation.requests;
            } else {
                // Convert requests object to array if it's in object form
                return Object.values(donation.requests);
            }
        }
        return [];
    }

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
                // result == $pendingRequests, $pendingDonations, $images, $users
                setRequestedData(result)
                setIsLoading(false)

            } catch (error) {
                setIsLoading(false)
                setError(error.message);
            }
        };
        fetchData();
    }, []);

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

    const handleAcceptDonation = async (deliveryType, donee_id) => {
        let reciever_id = donee_id;
        // console.log(donationID+'<--donationID'+donee_id+'<--donee_id  ',deliveryType)
        console.log(deliveryType)
        const url = 'http://localhost:8000/api/accept-DonationRequest';
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ donationID, donee_id, deliveryType })
            });
            const result2 = await response.json();
            console.log("Result:", result2);  

            if (response.status === 200) {
                const postLocation = result2.post_location[0];


                let minDistance = Infinity;
                let minRiderId = null;

                if (result2.result_type === 'delivery_result') {
                    const postLat = postLocation.location_lat;
                    const postLon = postLocation.location_lon;
                    console.log(postLat + " postLat " + postLon + " postLon ")
                 
                    result2.rider_locations.forEach(async rider => {
                        const riderLat = rider.address_lat;
                        const riderLon = rider.address_lon;

                        console.log(riderLat + " riderLat " + riderLon + " riderLot ")

                        const distance = haversineDistance(postLat, postLon, riderLat, riderLon);
                        console.log(distance + " check " + minDistance)
                        if (distance < minDistance && distance < 2) {
                            console.log(distance + " check1 " + minDistance)
                            console.log("ok")
                            minDistance = distance;
                            minRiderId = rider.id;
                            reciever_id = minRiderId
                            //-----------setting ridere-------------
                            try {
                                let item = { donationID, minRiderId };
                                console.log('delivery result' + item.minRiderId);
                                let response3 = await fetch("http://localhost:8000/api/selectRider", {
                                    method: 'POST',
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Accept": "application/json"
                                    },
                                    body: JSON.stringify(item)
                                });
                                if (response3.status === 200) {
                                    reciever_id = minRiderId
                                    setMessage("Donation Request Accepted with rider pickup")
                                    const modalElement = new window.bootstrap.Modal(document.getElementById('sentRequest'));
                                    modalElement.show();
                                    setRequestModal(false);
                                    // setMessage("Donation Request Accepted");
                                    // setToast(true);
                                }
                                console.log(response);
                            } catch (error) {
                                console.error("An error occurred:", error);
                            }
                        } 
                    });
//con great 2
                    if(minRiderId === null){
                        const url = 'http://localhost:8000/api/setDeliveryType';

                        let response = await fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({ donationID, donee_id })
                        });
                        console.log("check" + "  " + donationID + " " + donee_id)
                        setMessage("Donation Request Accepted with donee pickup no rider distance matched")
                        const modalElement = new window.bootstrap.Modal(document.getElementById('sentRequest'));
                        modalElement.show();
                        setRequestModal(false);
                    }


                } else if (result2.result_type === 'pickup_result') {

                    setMessage("Donation Request Accepted with Donee pickup")
                    const modalElement = new window.bootstrap.Modal(document.getElementById('sentRequest'));
                    modalElement.show();
                    setRequestModal(false);

                }
                //_______________creatting chat inbox_______________
                const formData = new FormData();
                formData.append("doner_id", user_id);
                formData.append("reciever_id", reciever_id);
                formData.append("donation_id", donationID);
                formData.append("masg_type", "onRun");
                console.log(user_id)
                let response = await fetch("http://localhost:8000/api/createInbox", {
                    method: 'POST',
                    body: formData,
                    headers: {
                        "Accept": 'application/json'
                    }
                });
                let result = await response.json();
                console.log("Result:", result);

                //for rider he has to also have donee inbox so creating second inbox
                if (minRiderId !== null) {
                    formData.append("doner_id", donee_id);
                    formData.append("reciever_id", reciever_id);
                    formData.append("donation_id", donationID);
                    formData.append("masg_type", "onRun");
                    let response = await fetch("http://localhost:8000/api/createInbox", {
                        method: 'POST',
                        body: formData,
                        headers: {
                            "Accept": 'application/json'
                        }
                    });
                    let result = await response.json();
                    console.log("Result:", result);
                }


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
                const modalElement = new window.bootstrap.Modal(document.getElementById('rejectSuccess'));
                modalElement.show();
                const modalElement1 = document.getElementById('staticBackdrop');
                const modal = window.bootstrap.Modal.getInstance(modalElement1);
                if (modal) {
                    modal.hide();
                }
                
                
                // alert('Donation rejected successfully!');
                // window.location.reload();
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
                            {isLoading ? (
                                <div className="centered-content">
                                    <div className="text">Loading...</div>
                                </div>
                            ) :
                                RequestedData.length < 1 ? (
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
                                                            <div className='imageDiv' style={{ height: "150px", width: "80%" }}>
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
                        {showRequestModal && (
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
                                                        <th className="text-center"> Donee </th>
                                                        <th className="text-center"> Name </th>
                                                        <th className="text-center"> Donee Type</th>
                                                        <th className="text-center"> Delivery </th>
                                                        <th className="text-center"> Action </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {RequestedData.map(datas => (
    datas.donation_id === donationID ? (
        getRequestsForDonation(datas.donation_id).map((data) => (
            <tr key={data.req_id} style={{ height: "50px" }}>
                <td className="text-center">
                    <img src={data.user.profile_img || image1} alt={data.user.name} height={40} width={40} />
                </td>
                <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.user.name}</td>
                <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.user.user_type}</td>
                <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.delivery}</td>
                <td className="text-center">
                    <button className="btn btn-outline-success mx-2" onClick={() => handleAcceptDonation(data.delivery, data.user_id)}>✓</button>
                    <button className="btn btn-outline-danger mx-2" onClick={() => handleRejectDonation(data.req_id)}>X</button>
                </td>
            </tr>
        ))
    ) : null
))}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="modal fade " id="sentRequest" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <strong className="me-auto text-success">Request Confirmation</strong>
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
                        <div className="modal fade" id="rejectSuccess" tabIndex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false">
                            <div className="modal-dialog modal-dialog-centered modal" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                        <strong className="me-auto text-success">Successful Message</strong>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3 mt-2 ">
                                            Request has been successfully rejected
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className='btn-primary' data-bs-dismiss="modal" aria-label="Close" onClick={okButton} >Ok</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* {toast && (
                            <div className="toast show bg-light" role="alert" aria-live="assertive" aria-atomic="true" style={{
                                position: 'fixed', top: '20px', right: '20px', zIndex: 9999, left: '50%', minWidth: '500px',
                                transform: 'translateX(-50%)',
                            }}>
                                <div className="toast-header">
                                    <strong className="me-auto text-success">{message}</strong>
                                    <button type="button" className="btn-close" onClick={closeToast} aria-label="Close"></button>
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    )
}