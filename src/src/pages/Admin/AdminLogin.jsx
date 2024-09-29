import { useNavigate } from 'react-router-dom';
import '../../assets/css/Login.css';
import { useState, useEffect } from 'react';
import HomeNavbar from '../../components/HomeNavbar';

export const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [forgetEmail, setForgetEmail] = useState("");
    const [showPasswordModal, setShowPasswordModal] = useState(true);
    const navigate = useNavigate();

    const okButton = () => {
        navigate("/")
        window.location.reload()
    }

    async function login(e) {
        e.preventDefault();
        let item = { email, password };
        let result = await fetch("http://localhost:8000/api/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        console.log(result)

        if (result.success === false) {
            setMessage(result.msg);
            setShowToast(true);
        } else if (result.success === true) {
            localStorage.setItem("user_token", result.token_type + " " + result.access_token);
            localStorage.setItem("user_id", result.user_id);
            localStorage.setItem("user-info", JSON.stringify(result));
            localStorage.setItem("user_type", result.user_type);
            if (result.user_type === 'Admin') {
                navigate("/doneeList");
            } else {
                setMessage("User name or Password is incorrect");
                setShowToast(true);
            }
        }
    }

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showToast]);

    async function handleForgetPassword() {
        if (!forgetEmail) {
            alert("Please enter your email");
            return;
        }
        console.log("ok");
        console.log(forgetEmail);

        try {
            let response = await fetch(`http://localhost:8000/api/send-forgotPass-mail/${forgetEmail}`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            });

            if (response.ok) {
                let data = await response.json();
                const modalElement = new window.bootstrap.Modal(document.getElementById('forgetPasswordBackdrops'));
                modalElement.show();
                setShowPasswordModal(false);
                console.warn("email result", data);
                console.log("Request successful");
            } else {
                console.error("Network response was not ok", response.statusText);
                const text = await response.text();
                console.error("Response text:", text);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    return (
        <>
            <HomeNavbar />
            <div className="loginBody mt-5">
                <form className="loginForm" onSubmit={login}>
                    <div className="box">
                        {showToast && (
                            <div className="alert alert-danger position-fixed top-0 start-50 translate-middle-x p-3 mt-3 d-flex" style={{ zIndex: 1050, width: "520px" }} role="alert" >
                                <div>
                                    {message}
                                </div>
                            </div>
                        )}
                        <div className="form">
                            <h2 className="text-center">Sign in</h2>
                            <div className="inputBox">
                                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required="required" />
                                <span>Email</span>
                                <i></i>
                            </div>
                            <div className="inputBox">
                                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required="required" />
                                <span>Password</span>
                                <i></i>
                            </div>
                            <div className="links mt-1">
                                <a href="#" type="button" data-bs-toggle="modal" data-bs-target="#passwordBackdrops">Forget Password?</a>
                            </div><br />
                            <div className="d-flex justify-content-around">
                                <input type="submit" className="btn btn-sm" value="Login" />
                            </div>

                            {/* <div>
                                {value === 'donor' ? (
                                    <p className="registerParagraph mt-4 mb-4">
                                        Not a member? <a href={`/individualRegistration?value=${value}`} className="signupLink" style={{ textDecoration: "none" }}>Register</a>
                                    </p>
                                ) : value === 'donee' ? (
                                    <p className="registerParagraph mt-4 mb-4">
                                        Not a member? <a href={`/getFoodOption?value=${value}`} className="signupLink" style={{ textDecoration: "none" }}>Register</a>
                                    </p>
                                ) : value === 'rider' ? (
                                    <p className="registerParagraph mt-4 mb-4">
                                        Not a member? <a href={`/individualRegistration?value=${value}`} className="signupLink" style={{ textDecoration: "none" }}>Register</a>
                                    </p>
                                ) : (
                                    ""
                                )}
                            </div> */}
                        </div>
                        {showPasswordModal && (
                            <div className="modal fade " id="passwordBackdrops" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="staticBackdropLabel">Forgot Password</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="mb-3 mt-2">
                                                <label htmlFor="forgetEmail" className="form-label mt-2 ">Enter Email<span className="text-danger">*</span></label>
                                                <input type="email" className="form-control textBox" id="forgetEmail" value={forgetEmail} onChange={(e) => setForgetEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-primary" onClick={() => handleForgetPassword()}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="modal fade " id="forgetPasswordBackdrops" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <strong className="me-auto text-success">Forget Password</strong>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3 mt-2 text-center">
                                            A mail is sent to {forgetEmail} <br /> Please check your email to reset the password
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className='btn-primary' data-bs-dismiss="modal" aria-label="Close" onClick={okButton} >Ok</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
