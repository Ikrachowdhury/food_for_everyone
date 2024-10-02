import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import "../../assets/css/DoneeList.css";
import "../../assets/css/receivedDonation.css";
import { useEffect, useState } from 'react';
import { IoPersonSharp, IoTime } from 'react-icons/io5';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaLocationDot, FaRegCalendarDays } from 'react-icons/fa6';
import { RiUserReceived2Fill } from 'react-icons/ri';
// import { useRef } from 'react';

export default function ReceivedDonationList() {
    const [modelData, setModalData] = useState(null);
    const [queries, setQueries] = useState("");
    const [historyData, setHistoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [ratingData, setRatingData] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("")
    // const staticBackdropModalRef = useRef(null);
    console.log(error)
    const okButton = () => {
        window.location.reload();
    }
    const handleDetailsModal = (history) => {
        setModalData(history);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                const response = await fetch(`http://localhost:8000/api/doneeHistory/${user_id}`, {
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
                setHistoryData(result.accepted_donations);
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    const handleRating = async (donationId, rating) => {
        console.log(rating)
        console.log(donationId)
        const url = 'http://localhost:8000/api/rating';
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ donationID: donationId, rating: rating })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let result = await response.json();
            if (result.success) {
                // alert('Rating successfully!');
                // window.location.reload();
                setMessage("Rating successfully!")
                const modalElement1 = document.getElementById('staticBackdrop');
                const modal = window.bootstrap.Modal.getInstance(modalElement1); 
                if (modal) {
                    modal.hide(); 
                }
                const modalElement = new window.bootstrap.Modal(document.getElementById('ratingModal'));
                modalElement.show();
            } else {
                // alert('Error: ' + result.message);
                setMessage('Error: ' + result.message);
                const modalElement = new window.bootstrap.Modal(document.getElementById('ratingModal'));
                modalElement.show();
            }
        } catch (error) {
            console.error('Error:', error);
            // alert('An error occurred while rating the donation. ' + error.message);
        }
    };


    return (
        <div>
            <Navbar />
            <div className="homePage d-flex">
                <Sidebar />
                <div className="main-content mt-5 ">
                    <main className="table mt-5 style={{ verticalAlign: 'middle' }} table-row-gray-300">
                        <section className="table__header">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0 ms-4">
                                    <li className="breadcrumb-item"><b>Donation</b></li>
                                    <li className="breadcrumb-item active" aria-current="page"><b>Received Donation</b></li>
                                </ol>
                            </nav>
                            <div className="">
                                <input
                                    placeholder="Search"
                                    className="searchInput me-4"
                                    onChange={(e) => setQueries(e.target.value)}
                                />
                            </div>
                        </section>
                        {isLoading ? (
                            <div className="centered-content">
                                <div className="text">Loading...</div>
                            </div>
                        ) :
                            historyData.length > 0 ? (
                                <section className="table__body">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="min-w-100px text-center"> Id </th>
                                                <th className="min-w-100px text-center"> Post Title </th>
                                                <th className="min-w-100px text-center"> Donee </th>
                                                <th className="min-w-100px text-center"> Rating </th>
                                                <th className="min-w-100px text-center"> Details </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {historyData.filter((data) => {
                                                const values = Object.values(data).flatMap(field => {
                                                    if (typeof field === 'object' && field !== null) {
                                                        return Object.values(field).filter(innerField => typeof innerField === 'string');
                                                    }
                                                    return typeof field === 'string' ? field : [];
                                                });

                                                return values.some(field => field.toLowerCase().includes(queries.toLowerCase()));
                                            }).map((order, index) => (
                                                <tr key={index} >
                                                    {/* {setRatingData(order.donation_id)} */}
                                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>{index + 1}</td>
                                                    <td className="text-center" style={{ verticalAlign: 'middle', fontSize: '17px' }}>{order.donationPost.post_name}</td>
                                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.donorName}</td>
                                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                        {order.rating ? (
                                                            <p className='mb-0'>{order.rating}</p>
                                                        ) : (
                                                            <button
                                                                className='btn btn-outline-secondary'
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#staticBackdrop"
                                                                onClick={() => handleDetailsModal(order)}
                                                            >
                                                                Rate
                                                            </button>
                                                        )}
                                                    </td>
                                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                        <button className='btn btn-outline-secondary' data-bs-toggle="modal" data-bs-target="#detailsModal" onClick={() => handleDetailsModal(order)}>See Details</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </section>
                            ) : (
                                <div className="centered-content">
                                    <div className="text">
                                        <span>Ooops...</span>
                                    </div>
                                    <div className="MainMessage">No History</div>
                                </div>
                            )}
                    </main>
                    {modelData && (
                        <div className="modal fade" id="detailsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">{modelData.donationPost.post_name}</h5>
                                        <button type="button" className="close text-danger" data-bs-dismiss="modal" aria-label="Close">
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
                                                    <h6 className="card-text ms-2 text-muted">Pickup Date</h6>
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
                                                <h6 className='text-start'>Description</h6>
                                                <p className='text-justify'>{modelData.donationPost.post_description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="modal fade " id="ratingModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <strong className="me-auto text-success">Rating</strong>
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
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Rating</h5>
                                    <button type="button" className="close text-danger" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="receivedrating">
                                        <input type="radio" name="receivedrating" id="r1" value="5" />
                                        <label htmlFor="r1"></label>
                                        <input type="radio" name="receivedrating" id="r2" value="4" />
                                        <label htmlFor="r2"></label>
                                        <input type="radio" name="receivedrating" id="r3" value="3" />
                                        <label htmlFor="r3"></label>
                                        <input type="radio" name="receivedrating" id="r4" value="2" />
                                        <label htmlFor="r4"></label>
                                        <input type="radio" name="receivedrating" id="r5" value="1" />
                                        <label htmlFor="r5"></label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => {
                                            const selectedRating = document.querySelector('input[name="receivedrating"]:checked');
                                            console.log("Selected Rating:", selectedRating ? selectedRating.value : "No rating selected");
                                            console.log("modelData:", modelData);
                                            if (selectedRating) {
                                                handleRating(modelData.donationPost.donation_id, selectedRating.value);
                                            } else {
                                                console.log("No rating selected");
                                                alert('Please select a rating before submitting.');
                                            }
                                        }}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
