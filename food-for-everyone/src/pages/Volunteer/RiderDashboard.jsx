import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import "../../assets/css/RiderDashboard.css"
import check from "../../images/check.png"
import truck from "../../images/truck.png"
import error from "../../images/error.png"
import { useState } from 'react';

export default function RiderDashboard() {
    const [active, setActive] = useState('one-time');
    return (
        <div>
            <Navbar />
            <div className="homePage d-flex">
                <Sidebar />
                <div className="main-content mt-5 riderMain">
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <div>
                            <h5 className="mb-0">Recent Update</h5>
                        </div>
                        <div className="btn-group my-2 d-flex justify-content-center" role="group">
                            <button type="button" className={`btn ${active === 'one-time' ? 'active-btn' : 'inactive-btn'}`} onClick={() => setActive('one-time')} style={{ width: "120px", height: "40px" }}>Available</button>
                            <button type="button" className={`btn ${active === 'monthly' ? 'active-btn' : 'inactive-btn'}`} onClick={() => setActive('monthly')} style={{ width: "100px", height: "40px" }}> Unavailable</button>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="card shadow  p-3 d-flex flex-row align-items-center justify-content-between BackgroundColor"  >
                            <div className="d-flex flex-column justify-content-center ">
                                <h6 className='mt-1'>Delivered to: Agrabad</h6>
                                <p className='mb-0'>Order ID: #121214</p>
                            </div>
                            <div className="d-flex flex-column justify-content-center text-center">
                                <h6 className='mb-0'><span className='text-muted'>Status:</span> Pending</h6>
                            </div>
                            <div className="d-flex flex-column justify-content-center text-center me-3">
                                <h6 className='mb-0'><span className='text-muted text-success'>Delivery Date:</span> 13-08-2024</h6>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="card shadow  p-3 d-flex flex-row align-items-center justify-content-between BackgroundColor">
                            <div className="d-flex flex-column justify-content-center ">
                                <h6 className='mt-1'>Delivered to: Agrabad</h6>
                                <p className='mb-0'>Order ID: #625654</p>
                            </div>
                            <div className="d-flex flex-column justify-content-center text-center">
                                <h6 className='mb-0'><span className='text-muted'>Status:</span> Delivered</h6>
                            </div>
                            <div className="d-flex flex-column justify-content-center text-center me-3">
                                <h6 className='mb-0'><span className='text-muted'>Delivery Date:</span> 13-08-2024</h6>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <h5 className="mb-0">Delivery Status</h5>
                    </div>
                    <div className="row mt-3">
                        <div className="col-4">
                            <div className="card shadow rounded px-5 d-flex flex-row align-items-center py-3 BackgroundColor">
                                <div className="d-flex align-items-center me-3">
                                    <img src={check} alt="" style={{ height: "45px" }} />
                                </div>
                                <div className="d-flex flex-column justify-content-center ms-3">
                                    <h4 className='mb-0'>120</h4>
                                    <p className='mb-0 text-muted fw-bold'>Delivered</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card shadow rounded px-5 d-flex flex-row align-items-center py-3 BackgroundColor">
                                <div className="d-flex align-items-center me-3">
                                    <img src={truck} alt="" style={{ height: "50px" }} />
                                </div>
                                <div className="d-flex flex-column justify-content-center  ms-3">
                                    <h4 className='mb-0'>21</h4>
                                    <p className='mb-0 text-muted fw-bold'>Out of Delivery</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card shadow rounded px-5 d-flex flex-row align-items-center py-3 BackgroundColor">
                                <div className="d-flex align-items-center me-3">
                                    <img src={error} alt="" style={{ height: "50px" }} />
                                </div>
                                <div className="d-flex flex-column justify-content-center  ms-3">
                                    <h4 className='mb-0'>41</h4>
                                    <p className='mb-0 text-muted fw-bold'>Failed Order</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <h5 className="mb-0">Running Delivery</h5>
                    </div>
                    <div className="row mt-3 mb-5">
                    <div className="col-6">
                            <div className="card shadow rounded runningCard">
                                <div className="row g-0">
                                    <div className="col-md-6 border-end">
                                        <div className='p-4'>
                                            <h5 className='mb-4'>Pickup Information</h5>
                                            <div className='d-flex align-items-center mb-3'>
                                                <h6 className='mb-0 me-2'>Name:</h6>
                                                <p className='mb-0'>Armanur Rashid</p>
                                            </div>
                                            <div className='d-flex align-items-center mb-3'>
                                                <h6 className='mb-0 me-2'>Number:</h6>
                                                <p className='mb-0'>01432792311</p>
                                            </div>
                                            <div className='d-flex align-items-center mb-3'>
                                                <h6 className='mb-0 me-2'>Address:</h6>
                                                <p className='mb-0'>Agrabad Mogoltuli</p>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <h6 className='mb-0 me-2'>Message:</h6>
                                                <p className='mb-0'><button className='btn btn-secondary'>Contact</button></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className='p-4'>
                                            <h5 className='mb-4'>Deliver Information</h5>
                                            <div className='d-flex align-items-center mb-3'>
                                                <h6 className='mb-0 me-2'>Name:</h6>
                                                <p className='mb-0'>Armanur Rashid</p>
                                            </div>
                                            <div className='d-flex align-items-center mb-3'>
                                                <h6 className='mb-0 me-2'>Number:</h6>
                                                <p className='mb-0'>01432792311</p>
                                            </div>
                                            <div className='d-flex align-items-center mb-3'>
                                                <h6 className='mb-0 me-2'>Address:</h6>
                                                <p className='mb-0'>Agrabad Mogoltuli</p>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <h6 className='mb-0 me-2'>Message:</h6>
                                                <p className='mb-0'><button className='btn btn-secondary'>Contact</button></p>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="card shadow rounded runningCard">
                                <div className="row g-0">
                                    <div className="col-md-6 border-end">
                                        <div className='p-4'>
                                            <h5 className='mb-4'>Pickup Information</h5>
                                            <div className='d-flex align-items-center mb-3'>
                                                <h6 className='mb-0 me-2'>Name:</h6>
                                                <p className='mb-0'>Armanur Rashid</p>
                                            </div>
                                            <div className='d-flex align-items-center mb-3'>
                                                <h6 className='mb-0 me-2'>Number:</h6>
                                                <p className='mb-0'>01432792311</p>
                                            </div>
                                            <div className='d-flex align-items-center mb-3'>
                                                <h6 className='mb-0 me-2'>Address:</h6>
                                                <p className='mb-0'>Agrabad Mogoltuli</p>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <h6 className='mb-0 me-2'>Message:</h6>
                                                <p className='mb-0'><button className='btn btn-secondary'>Contact</button></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className='p-4'>
                                            <h5 className='mb-4'>Deliver Information</h5>
                                            <div className='d-flex align-items-center mb-3'>
                                                <h6 className='mb-0 me-2'>Name:</h6>
                                                <p className='mb-0'>Armanur Rashid</p>
                                            </div>
                                            <div className='d-flex align-items-center mb-3'>
                                                <h6 className='mb-0 me-2'>Number:</h6>
                                                <p className='mb-0'>01432792311</p>
                                            </div>
                                            <div className='d-flex align-items-center mb-3'>
                                                <h6 className='mb-0 me-2'>Address:</h6>
                                                <p className='mb-0'>Agrabad Mogoltuli</p>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <h6 className='mb-0 me-2'>Message:</h6>
                                                <p className='mb-0'><button className='btn btn-secondary'>Contact</button></p>
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
    );
}