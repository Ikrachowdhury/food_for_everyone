import { useEffect, useState } from 'react';
import '../assets/css/OrganizationalRegistration.css'
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useNavigate } from 'react-router-dom';
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJtYW4yOTYiLCJhIjoiY20wOWYwejBlMTJhajJrb21qOTR0YWYxYSJ9.2NVdAp3kdgwt2g9WBZeBJw';
import HomeNavbar from './HomeNavbar';

export const OraganizationRegistration = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [time, setTime] = useState("");
    const [about, setAbout] = useState("");
    const [email, setEmailAddress] = useState("");
    const [userName, setUserName] = useState("");
    const [phone, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [map, setMap] = useState(null);
    const [defaultLocation, setDefaultLocation] = useState(null);
    const [clickedLocation, setClickedLocation] = useState(null);
    const [locationLat, setLocationLat] = useState("");
    const [locationLon, setLocationLon] = useState("");
    const [placeInfo, setPlaceInfo] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(name, location, time, about, userName, email, phone, password, confirmPassword)
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get('value');
    const navigate = useNavigate();

    const closeToast = () => {
        setIsModalOpen(false)
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
        let item = { name, location, time, about, userName, email, phone, password, confirmPassword, locationLat, locationLon, value };
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
            if(result.ok){
                setIsModalOpen(true);
            }

        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
    return (
        <>
        <HomeNavbar />
            <div className="container my-5">
                <div className="registration-content" style={{marginTop:"100px"}}>
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
                                            <input type="text" className="form-control textBox" id="address" value={location} onChange={(e) => setLocation(e.target.value)} required="required" onFocus={() => {
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
                                    {isModalOpen && (
                                        <div className="toast show bg-light" role="alert" aria-live="assertive" aria-atomic="true" style={{
                                            position: 'fixed', top: '20px', right: '20px', zIndex: 9999, left: '50%', minWidth: '500px',
                                            transform: 'translateX(-50%)',
                                        }}>
                                            <div className="toast-header">
                                                <strong className="me-auto text-success">Account Verification</strong>
                                                <button type="button" className="btn-close" onClick={() => { closeToast() }} aria-label="Close"></button>
                                            </div>
                                            <div className="toast-body">
                                                Your request has been sent to the admin. Please wait for admin approval
                                            </div>
                                        </div>
                                    )}
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