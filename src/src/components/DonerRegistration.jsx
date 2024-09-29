import { useState } from 'react';
import '../assets/css/OrganizationalRegistration.css';

export const DonerRegistration = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");

    const urlParams = new URLSearchParams(window.location.search);
    const data_value = urlParams.get('value');
    console.warn(data_value)
    let value;
    if (data_value === "/individualRegistration" || data_value === "/organizationRegistration") {
        value = "Donee";
    } else if (data_value === "/donerRegistration") {
        value = "Donor";
    }

    async function signUp(event) {
        event.preventDefault();
        console.warn(name, password, confirmPassword, email, phone, value);
        let item = { name, password, email, phone, confirmPassword, value };
        console.warn(item);

        try {
            // Register the user
            let result = await fetch("http://localhost:8000/api/add-user", {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            });
            let resultData = await result.json();
            console.warn("result", resultData);

            if (result.ok) {
                // Send verification email
                let emailResult = await fetch(`http://localhost:8000/api/send-verify-mail/${email}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": 'application/json',
                        "Accept": 'application/json'
                    }
                });
                let emailResultData = await emailResult.json();
                console.warn("email result", emailResultData);

                if (emailResult.ok) {
                    console.log("Verification email sent successfully");
                } else {
                    console.error("Error sending verification email", emailResultData);
                }
            } else {
                console.error("Error registering user", resultData);
            }
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
                                <h2 className='text-center my-4 fw-bold'>Person Registration Form</h2>
                                <div className='mt-5'>
                                    <form onSubmit={signUp}>
                                        <h5 className='mb-0  text-muted'>Account Information</h5>
                                        <div className="my-3">
                                            <label htmlFor="foodName" className="form-label mt-2 ">Full Name <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control textBox" id="foodName" value={name} onChange={(e) => setName(e.target.value)} required="required" />
                                        </div>
                                        <div className="my-3">
                                            <label htmlFor="contactEmail" className="form-label mt-2 ">Email Address<span className="text-danger">*</span></label>
                                            <input type="email" className="form-control textBox" id="contactEmail" value={email} onChange={(e) => setEmail(e.target.value)} required="required" />
                                        </div>
                                        <div className="my-3">
                                            <label htmlFor="contactNumber" className="form-label mt-2 ">Mobile<span className="text-danger">*</span></label>
                                            <input type="number" className="form-control textBox" id="contactNumber" value={phone} onChange={(e) => setPhone(e.target.value)} required="required" />
                                        </div>
                                        <div className="my-3">
                                            <label htmlFor="password" className="form-label mt-2 ">Password<span className="text-danger">*</span></label>
                                            <input type="password" className="form-control textBox" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required="required" />
                                        </div>
                                        <div className="my-3">
                                            <label htmlFor="confirmPassword" className="form-label mt-2 ">Confirm Password<span className="text-danger">*</span></label>
                                            <input type="password" className="form-control textBox" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required="required" />
                                        </div>
                                        <div className="d-flex justify-content-around mt-5 my-4">
                                            <input type="submit" className="btn btn-sm" value="Submit" />
                                        </div>
                                    </form>
                                    <div>
                                        <p className="registerParagraph mt-4 mb-4 text-dark">Already have an account? <a href={`/login?value=${value}`} className="signupLink">Login</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
