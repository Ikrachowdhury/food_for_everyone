import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import image from "../../images/Help.png";
import bkash from "../../images/bkash.png";
import "../../assets/css/DonateMoney.css";
import { FaRegCircle } from 'react-icons/fa';
import { BsBank, BsCreditCard2FrontFill } from 'react-icons/bs';
import HomeNavbar from '../../components/HomeNavbar';
// const value = localStorage.getItem('user_type');
// console.log(value);
export default function DonateMoney() {
    const [value, setValue] = useState(null);
    const [active, setActive] = useState('one-time');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [paymentFormSubmitted, setPaymentFormSubmitted] = useState(false);
    const [step, setStep] = useState(0);
    const [amount, setAmount] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    useEffect(() => {
        const userType = localStorage.getItem('user_type');
        setValue(userType);
    }, []);
    const handleNextClick = () => {
        if (!formSubmitted) {
            console.log(`${active} ${amount || customAmount}`);
        } else {
            console.log(selectedPaymentMethod);
        }
        setFormSubmitted(true);
        setStep((prevStep) => prevStep + 1);
    };
    const handlePaymentNextClick = () => {
        if (!paymentFormSubmitted) {
            console.log(selectedPaymentMethod);
        } else {
            console.log(selectedPaymentMethod);
        }
        setPaymentFormSubmitted(true);
        setStep((prevStep) => prevStep + 1);
    };

    const isNextButtonDisabled = () => {
        if (!formSubmitted) {
            return !amount && !customAmount;
        } else {
            return !selectedPaymentMethod;
        }
    };

    return (
        <div>
            {value?<Navbar />:<HomeNavbar/>}
            <div className="homePage d-flex">
            {value?<Sidebar />:null}
                
                <div className="main-content  dashboard-content mt-5"  style={value ?  { marginLeft: "78px" } : {} }>
                    <section className="imageSection">
                        <div className="landing-hero">
                            <img src={image} alt="" className="dashboard-image" />
                            <div className="_1080p-wrapper">
                                <div className="homepage-main-container">
                                    <h1 className="image-text">Rescuing good <br /> food to help people and planet</h1>
                                    <h5 className='image-minitext'>Support our work by <br /> donating today.</h5>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="row mx-5 mb-5">
                        <div className='col-6 px-5'>
                            <div className="px-5">
                                <div className="card shadow rounded">
                                    <div className='text-white py-3 d-flex justify-content-between align-items-center' style={{ backgroundColor: "#00C1D5" }}>
                                        <h3 className='mx-5 mb-0'>Donate Money</h3>
                                        <div className='me-5'>
                                            <FaRegCircle className={`mx-2 ${step >= 0 ? '' : 'text-secondary'}`} />
                                            <FaRegCircle className={`mx-2 ${step >= 1 ? '' : 'text-secondary'}`} />
                                            <FaRegCircle className={`mx-2 ${step >= 2 ? '' : 'text-secondary'}`} />
                                        </div>
                                    </div>
                                    <div className='px-5 py-3'>
                                        <h5 className='donationCardText mt-3'>Help us support community groups all across <br /> Ireland with surplus food.</h5>
                                        {!formSubmitted ? (
                                            <>
                                                <h4 className='mt-4 py-3 mb-3 text-center' style={{ backgroundColor: "#A0F0A8" }}>
                                                    Select Your Donation Amount
                                                </h4>
                                                <div className="btn-group my-2 d-flex justify-content-center" role="group">
                                                    <button
                                                        type="button"
                                                        className={`btn ${active === 'one-time' ? 'active-btn' : 'inactive-btn'}`}
                                                        onClick={() => setActive('one-time')}
                                                    >
                                                        One-time
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={`btn ${active === 'monthly' ? 'active-btn' : 'inactive-btn'}`}
                                                        onClick={() => setActive('monthly')}
                                                    >
                                                        Monthly
                                                    </button>
                                                </div>
                                                <div className='mt-4 d-flex justify-content-between'>
                                                    <button
                                                        className='btn btn-outline-secondary me-3 donateAmountButton'
                                                        onClick={() => { setAmount('500'); setCustomAmount(''); }}
                                                    >
                                                        <h6 className='mb-0'>500/-</h6>
                                                    </button>
                                                    <button
                                                        className='btn btn-outline-secondary me-3 donateAmountButton'
                                                        onClick={() => { setAmount('1000'); setCustomAmount(''); }}
                                                    >
                                                        <h6 className='mb-0'>1000/-</h6>
                                                    </button>
                                                    <button
                                                        className='btn btn-outline-secondary me-3 donateAmountButton'
                                                        onClick={() => { setAmount('1500'); setCustomAmount(''); }}
                                                    >
                                                        <h6 className='mb-0'>1500/-</h6>
                                                    </button>
                                                    <button
                                                        className='btn btn-outline-secondary donateAmountButton'
                                                        onClick={() => { setAmount('2000'); setCustomAmount(''); }}
                                                    >
                                                        <h6 className='mb-0'>2000/-</h6>
                                                    </button>
                                                </div>
                                                <div className='mt-4'>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Custom Amount"
                                                        aria-label="amount"
                                                        aria-describedby="basic-addon1"
                                                        style={{ height: "70px" }}
                                                        value={customAmount}
                                                        onChange={(e) => { setCustomAmount(e.target.value); setAmount(''); }}
                                                    />
                                                </div>
                                                <div className="mb-4 mt-3">
                                                    <button
                                                        className='btn w-100 py-3'
                                                        style={{ backgroundColor: "#00C1D5" }}
                                                        onClick={handleNextClick}
                                                        disabled={isNextButtonDisabled()}
                                                    >
                                                        <h5 className='mb-0 text-white'>Next</h5>
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {!paymentFormSubmitted ? (
                                                    <div>
                                                        <h4 className='mt-4 py-3 mb-3 text-center' style={{ backgroundColor: "#A0F0A8" }}>
                                                            Select Your Payment Method
                                                        </h4>
                                                        <div>
                                                            <div className='d-flex justify-content-center mt-2'>
                                                                <button
                                                                    className={`btn me-3 paymentOption my-2 btn-outline-secondary p-2 ${selectedPaymentMethod === 'bkash' ? 'active-btn' : ''}`}
                                                                    onClick={() => setSelectedPaymentMethod('bkash')}
                                                                >
                                                                    <h6 className='mb-0'>
                                                                        <img src={bkash} alt="" style={{ height: "50px", width: "280px" }} />
                                                                    </h6>
                                                                </button>
                                                            </div>
                                                            <div className='d-flex justify-content-center'>
                                                                <button
                                                                    className={`btn me-3 paymentOption my-2 d-flex align-items-center justify-content-center btn-outline-secondary ${selectedPaymentMethod === 'bank' ? 'active-btn' : ''}`}
                                                                    onClick={() => setSelectedPaymentMethod('bank')}
                                                                >
                                                                    <h3 className='mb-0 d-flex align-items-center'>
                                                                        Bank <BsBank className='mx-3' />
                                                                    </h3>
                                                                </button>
                                                            </div>
                                                            <div className='d-flex justify-content-center'>
                                                                <button
                                                                    className={`btn me-3 paymentOption my-2 d-flex align-items-center justify-content-center btn-outline-secondary ${selectedPaymentMethod === 'credit' ? 'active-btn' : ''}`}
                                                                    onClick={() => setSelectedPaymentMethod('credit')}
                                                                >
                                                                    <h3 className='mb-0 d-flex align-items-center'>
                                                                        Credit Card <BsCreditCard2FrontFill className='mx-3' />
                                                                    </h3>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button
                                                                className='btn w-100 py-3 mt-4 mb-4'
                                                                style={{ backgroundColor: "#00C1D5" }}
                                                                onClick={handlePaymentNextClick}
                                                                disabled={!selectedPaymentMethod}
                                                            >
                                                                <h5 className='mb-0 text-white'>Next</h5>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        {selectedPaymentMethod && (
                                                            <div>
                                                                <h4 className='mt-4 py-3 mb-3 text-center' style={{ backgroundColor: "#A0F0A8" }}>
                                                                    Provide your information
                                                                </h4>
                                                                <div>
                                                                    {selectedPaymentMethod === "bkash" ? (
                                                                        <div className='mt-4'>
                                                                            <div className="row">
                                                                                <div className="col-sm-12">
                                                                                    <div className="form-group">
                                                                                        <input className="form-control" type="text" placeholder="Your Name" style={{ height: "60px" }} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-sm-12">
                                                                                    <div className="form-group">
                                                                                        <div className="input-group">
                                                                                            <input className="form-control" type="text" placeholder="Account Number" style={{ height: "60px" }} />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) : selectedPaymentMethod === "bank" ? (
                                                                        <div className='mt-4'>
                                                                            <div className="row">
                                                                                <div className="col-sm-12">
                                                                                    <div className="form-group">
                                                                                        <input className="form-control" type="text" placeholder="Bank Routing Number" style={{ height: "60px" }} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-sm-12">
                                                                                    <div className="form-group">
                                                                                        <div className="input-group">
                                                                                            <input className="form-control" type="text" placeholder="Bank Account Number" style={{ height: "60px" }} />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-sm-12">
                                                                                    <div className="form-group">
                                                                                        <div className="input-group">
                                                                                            <input className="form-control" type="text" placeholder="Account Type" style={{ height: "60px" }} />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) : selectedPaymentMethod === "credit" ? (
                                                                        <div className='mt-4'>
                                                                            <div className="row">
                                                                                <div className="col-sm-12">
                                                                                    <div className="form-group">
                                                                                        <input className="form-control" type="text" placeholder="Credit Card Number" style={{ height: "60px" }} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-sm-12">
                                                                                    <div className="form-group">
                                                                                        <div className="input-group">
                                                                                            <input className="form-control" type="text" placeholder="Expiration Date" style={{ height: "60px" }} />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-sm-12">
                                                                                    <div className="form-group">
                                                                                        <div className="input-group">
                                                                                            <input className="form-control" type="text" placeholder="CVV Number" style={{ height: "60px" }} />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <button
                                                                className='btn w-100 py-3 mt-4 mb-4'
                                                                style={{ backgroundColor: "#00C1D5" }}
                                                                onClick={handlePaymentNextClick}
                                                                disabled={!selectedPaymentMethod}
                                                            >
                                                                <h5 className='mb-0 text-white'>Donate</h5>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-6'>
                            <header className="text-center donateMotivation">
                                <blockquote className="blockquote blockquote-custom bg-white p-5 shadow rounded">
                                    <p className="mb-0 mt-2 font-italic">In our community, countless families, children, and seniors are struggling with hunger every day. Your tax-deductible gift can make a real difference, providing not just food but also hope to those in need. By donating, you join a collective effort to support our neighbors during their most challenging times. Just $10 can supply 50 meals, transforming lives and bringing comfort to those who need it most. Together, we can fight hunger and bring hope to our community. Please consider making a donation today.</p>
                                    <footer className="blockquote-footer pt-4 mt-4 border-top">Food for Everyone</footer>
                                </blockquote>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
