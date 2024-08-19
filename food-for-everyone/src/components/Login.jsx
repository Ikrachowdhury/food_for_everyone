import { useNavigate } from 'react-router-dom';
import '../assets/css/Login.css';
import { useState, useEffect } from 'react';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get('value');

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

        if (result.success === false) {
            setMessage(result.msg);
            setShowToast(true);
        } else if (result.success === true) {
            localStorage.setItem("user_token", result.token_type + " " + result.access_token);
            localStorage.setItem("user_id", result.user_id);
            localStorage.setItem("user-info", JSON.stringify(result));
            localStorage.setItem("user_type", result.user_type);

            if (result.user_type === value) {
                if (result.user_type === 'donor') {
                    navigate("/dashboard");
                } else if (result.user_type === 'donee') {
                    navigate("/receiverDashboard");
                } else if (result.user_type === 'rider') {
                    navigate("/riderDashboard");
                } else if (result.user_type === 'Admin') {
                    navigate("/donationPostList");
                } else {
                    setMessage("User name or Password is incorrect");
                    setShowToast(true);
                }
            } else {
                setMessage(`Only ${value} can login`);
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

    return (
        <>
            <div className="loginBody mt-5">
                <form className="loginForm" onSubmit={login}>
                    <div className="box">
                        {showToast && (
                            <div className="alert alert-danger position-fixed top-0 start-50 translate-middle-x p-3 mt-3 d-flex" style={{ zIndex: 1050, width: "520px" }} role="alert" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
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
                                <a href="#">Forget Password?</a>
                            </div><br />
                            <div className="d-flex justify-content-around">
                                <input type="submit" className="btn btn-sm" value="Login" />
                            </div>
                            <div>
                                {value === 'donor' ? (
                                    <p className="registerParagraph mt-4 mb-4">
                                        Not a member? <a href={`/individualRegistration?value=${value}`} className="signupLink">Register</a>
                                    </p>
                                ) : value === 'donee' ? (
                                    <p className="registerParagraph mt-4 mb-4">
                                        Not a member? <a href={`/getFoodOption?value=${value}`} className="signupLink">Register</a>
                                    </p>
                                ) : (
                                    ""
                                )}
                            </div>


                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
