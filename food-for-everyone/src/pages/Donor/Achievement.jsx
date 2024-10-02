import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar'
import { FaStar } from "react-icons/fa";
import Navbar from '../../components/Navbar'
import "../../assets/css/Achievement.css"
export default function Achievement() {
    const [totalDonatePeople, setTotalDonatePeople] = useState(0);
    const [totalServes, setTotalServes] = useState(0);
    const [totalRating, setTotalRating] = useState(0);
    const [individualRating, setIndividualRating] = useState('');
    // const rating = 3.9;
    const filledStars = Math.floor(totalRating);
    const percentageFill = (totalRating - filledStars) * 100;
    const remainingStars = 5 - filledStars - (percentageFill > 0 ? 1 : 0);
    // useEffect(() => {
    //     fetchTotalDelivered();
    // }, []);
    // const fetchTotalDelivered = async () => {
    //     try {
    //         const response = await fetch('http://localhost:8000/api/get-total-delivered-donations');
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         const data = await response.json();
    //         const totalDeliveredCount = data.reduce((acc, curr) => acc + curr.delivered_count, 0);
    //         const totalServesSum = data.reduce((acc, curr) => acc + curr.total_serves, 0);
    //         setTotalDelivered(totalDeliveredCount);
    //         setTotalServes(totalServesSum);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                console.log(user_id)
                const response = await fetch(`http://localhost:8000/api/getAllRatingDetails/${user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    const result = await response.json();
                    setIndividualRating(result.req_id)
                    console.log(result.req_id)
                }
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                console.log(user_id)
                const response = await fetch(`http://localhost:8000/api/totalServes/${user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                else {
                    const result = await response.json();
                    setTotalServes(result)
                    console.log(result)
                }
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                console.log(user_id)
                const response = await fetch(`http://localhost:8000/api/totalDonatedPeople/${user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                else {
                    const result1 = await response.json();
                    setTotalDonatePeople(result1)
                    setTotalRating(result1.rating)
                    console.log(result1)
                }
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <div>
                <Navbar />
                <div className="homePage d-flex">
                    <Sidebar />
                    <div className="main-content mt-5">
                        <div className="row row-cols-1 row-cols-xl-2 row-cols-lg-2 row-cols-md-1 row-cols-sm-1 g-4 mt-5 ">
                            <div className="col text-center px-4 py-5 mt-5">
                                <div className="cardLink">
                                    <div className="card shadow-sm bg-light" >
                                        <div className="card-body">
                                            <h2 className="cardTitle text-dark fw-bold pb-2">Rating Overview</h2>
                                            <h4 className='rating-number fw-bold'>{totalRating?totalRating.toFixed(1):0}<small>/5</small></h4>
                                            <div className="mb-3">
                                                {[...Array(filledStars)].map((_, index) => (
                                                    <FaStar key={index} className="mx-2 text-warning" style={{ fontSize: 25 }} />
                                                ))}
                                                {percentageFill > 0 && (
                                                    <FaStar
                                                        className="mx-2 text-warning"
                                                        style={{ fontSize: 25, clipPath: `polygon(0 0, ${percentageFill}% 0, ${percentageFill}% 100%, 0 100%)` }}
                                                    />
                                                )}
                                                {[...Array(remainingStars)].map((_, index) => (
                                                    <FaStar key={index} className="mx-2 text-secondary" style={{ fontSize: 25 }} />
                                                ))}
                                            </div>
                                            <div className='text-muted mb-3'><h5>{totalDonatePeople.req_id} ratings</h5></div>
                                            <div className='d-flex justify-content-center mb-1'>
                                                <h6 className='text-muted mx-3'>5 <FaStar className='mx-2' style={{ fontSize: 20 }} /></h6>
                                                <div className="progress" style={{ width: "50%", height: "22px" }}>
                                                    <div className="progress-bar bg-warning" role='progressbar' style={{ width: `${individualRating.rating5 ? (individualRating.rating5 / totalDonatePeople.req_id) * 100 : 0}%` }}
                                                        aria-valuenow={individualRating.rating5 ? individualRating.rating5 : 0} aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <h6 className='text-muted mx-3'>{individualRating.rating5 ? (individualRating.rating5 / totalDonatePeople.req_id) * 100 : 0}</h6>
                                            </div>
                                            <div className='d-flex justify-content-center mb-1'>
                                                <h6 className='text-muted mx-3'>4 <FaStar className='mx-2' style={{ fontSize: 20 }} /></h6>
                                                <div className="progress " style={{ width: "50%", height: "22px" }}>
                                                    <div
                                                        className="progress-bar bg-warning"
                                                        role="progressbar"
                                                        style={{ width: `${individualRating.rating4 ? (individualRating.rating4 / totalDonatePeople.req_id) * 100 : 0}%` }}
                                                        aria-valuenow={individualRating.rating4 ? (individualRating.rating4 / totalDonatePeople.req_id) * 100 : 0}
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                    >
                                                    </div>
                                                </div>
                                                <h6 className='text-muted mx-3'>{individualRating.rating4 ? individualRating.rating4 : 0}</h6>
                                            </div>
                                            <div className='d-flex justify-content-center mb-1'>
                                                <h6 className='text-muted mx-3'>3 <FaStar className='mx-2' style={{ fontSize: 20 }} /></h6>
                                                <div className="progress " style={{ width: "50%", height: "22px" }}>
                                                    <div className="progress-bar bg-warning" role='progressbar' style={{ width: `${individualRating.rating3 ? (individualRating.rating3 / totalDonatePeople.req_id) * 100 : 0}%` }}
                                                        aria-valuenow={individualRating.rating3 ? individualRating.rating3 : 0} aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <h6 className='text-muted mx-3'>{individualRating.rating3 ? individualRating.rating3 : 0}</h6>
                                            </div>
                                            <div className='d-flex justify-content-center mb-1'>
                                                <h6 className='text-muted mx-3'>2 <FaStar className='mx-2' style={{ fontSize: 20 }} /></h6>
                                                <div className="progress " style={{ width: "50%", height: "22px" }}>
                                                    <div className="progress-bar bg-warning" role='progressbar' style={{ width: `${individualRating.rating2 ? (individualRating.rating2 / totalDonatePeople.req_id) * 100 : 0}%` }}
                                                        aria-valuenow={individualRating.rating2 ? individualRating.rating2 : 0} aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <h6 className='text-muted mx-3'>{individualRating.rating2 ? individualRating.rating2 : 0}</h6>
                                            </div>
                                            <div className='d-flex justify-content-center mb-1'>
                                                <h6 className='text-muted mx-3'>1 <FaStar className='mx-2' style={{ fontSize: 20 }} /></h6>
                                                <div className="progress " style={{ width: "50%", height: "22px" }}>
                                                    <div className="progress-bar bg-warning" role='progressbar' style={{ width: `${individualRating.rating1 ? (individualRating.rating1 / totalDonatePeople.req_id) * 100 : 0}%` }}
                                                        aria-valuenow={individualRating.rating1 ? individualRating.rating1 : 0} aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <h6 className='text-muted mx-3'>{individualRating.rating1 ? individualRating.rating1 : 0}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col px-4 py-5 mt-5">
                                <div>
                                    <div className="card shadow-sm bg-light">
                                        <div className="card-body">
                                            <h2 className="cardTitle text-center text-dark fw-bold pb-2">Donation Overview</h2>
                                            <div className='mt-5'>
                                                <p className='text-muted' style={{ fontSize: "25px" }}>Total Rated: {totalDonatePeople.req_id} times</p>
                                                <p className='text-muted' style={{ fontSize: "25px" }}>Total Donated: {totalServes.totalServesPeople} times</p>
                                                <p className='text-muted' style={{ fontSize: "25px" }}>Total Money Donation: 25,000/-</p>
                                                <p className='text-muted' style={{ fontSize: "25px" }}>Total Donated Food: {totalServes.totalServes} Persons</p>
                                                <p className='text-muted mb-4' style={{ fontSize: "25px" }}>Total Donated People: {totalDonatePeople.unique_user_count} Donee</p>
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
    )
}
