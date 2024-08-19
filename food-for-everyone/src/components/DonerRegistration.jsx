import { useState } from 'react';
import '../assets/css/OrganizationalRegistration.css';
// import image from '../images/images1.jpg';

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
            {/* <div className="landing-hero">
                <img src={image} alt="" className="home-hero-image-copy" />
                <div className="_1080p-wrapper">
                    <div className="homepage-main-container">
                        <h1 className="home-hero-header">Food for Everyone is reducing food loss and waste through surplus food redistribution</h1>
                    </div>
                </div>
            </div> */}
            <div className="container my-5">
                <div className="mx-5 px-5 organizationForm">
                    <h2 className="text-center my-5 heading">Doner Registration Form</h2>
                    <form onSubmit={signUp}>
                        <div className="mb-3">
                            <label htmlFor="contactName" className="form-label mt-2 OrganizationLabel">Full Name <span className="text-danger">*</span></label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control registrationInput" id="contactName" required="required" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contactEmail" className="form-label mt-2 OrganizationLabel">Email address <span className="text-danger">*</span></label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control registrationInput" id="contactEmail" required="required" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contactNumber" className="form-label mt-2 OrganizationLabel">Mobile Number <span className="text-danger">*</span></label>
                            <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control registrationInput" id="contactNumber" required="required" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label OrganizationLabel">Password <span className="text-danger">*</span></label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control registrationInput" id="password" required="required" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label OrganizationLabel">Confirm Password <span className="text-danger">*</span></label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control registrationInput" id="confirmPassword" required="required" />
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
        </>
    );
};
