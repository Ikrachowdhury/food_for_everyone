import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import "../../assets/css/bkash.css"
import bkashPayment from "../../images/bkashPayment.png"
import bkashCart from "../../images/bkashCart.png"
import taka from "../../images/taka.png"
import phone from "../../images/phone.png"
import image from "../../images/Help.png";
import success from "../../images/check.png";
import unsuccess from "../../images/error.png";
import bkash from "../../images/bkash.png";
import "../../assets/css/DonateMoney.css";
import { FaRegCircle } from 'react-icons/fa';
import { BsBank, BsCreditCard2FrontFill } from 'react-icons/bs';
import HomeNavbar from '../../components/HomeNavbar';
import { useSelector } from 'react-redux';
export default function DonateMoney() {
    const [value, setValue] = useState(null);
    const [active, setActive] = useState('one-time');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [paymentFormSubmitted, setPaymentFormSubmitted] = useState(false);
    const [step, setStep] = useState(0);
    const [amount, setAmount] = useState(0);
    const [customAmount, setCustomAmount] = useState('');
    const [number, setNumber] = useState('');
    const [bkashPassword, setBkashPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const isOpen = useSelector(state => state.isOpen);

    useEffect(() => {
        const userType = localStorage.getItem('user_type');
        setValue(userType);
    }, []);

    useEffect(() => {
        setMessage(null);
    }, [number, bkashPassword]);

    // const closeBkash = () => {
    //     setMessage(null)
    //     window.location.reload()
    // }

    const handleNextClick = () => {
        if (!formSubmitted) {
            console.log(`${active} ${amount === 0 ? customAmount : amount}`);
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
    const okButton = () => {
        setMessage(null)
        window.location.reload();
    }
    async function submitOTP(event) {
        event.preventDefault();
        // console.log(customAmount)
        // console.log(amount)
        // const donationAmount = amount === 0 ? customAmount : amount;
        // console.log(donationAmount)
        // Prepare form data based on the selected payment method
        const formData = {
            otp: '',
        };

        const otpNumber = document.querySelector('input[placeholder="Enter OTP"]').value;

        // Update formData with credit card information
        formData.otp = otpNumber;

        console.log(formData)
        try {
            let response = await fetch("http://localhost:8000/api/otp", {
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(formData)
            });
            let result = await response.json();
            if (response.status === 200) {
                setMessage(result.message)
                const modalElement = new window.bootstrap.Modal(document.getElementById('successRequest'));
                modalElement.show();
            }
            else {
                setMessage("OTP is incorrect")
                const modalElement = new window.bootstrap.Modal(document.getElementById('unsuccessRequest'));
                modalElement.show();
                // throw new Error(`HTTP error! Status: ${response.status}`);
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }


    async function submitTransaction(event) {
        event.preventDefault();
        console.log(customAmount)
        console.log(amount)
        const donationAmount = amount === 0 ? customAmount : amount;
        console.log(donationAmount)
        // Prepare form data based on the selected payment method
        const formData = {
            amount: donationAmount,
            payment_method: selectedPaymentMethod,
            card_number: '',
            card_date: '',
            card_cvv: ''
        };

        // Extract credit card information if selected payment method is 'credit'
        if (selectedPaymentMethod === "credit") {
            const cardNumber = document.querySelector('input[placeholder="Credit Card Number"]').value;
            const expirationDate = document.querySelector('input[placeholder="Expiration Date"]').value;
            const cvvNumber = document.querySelector('input[placeholder="CVV Number"]').value;

            // Update formData with credit card information
            formData.card_number = cardNumber;
            formData.card_date = expirationDate;
            formData.card_cvv = cvvNumber;
        }
        console.log(formData)
        try {
            let response = await fetch("http://localhost:8000/api/payment", {
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(formData)
            });
            let result = await response.json();
            if (response.status === 200) {
                // setMessage(result.message)
                const modalElement = new window.bootstrap.Modal(document.getElementById('sentRequest'));
                modalElement.show();
            }
            else {
                setMessage(result.message)
                const modalElement = new window.bootstrap.Modal(document.getElementById('unsuccessRequest'));
                modalElement.show();
                // throw new Error(`HTTP error! Status: ${response.status}`);
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleBkash = async () => {
        console.log(number)
        const url = 'http://localhost:8000/api/bkashNumberCheck';
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ number })
            });
            console.log(number)

            let result = await response.json();
            console.log("Result:", result);
            if (result.success === "Correct Number") {
                setMessage(null)
                const modalElement1 = document.getElementById('detailsModal');
                const modal = window.bootstrap.Modal.getInstance(modalElement1);
                if (modal) {
                    modal.hide();
                }
                const modalElement = new window.bootstrap.Modal(document.getElementById('bkashOTP'));
                modalElement.show();
            } else {
                setMessage("Incorrect number")
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while canceling the donation. ' + error.message);
        }
    };
    const handleBkashPassword = async () => {
        console.log(bkashPassword)
        const url = 'http://localhost:8000/api/bkashPasswordCheck';
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ bkashPassword })
            });
            console.log(bkashPassword)

            let result = await response.json();
            console.log("Result:", result);
            if (result.success === "Correct PIN") {
                setMessage("Money Donation Successful!")
                const modalElement1 = document.getElementById('bkashOTP');
                const modal = window.bootstrap.Modal.getInstance(modalElement1);
                if (modal) {
                    modal.hide();
                }
                const modalElement = new window.bootstrap.Modal(document.getElementById('successRequest'));
                modalElement.show();
            } else {
                setMessage("Incorrect PIN")
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while canceling the donation. ' + error.message);
        }
    };

    return (
        <div>
            {value ? <Navbar /> : <HomeNavbar />}
            <div className="homePage d-flex">
                {value ? <Sidebar /> : null}
                <div className="main-content mt-5" style={{ marginLeft: value && isOpen ? "250px" : "78px" }}>
                    <section >
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
                                                        onClick={() => { setAmount('500'); setCustomAmount(0); }}
                                                    >
                                                        <h6 className='mb-0'>500/-</h6>
                                                    </button>
                                                    <button
                                                        className='btn btn-outline-secondary me-3 donateAmountButton'
                                                        onClick={() => { setAmount('1000'); setCustomAmount(0); }}
                                                    >
                                                        <h6 className='mb-0'>1000/-</h6>
                                                    </button>
                                                    <button
                                                        className='btn btn-outline-secondary me-3 donateAmountButton'
                                                        onClick={() => { setAmount('1500'); setCustomAmount(0); }}
                                                    >
                                                        <h6 className='mb-0'>1500/-</h6>
                                                    </button>
                                                    <button
                                                        className='btn btn-outline-secondary donateAmountButton'
                                                        onClick={() => { setAmount('2000'); setCustomAmount(0); }}
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
                                                                    className={`btn me-3 paymentOption my-2 btn-outline-secondary p-2 ${selectedPaymentMethod === 'bkash' ? 'active-btn' : ''}`} data-bs-toggle="modal" data-bs-target="#detailsModal"
                                                                    onClick={() => setSelectedPaymentMethod('bkash')}
                                                                >
                                                                    <h6 className='mb-0'>
                                                                        <img src={bkash} alt="" style={{ height: "50px", width: "280px" }} />
                                                                    </h6>
                                                                </button>
                                                            </div>
                                                            <div className="modal fade " id="detailsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                                <div className="modal-dialog modal-dialog-centered modal">
                                                                    <div className="modal-content">
                                                                        <div className="modal-body">
                                                                            <div className="bkash-payment">
                                                                                <div>
                                                                                    <img src={bkashPayment} alt="" style={{ width: "300px" }} className="my-3 mx-3" />
                                                                                </div>
                                                                                <div style={{ height: "6px", backgroundColor: "#E21D60" }}>
                                                                                </div>
                                                                                <div className="d-flex p-3 align-items-center">
                                                                                    <div className="mx-2">
                                                                                        <img src={bkashCart} alt="" style={{ width: "40px" }} />
                                                                                    </div>
                                                                                    <div className="mx-2 me-5" style={{ fontSize: "15px" }}>
                                                                                        <p className="m-0">TestCheckoutDemoMerchant1</p>
                                                                                        <p className="m-0 text-left text-muted">Invoice: 3221</p>
                                                                                    </div>
                                                                                    <div className="mx-2 d-flex align-items-center justify-content-end ms-4">
                                                                                        <img src={taka} alt="" style={{ width: "auto", height: "15px" }} />
                                                                                        <p className="m-0 text-muted" style={{ fontSize: "25px" }}>{amount ? amount : customAmount}</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="" style={{ height: "200px", backgroundColor: "#E21D60" }}>
                                                                                    <div className="pt-5">
                                                                                        <p className="text-white" style={{ fontSize: "14px" }}><b>Your bkash Account Number</b> </p>
                                                                                    </div>
                                                                                    <div className="account-input">
                                                                                        <input type="number" className="form-control mx-5 text-center numberBox" onChange={(e) => {
                                                                                            setNumber(e.target.value);
                                                                                            setMessage(null);
                                                                                        }} required="required" value={number} placeholder="e.g. 01XXXXXXXXX" />
                                                                                    </div>
                                                                                    {message && <div className="warning text-white mt-2">{message}</div>}
                                                                                    <div className='mt-3'>
                                                                                        <p className="text-white" style={{ fontSize: "13px" }}>By clicking on <b>Confirm</b>, you are agreeing to the <b><u>terms & conditions</u></b></p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-6 pe-0">
                                                                                        <button className="btn close-btn" onClick={okButton}>CLOSE</button>
                                                                                    </div>
                                                                                    <div className="col-6 ps-0">
                                                                                        <button className="btn confirm-btn" onClick={handleBkash}>CONFIRM</button>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="support d-flex py-2 align-items-center justify-content-center">
                                                                                    <img src={phone} alt="" style={{ width: "23px", height: "auto" }} className="mx-2" />
                                                                                    <b>16247</b>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="modal fade " id="bkashOTP" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                                <div className="modal-dialog modal-dialog-centered modal">
                                                                    <div className="modal-content">
                                                                        <div className="modal-body">
                                                                            <div className="bkash-payment">
                                                                                <div>
                                                                                    <img src={bkashPayment} alt="" style={{ width: "300px" }} className="my-3 mx-3" />
                                                                                </div>
                                                                                <div style={{ height: "6px", backgroundColor: "#E21D60" }}>
                                                                                </div>
                                                                                <div className="d-flex p-3 align-items-center">
                                                                                    <div className="mx-2">
                                                                                        <img src={bkashCart} alt="" style={{ width: "40px" }} />
                                                                                    </div>
                                                                                    <div className="mx-2 me-5" style={{ fontSize: "15px" }}>
                                                                                        <p className="m-0">TestCheckoutDemoMerchant1</p>
                                                                                        <p className="m-0 text-left text-muted">Invoice: 3221</p>
                                                                                    </div>
                                                                                    <div className="mx-2 d-flex align-items-center justify-content-end ms-4">
                                                                                        <img src={taka} alt="" style={{ width: "auto", height: "15px" }} />
                                                                                        <p className="m-0 text-muted" style={{ fontSize: "25px" }}>{amount ? amount : customAmount}</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="" style={{ height: "200px", backgroundColor: "#E21D60" }}>
                                                                                    <div className="pt-5">
                                                                                        <p className="text-white" style={{ fontSize: "14px" }}><b>Enter Your bkash PIN</b> </p>
                                                                                    </div>
                                                                                    <div className="account-input">
                                                                                        <input type="password" className="form-control mx-5 text-center numberBox" onChange={(e) => {
                                                                                            setBkashPassword(e.target.value);
                                                                                            setMessage(null);
                                                                                        }} required="required" value={bkashPassword} placeholder="*****" />
                                                                                    </div>
                                                                                    {message && <div className="warning text-white mt-2">{message}</div>}
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-6 pe-0">
                                                                                        <button className="btn close-btn" onClick={okButton}>CLOSE</button>
                                                                                    </div>
                                                                                    <div className="col-6 ps-0">
                                                                                        <button className="btn confirm-btn" onClick={handleBkashPassword}>CONFIRM</button>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="support d-flex py-2 align-items-center justify-content-center">
                                                                                    <img src={phone} alt="" style={{ width: "23px", height: "auto" }} className="mx-2" />
                                                                                    <b>16247</b>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <div className="modal fade" id="bkashPassword" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h5 className="modal-title" id="exampleModalLongTitle">Money Donation Successful</h5>
                                                                            <button type="button" className="close text-danger" data-bs-dismiss="modal" aria-label="Close">
                                                                                <span aria-hidden="true">&times;</span>
                                                                            </button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            <p>Money Successfully Transfered</p>
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-primary" onClick={closeBkash}>OK</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div> */}
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
                                                                    {selectedPaymentMethod === "bank" ? (
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
                                                                <h5 className='mb-0 text-white' onClick={submitTransaction}>Donate</h5>
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
                        <div className="modal fade" id="sentRequest" tabIndex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false">
                            <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
                                <div className="modal-content">
                                    <div className="modal-body text-center p-lg-4">
                                        Enter the OTP
                                        <input className="form-control my-2" type="text" placeholder="Enter OTP" style={{ height: "60px" }} />
                                        {/* <img src={success} alt="" style={{ width: "50%" }} />
                                        <h4 className="text-success mt-3">Oh Yeah!</h4>
                                        <p className="mt-3">{message}</p> */}
                                        <button type="button" className='btn-primary my-2' data-bs-dismiss="modal" aria-label="Close" onClick={submitOTP} style={{ width: "100px" }}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id="successRequest" tabIndex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false">
                            <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
                                <div className="modal-content">
                                    <div className="modal-body text-center p-lg-4">
                                        <img src={success} alt="" style={{ width: "50%" }} />
                                        <h4 className="text-success mt-3">Oh Yeah!</h4>
                                        <p className="mt-3">{message}</p>
                                        <button type="button" className='btn-success' data-bs-dismiss="modal" aria-label="Close" onClick={okButton} style={{ width: "100px" }}>Ok</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id="unsuccessRequest" tabIndex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false">
                            <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
                                <div className="modal-content">
                                    <div className="modal-body text-center p-lg-4">
                                        <img src={unsuccess} alt="" style={{ width: "50%" }} />
                                        <h4 className="text-success mt-3">Oh No!</h4>
                                        <p className="mt-3">{message}</p>
                                        <button type="button" className='btn-danger' data-bs-dismiss="modal" aria-label="Close" onClick={okButton} style={{ width: "100px" }}>Ok</button>
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
