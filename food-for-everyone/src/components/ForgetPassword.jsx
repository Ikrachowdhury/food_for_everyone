import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (showToast) {
    //         const timer = setTimeout(() => {
    //             setShowToast(false);
    //         }, 3000);

    //         return () => clearTimeout(timer);
    //     }
    // }, [showToast]);

    const closeToast = () => {
        setShowToast(false)
        navigate("/home")
    }

    async function resetPassword(event) {
        event.preventDefault(); // Prevent the default form submission
        try {
            let item = { email, password, password_confirmation: confirmPassword };
            let response = await fetch("http://localhost:8000/api/resetPassword", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            });

            let result = await response.json();
            console.log("Response:", result); // Debugging log

            if (response.status === 200) {
                setShowToast(true);
                console.log("Password Changed Successfully");
                // navigate("/home");
            } else {
                console.error("Failed to reset password", result);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }



    return (
        <div>
            <div className="container my-5">
                <div className="registration-content mt-5">
                    <div className="row mt-5">
                        <div className="mt-5">
                            <div className='px-4 py-2 columnBackground mt-5'>
                                <form onSubmit={resetPassword}>
                                    <h2 className='text-center my-4 fw-bold'>Create New Password</h2>
                                    <div className='mt-5'>
                                        <div className="my-3">
                                            <label htmlFor="password" className="form-label mt-2 ">Password<span className="text-danger">*</span></label>
                                            <input type="password" className="form-control textBox" id="password" onChange={(e) => setPassword(e.target.value)} required="required" />
                                        </div>
                                        <div className="my-3">
                                            <label htmlFor="cpassword" className="form-label mt-2 ">Confirm Password<span className="text-danger">*</span></label>
                                            <input type="password" className="form-control textBox" id="cpassword" onChange={(e) => setConfirmPassword(e.target.value)} required="required" />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <div className="d-flex justify-content-around mt-5 my-4 mx-2">
                                            <input type="submit" className="btn btn-sm" value="Submit" />
                                        </div>
                                        <div className="d-flex justify-content-around mt-5 my-4 mx-2">
                                            <button className="btn btn-danger" style={{ width: "140px" }} onClick={() => { navigate("/home") }}>Cancel</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {showToast && (
                        <div className="toast show bg-light" role="alert" aria-live="assertive" aria-atomic="true" style={{
                            position: 'fixed', top: '20px', right: '20px', zIndex: 9999, left: '50%', minWidth: '500px',
                            transform: 'translateX(-50%)',
                        }}>
                            <div className="toast-header">
                                <strong className="me-auto text-success">Password Successfully Reset</strong>
                                <button type="button" className="btn-close" onClick={closeToast} aria-label="Close"></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}