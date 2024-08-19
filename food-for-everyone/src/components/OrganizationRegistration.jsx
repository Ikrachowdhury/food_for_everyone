import { useState } from 'react';
import '../assets/css/OrganizationalRegistration.css'
export const OraganizationRegistration = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [time, setTime] = useState("");
    const [about, setAbout] = useState("");
    const [email, setEmailAddress] = useState("");
    const [userName, setUserName] = useState("");
    const [phone, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    console.log(name, address, time, about,  userName, email, phone, password, confirmPassword)
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get('value');

    async function signUp(event) {
        event.preventDefault();
        // console.warn(name, address, time, about,  userName, emailAddress, mobile, password, confirmPassword);
        let item = { name, address, time, about,  userName, email, phone, password, confirmPassword };
        console.warn(item);

        try {
            let result = await fetch("http://localhost:8000/api/add-organization", {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            });
            let resultData = await result.json();
            console.warn("result", resultData);

            // if (result.ok) {
            //     let emailResult = await fetch(`http://localhost:8000/api/send-verify-mail/${emailAddress}`, {
            //         method: 'GET',
            //         headers: {
            //             "Content-Type": 'application/json',
            //             "Accept": 'application/json'
            //         }
            //     });
            //     let emailResultData = await emailResult.json();
            //     console.warn("email result", emailResultData);

            //     if (emailResult.ok) {
            //         console.log("Verification email sent successfully");
            //     } else {
            //         console.error("Error sending verification email", emailResultData);
            //     }
            // } else {
            //     console.error("Error registering user", resultData);
            // }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
    return (
        <>
            <div className="container my-5">
                <div className="registration-content mt-5">
                    <div className="row mt-3">
                        <div>
                            <div className='px-4 py-2 columnBackground'>
                                <form onSubmit={signUp}>
                                    <h2 className='text-center my-4 fw-bold'>Organization Registration Form</h2>
                                    <div>
                                        <h5 className='mb-0  text-muted'>Organization Information</h5>
                                        <div className="my-3">
                                            <label htmlFor="Name" className="form-label mt-2 ">Organization Name <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control textBox" id="Name" onChange={(e) => setName(e.target.value)} required="required" />
                                        </div>
                                        <div className="my-3">
                                            <label htmlFor="address" className="form-label mt-2 ">Address<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control textBox" id="address" onChange={(e) => setAddress(e.target.value)} required="required" />
                                        </div>
                                        <div className="my-3">
                                            <label htmlFor="officeTime" className="form-label mt-2 ">What are your operating hours?<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control textBox" id="officeTime" onChange={(e) => setTime(e.target.value)} required="required" />
                                        </div>
                                        <div className="my-3">
                                            <label htmlFor="about" className="form-label mt-2 ">Please provide a short description of your service<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control textBox" id="about" onChange={(e) => setAbout(e.target.value)} required="required" />
                                        </div>
                                    </div>
                                    <div className='mt-5'>
                                        <h5 className='mb-0  text-muted'>Account Information</h5>
                                        <div className="my-3">
                                            <label htmlFor="userName" className="form-label mt-2 ">Full Name <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control textBox" id="userName" onChange={(e) => setUserName(e.target.value)} required="required" />
                                        </div>
                                        <div className="my-3">
                                            <label htmlFor="officeEmail" className="form-label mt-2 ">Email Address<span className="text-danger">*</span></label>
                                            <input type="email" className="form-control textBox" id="officeEmail" onChange={(e) => setEmailAddress(e.target.value)} required="required" />
                                        </div>
                                        <div className="my-3">
                                            <label htmlFor="mobile" className="form-label mt-2 ">Mobile<span className="text-danger">*</span></label>
                                            <input type="number" className="form-control textBox" id="mobile" onChange={(e) => setMobile(e.target.value)} required="required" />
                                        </div>
                                        <div className="my-3">
                                            <label htmlFor="password" className="form-label mt-2 ">Password<span className="text-danger">*</span></label>
                                            <input type="password" className="form-control textBox" id="password" onChange={(e) => setPassword(e.target.value)} required="required" />
                                        </div>
                                        <div className="my-3">
                                            <label htmlFor="cpassword" className="form-label mt-2 ">Confirm Password<span className="text-danger">*</span></label>
                                            <input type="password" className="form-control textBox" id="cpassword" onChange={(e) => setConfirmPassword(e.target.value)} required="required" />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-around mt-5 my-4">
                                        <input type="submit" className="btn btn-sm" value="Submit" />
                                    </div>
                                    <div>
                                        <p className="registerParagraph mt-4 mb-3 text-dark">Already have an account? <a href={`/login?value=${value}`} className="signupLink">Login</a></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};