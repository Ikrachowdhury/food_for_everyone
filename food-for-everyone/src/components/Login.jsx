import { useNavigate } from 'react-router-dom';
import '../assets/css/Login.css'
import { useState } from 'react'
export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get('value');
    console.warn(value)
    console.warn(message)

    async function login(e) {
        e.preventDefault()
        console.warn(email, password)
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
        } else if (result.success === true) {
            console.log(result);
            localStorage.setItem("user_token", result.token_type + " " + result.access_token);
            localStorage.setItem("user_id", result.user_id);
            localStorage.setItem("user-info", JSON.stringify(result));
            localStorage.setItem("user_type", result.user_type);
            console.log("User Type:", result.user_type);
            if (result.user_type === 'Donor') {
                navigate("/dashboard");
            }
            else if (result.user_type === 'Donee') {
                navigate("/receiverDashboard");
            }
            else if (result.user_type === 'Rider'){
                navigate("/riderDashboard");
            }
            else if (result.user_type === 'Admin'){
                navigate("/donationPostList");
            }
            
        } else {
            setMessage("An unexpected error occurred.");
        }
    }
    return (
        <>
            <div className="loginBody mt-5">
                <form className="loginForm" onSubmit={login}>
                    <div className="box">
                        <div className="form">
                            <h2 className="text-center">Sign in</h2>
                            <div className="inputBox">
                                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required="required" />
                                <span>email</span>
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
                                <p className="registerParagraph mt-4 mb-4">Not a member? <a href={`${value}?value=${value}`} className="signupLink">Register</a></p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};