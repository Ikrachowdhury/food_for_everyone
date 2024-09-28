import { useEffect, useState } from 'react';
import '../assets/css/OrganizationalRegistration.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useNavigate } from 'react-router-dom';
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJtYW4yOTYiLCJhIjoiY20wOWYwejBlMTJhajJrb21qOTR0YWYxYSJ9.2NVdAp3kdgwt2g9WBZeBJw';
import HomeNavbar from './HomeNavbar';

export const IndividualRegistration = () => {
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState('');
    const [map, setMap] = useState(null);
    const [defaultLocation, setDefaultLocation] = useState(null);
    const [clickedLocation, setClickedLocation] = useState(null);
    const [locationLat, setLocationLat] = useState("");
    const [locationLon, setLocationLon] = useState("");
    const [placeInfo, setPlaceInfo] = useState('');
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get('value');
    const navigate = useNavigate();

    const closeModal = () => {
        // setIsModalOpen(false)
        navigate("/home");
    }

    useEffect(() => {
        const modalElement = document.getElementById('staticBackdrop');
        const handleModalShow = () => {
            if (!map) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    setLocationLat(position.coords.latitude)
                    setLocationLon(position.coords.longitude)
                    const defaultLoc = [position.coords.longitude, position.coords.latitude];
                    setDefaultLocation(defaultLoc);

                    const mapInstance = new mapboxgl.Map({
                        container: 'map',
                        style: 'mapbox://styles/mapbox/streets-v11',
                        center: defaultLoc,
                        zoom: 15,
                    });

                    let marker = new mapboxgl.Marker()
                        .setLngLat(defaultLoc)
                        .addTo(mapInstance);

                    const geocoder = new MapboxGeocoder({
                        accessToken: mapboxgl.accessToken,
                        mapboxgl: mapboxgl,
                        marker: false,
                        placeholder: 'Search for origin place',
                    });

                    mapInstance.addControl(geocoder);

                    try {
                        const defaultPlaceInfo = await fetchPlaceInfo(defaultLoc);
                        setPlaceInfo(defaultPlaceInfo);
                    } catch (error) {
                        console.error('Error fetching default place info:', error);
                    }

                    geocoder.on('result', (e) => {
                        const originPlace = e.result.center;
                        marker.setLngLat(originPlace);
                        mapInstance.flyTo({ center: originPlace, zoom: 15 });
                        setClickedLocation(originPlace);
                        setPlaceInfo(formatPlaceInfo(e.result.place_name));
                    });

                    mapInstance.on('click', async (e) => {
                        setLocationLat(e.lngLat.lat)
                        setLocationLon(e.lngLat.lng)
                        const clickedLoc = [e.lngLat.lng, e.lngLat.lat];
                        marker.setLngLat(clickedLoc);
                        mapInstance.flyTo({ center: e.lngLat, zoom: 15 });
                        setClickedLocation(clickedLoc);

                        try {
                            const placeInfo = await fetchPlaceInfo(clickedLoc);
                            setPlaceInfo(placeInfo);
                        } catch (error) {
                            console.error('Error fetching place info:', error);
                        }
                    });

                    setMap(mapInstance);
                }, (error) => {
                    console.error('Error getting location:', error);
                });
            }
        };

        modalElement.addEventListener('shown.bs.modal', handleModalShow);

        return () => {
            modalElement.removeEventListener('shown.bs.modal', handleModalShow);
        };
    }, [map]);

    const fetchPlaceInfo = async (location) => {
        try {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location[0]},${location[1]}.json?access_token=${mapboxgl.accessToken}`);
            const data = await response.json();
            const place = data.features[0];
            return formatPlaceInfo(place.place_name);
        } catch (error) {
            console.error('Error fetching place info:', error);
            return '';
        }
    };

    const formatPlaceInfo = (placeName) => {
        const parts = placeName.split(', ');
        if (parts.length > 1) {
            return `${parts[0]}, ${parts[1]}`;
        }
        return placeName;
    };

    const handleSubmit = () => {
        if (clickedLocation) {
            console.log(placeInfo)
            setLocation(placeInfo)
        } else if (defaultLocation) {
            console.log(placeInfo)
            setLocation(placeInfo)
        }
    };

    async function signUp(event) {
        event.preventDefault();
        console.warn(name, password, confirmPassword, email, phone, value);
        let item = { name, password, email, phone, confirmPassword, value, placeInfo, locationLat, locationLon };
        console.warn(item);

        try {
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


            if (value != 'rider') {
                if (result.ok) {
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
                        // setIsModalOpen(true);
                        const modalElement = new window.bootstrap.Modal(document.getElementById('mailSentSuccessfull'));
                        modalElement.show();
                        console.log("Verification email sent successfully");
                    } else {
                        console.error("Error sending verification email", emailResultData);
                    }
                } else {
                    const errorMessage = Array.isArray(resultData.errors)
                        ? resultData.errors.join(", ")
                        : resultData.message || "Error registering user";

                    setMessage(errorMessage);
                    setShowToast(true);
                    console.error("Error registering user", resultData);
                }
            } 
        } catch (error) {
            console.error("Fetch error:", error);
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
            <HomeNavbar />
            <div className="container my-5 mt-5">
                {showToast && (
                    <div className="alert alert-danger position-fixed top-0 start-50 translate-middle-x p-3 mt-3 d-flex" style={{ zIndex: 1050, width: "520px" }} role="alert" >
                        <div>
                            {message}
                        </div>
                    </div>
                )}
                <div className="registration-content" style={{ marginTop: "100px" }}>
                    <div className="row mt-5">
                        <div>
                            <div className='px-4 py-2 columnBackground'>
                                <h2 className='text-center my-4 fw-bold'>Registration Form</h2>
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
                                            <label htmlFor="contactNumber" className="form-label mt-2 ">Address<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control textBox" id="contactNumber" value={location} onChange={(e) => setLocation(e.target.value)} required="required" onFocus={() => {
                                                const modalElement = new window.bootstrap.Modal(document.getElementById('staticBackdrop'));
                                                modalElement.show();
                                            }} />
                                        </div>
                                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLongTitle">Location</h5>
                                                        <button type="button" className="close text-danger" data-bs-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div>
                                                            <div id="map" style={{ height: '70vh', width: '55vw', margin: 'auto' }}></div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary"
                                                            data-bs-dismiss="modal" onClick={handleSubmit}>
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
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
                                        {/* {isModalOpen && (
                                            <div className="toast show bg-light" role="alert" aria-live="assertive" aria-atomic="true" style={{
                                                position: 'fixed', top: '20px', right: '20px', zIndex: 9999, left: '50%', minWidth: '500px',
                                                transform: 'translateX(-50%)',
                                            }}>
                                                <div className="toast-header">
                                                    <strong className="me-auto text-success">{value === 'rider' ? 'Account Verification' : 'Email Verification'}</strong>
                                                    <button type="button" className="btn-close" onClick={() => { closeToast() }} aria-label="Close"></button>
                                                </div>
                                                <div className="toast-body">
                                                    {value === 'rider' ? 'Your request has been sent to the admin. Please wait for admin approval' : 'A verification mail is sent to your email. Please check your email to verify your account.'}
                                                </div>
                                            </div>
                                        )} */}
                                        <div className="modal fade" id="mailSentSuccessfull" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <strong className="me-auto text-success">{value === 'rider' ? 'Account Verification' : 'Email Verification'}</strong>
                                                        <button type="button" className="close text-danger" data-bs-dismiss="modal" aria-label="Close" onClick={() => { closeModal() }}>
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div>
                                                            {value === 'rider' ? 'Your request has been sent to the admin. Please wait for admin approval' : 'A verification mail is sent to your email. Please check your email to verify your account.'}
                                                        </div>
                                                    </div>
                                                    {/* <div className="modal-footer">
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary"
                                                            data-bs-dismiss="modal" onClick={handleSubmit}>
                                                            Submit
                                                        </button>
                                                    </div> */}
                                                </div>
                                            </div>
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
