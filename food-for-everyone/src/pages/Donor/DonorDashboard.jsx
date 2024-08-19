import { FaEdit } from 'react-icons/fa'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import userAvatar from '../../images/avatar.jpg'
import '../../assets/css/donorDashboard.css'
import { MdDelete } from 'react-icons/md'
import { useEffect, useState } from 'react'

export default function DonorDashboard() {
    const [value, setValue] = useState('');
    const [donationIds, setDonationIds] = useState([]);
    const [donationData, setDonationData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const valueFromLocalStorage = localStorage.getItem('user_type');
                if (valueFromLocalStorage) {
                    setValue(valueFromLocalStorage);
                }

                // Fetch the list of donation IDs first
                const responseIds = await fetch("http://localhost:8000/api/donation-posts", {
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
                <div className="main-content mt-5">
                    {donationData.map((donation, index) => (
                        <div key={index} className='containerBody mb-5 mt-5'>
                            <div className="post-body">
                                <div className="user-info">
                                    <div className="user">
                                        <img src={userAvatar} alt="" className='user-pro-pic' />
                                        <h5 className='userName'>Armanur Rashid</h5>
                                    </div>
                                    {value === 'Donor' ? (
                                        <div className='post-option-icons'>
                                            <FaEdit className='editicon' />
                                            <span><MdDelete className='deleteicon' /></span>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="date-time text-muted">
                                    {donation.donationPost.created_at && new Date(donation.donationPost.created_at).toLocaleString()}<span></span>
                                </div>
                                <div className="Title">
                                    <div className="d-flex justify-content-between" >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <h4 style={{ margin: 0 }} className="text-success">{donation.donationPost.post_name}</h4>
                                            <span className="text-muted serves mx-2" >({donation.donationPost.serves} person - {donation.donationPost.donee_type})</span>
                                        </div>
                                        {value === 'Donee' ? (
                                            <>
                                                <button className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Request for Food</button>
                                                <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                    <div className="modal-dialog modal-lg modal-dialog-centered">
                                                        <div className="modal-content">
                                                            <div className="modal-header d-flex align-items-center justify-content-between">
                                                                <h4 className="modal-title fs-5 " id="staticBackdropLabel">Food Request Form</h4>
                                                                <button type="button" className="close text-danger" data-bs-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="mb-3 mx-3">
                                                                    <label htmlFor="foodName" className="form-label mt-2 formLabel">Name <span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control formInput bg-light" id="userName" required="required" />
                                                                </div>
                                                                <div className="mb-3 mx-3">
                                                                    <label htmlFor="foodName" className="form-label mt-2 formLabel">Location <span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control formInput bg-light" id="userLocation" required="required" />
                                                                </div>
                                                                <div className="mb-3 mx-3">
                                                                    <label htmlFor="foodName" className="form-label mt-2 formLabel">Quantity <span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control formInput bg-light" id="userName" required="required" />
                                                                </div>
                                                                <div className="mb-3 mx-3">
                                                                    <label htmlFor="foodName" className="form-label mt-2 formLabel">Delivery <span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control formInput bg-light" id="userName" required="required" />
                                                                </div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-primary">Request</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                    <div className='text-muted'>
                                        <p className='mb-0'>Location: {donation.donationPost.pickup_location}</p>
                                        <p className='mb-0'>Expire Date: {donation.donationPost.expiredate}</p>
                                        <p className='mb-0'>Last Receive Date: {donation.donationPost.last_receive_date}</p>
                                        <p>Receive Time: {donation.donationPost.receive_time}</p>
                                    </div>
                                    <p className="text-justify">{donation.donationPost.post_description}</p>
                                </div>
                                {/* <div className="d-flex justify-content-center">
                                    {donation.imagePaths && donation.imagePaths.map((image, imgIndex) => (
                                        <img key={imgIndex} src={image} alt={`Donation Image ${imgIndex}`} className='upload-img' 
                                        style={imgIndex === 1 ? { height: '50%', width: '50%' } : {}}
                                        />
                                    ))}
                                </div> */}
                                <div className="d-flex justify-content-center">
                                    {donation.imagePaths && donation.imagePaths.map((image, imgIndex) => {
                                        let imageSizeStyle = {};
                                        if (donation.imagePaths.length === 1) {
                                            imageSizeStyle = { height: '45%', width: '45%' };
                                        }
                                        else if (donation.imagePaths.length === 2) {
                                            imageSizeStyle = { height: '45%', width: '45%', paddingLeft: '10px', paddingRight: '10px' };
                                        } else if (donation.imagePaths.length === 3) {
                                            imageSizeStyle = { height: '30%', width: '30%', paddingLeft: '10px', paddingRight: '10px' };
                                        } else if (donation.imagePaths.length === 4) {
                                            imageSizeStyle = { height: '25%', width: '25%', paddingLeft: '10px', paddingRight: '10px'  };
                                        }

                                        return (
                                            <img
                                                key={imgIndex}
                                                src={image}
                                                alt={`Donation Image ${imgIndex}`}
                                                className='upload-img'
                                                style={imageSizeStyle}
                                            />
                                        );
                                    })}
                                </div>


                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
