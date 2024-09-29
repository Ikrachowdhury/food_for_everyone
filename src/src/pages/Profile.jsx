import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../assets/css/profile.css';
import { FaCamera, FaCheck, FaEdit, FaStar, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJtYW4yOTYiLCJhIjoiY20wOWYwejBlMTJhajJrb21qOTR0YWYxYSJ9.2NVdAp3kdgwt2g9WBZeBJw';

export default function Profile() {
    const [profileData, setProfileData] = useState({});
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [numberToast, setNumberToast] = useState(false);
    const [numberMessage, setNumberMessage] = useState("");
    const [map, setMap] = useState(null);
    const [defaultLocation, setDefaultLocation] = useState(null);
    const [clickedLocation, setClickedLocation] = useState(null);
    const [location, setLocation] = useState("");
    const [locationLat, setLocationLat] = useState("");
    const [locationLon, setLocationLon] = useState("");
    const [placeInfo, setPlaceInfo] = useState('');
    const [ratingData, setRatingData] = useState(0);
    const filledStars = Math.floor(ratingData);
    const percentageFill = (ratingData - filledStars) * 100;
    const remainingStars = 5 - filledStars - (percentageFill > 0 ? 1 : 0);
    console.log(ratingData)
    const closeNumberToast = () => {
        setNumberToast(false)
        window.location.reload();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                const response = await fetch(`http://localhost:8000/api/profile/${user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setProfileData(result);
                setEmail(result.user.email)
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    async function changePassword(event) {
        event.preventDefault();
        console.log(email)
        console.log(oldPassword)
        console.log(newPassword)
        try {
            let item = { email, oldPassword, newPassword };
            let response = await fetch("http://localhost:8000/api/changePassword", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            });

            let result = await response.json();
            console.log("Response:", result);

            if (response.status === 200) {
                setNumberMessage("Password Changed Successfully");
                setNumberToast(true);
            } else {
                setNumberMessage("An error occured during change the password");
                setNumberToast(true);
                console.error("Failed to reset password", result);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
    async function changeNumber(event) {
        event.preventDefault();
        console.log(newNumber)
        try {
            const user_id = localStorage.getItem('user_id');
            let item = { user_id, newNumber };
            let response = await fetch("http://localhost:8000/api/changeNumber", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            });

            let result = await response.json();
            console.log("Response:", result);

            if (response.status === 200) {
                setNumberMessage("Number Changed Successfully");
                setNumberToast(true);
            } else if (response.status === 422) {
                setNumberToast(true);
                setNumberMessage("Number should be 11 digits and start with 01");
            }
            else if (response.status === 404) {
                setNumberToast(true);
                setNumberMessage("Failed to reset phone number");
            }

        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
    const changeAddress = async () => {
        console.log(location)
        console.log(locationLat)
        console.log(locationLon)
        try {
            const user_id = localStorage.getItem('user_id');
            let item = { user_id, location, locationLat, locationLon };
            let response = await fetch("http://localhost:8000/api/changeAddress", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            });

            let result = await response.json();
            console.log("Response:", result);

            if (response.status === 200) {
                setNumberMessage("Address Changed Successfully");
                setNumberToast(true);
                console.log("success")
            }
            else if (response.status === 404) {
                setNumberToast(true);
                setNumberMessage("Failed to reset address");
            }

        } catch (error) {
            console.error("An error occurred:", error);
        }
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
            setLocation(placeInfo)
        } else if (defaultLocation) {
            setLocation(placeInfo)
        }
        console.log('Calling changeAddress');
        changeAddress();
        changeAddress();
    };

    const [image, setImage] = useState(null);
    const [originalImage, setOriginalImage] = useState(null);
    const [file, setFile] = useState(null);
    const [showButtons, setShowButtons] = useState(false);

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const imageURL = URL.createObjectURL(selectedFile);
            setImage(imageURL);
            setFile(selectedFile);
            setShowButtons(true);
        }
    };

    const handleCancel = () => {
        setImage(originalImage);
        setFile(null); // Reset the file
        setShowButtons(false);
    };

    const handleImageSubmit = async (event) => {
        event.preventDefault();

        if (file) {
            console.log("File selected for upload:", file);
            setShowButtons(false);

            if (
                file.type === "image/png" ||
                file.type === "image/jpg" ||
                file.type === "image/jpeg"
            ) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("cloud_name", "de0xjzms6");
                formData.append("upload_preset", "egqlo2q6");

                try {
                    const response = await fetch(
                        "https://api.cloudinary.com/v1_1/de0xjzms6/image/upload",
                        {
                            method: "POST",
                            body: formData,
                        }
                    );

                    if (response.ok) {
                        const imgData = await response.json();
                        console.log("Uploaded Image URL:", imgData.url);
                        const user_id = localStorage.getItem("user_id");
                        const imageURL = imgData.url; // Assuming you only upload one image
                        let item = { user_id, imageURL };
                        console.log(item)

                        let uploadResponse = await fetch("http://localhost:8000/api/userImageUpload", {
                            method: 'POST',
                            body: JSON.stringify(item),
                            headers: {
                                "Accept": 'application/json',
                                "Content-Type": "application/json",
                            },
                        });

                        if (!uploadResponse.ok) {
                            const errorData = await uploadResponse.json();
                            console.error('Validation Errors:', errorData.errors);
                            throw new Error(`HTTP error! Status: ${uploadResponse.status}`);
                        }

                        let result = await uploadResponse.json();
                        console.log("Result:", result);
                    } else {
                        console.error("Error uploading to Cloudinary:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error during image upload:", error);
                }
            } else {
                console.error("Invalid file type. Only PNG, JPG, and JPEG are allowed.");
            }
        } else {
            console.error("No file selected.");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                const response = await fetch(`http://localhost:8000/api/donorProfileRating/${user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                if (response.status != 200) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setRatingData(result.rating)
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);


    return (
        <div>
            <Navbar />
            <div className="homePage d-flex">
                <Sidebar />
                <div className="main-content">
                    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100">
                        <div className="container mt-5">
                            <div className="main-body mt-5">
                                {Object.keys(profileData).length > 0 ? (
                                    <div>
                                        <div className="row gutters-sm mt-5">
                                            <div className="col-md-2">
                                            </div>
                                            <div className="col-md-8 mb-3">
                                                <div className="card bg-light">
                                                    <div className="card-body shadow">
                                                        <div className="row">
                                                            <div className="d-flex flex-column align-items-center text-center">
                                                                <form className="ImageForm11 mb-3" onSubmit={handleImageSubmit}>
                                                                    <div className="upload">
                                                                        <img
                                                                            src={image !== null && image !== undefined ? image : profileData.user?.profile_img}
                                                                            alt="Profile"
                                                                            id="image"
                                                                        />

                                                                        <div className="rightRound" id="upload">
                                                                            <input
                                                                                type="file"
                                                                                name="fileImg"
                                                                                id="fileImg"
                                                                                accept=".jpg, .jpeg, .png"
                                                                                onChange={handleImageChange}
                                                                            />
                                                                            <FaCamera className="icon" style={{ color: "white" }} />
                                                                        </div>

                                                                        {showButtons && (
                                                                            <>
                                                                                <div className="leftRound" id="cancel" onClick={handleCancel}>
                                                                                    <FaTimes className="icon" />
                                                                                </div>
                                                                                <div className="rightRound" id="confirm">
                                                                                    <input type="submit" />
                                                                                    <FaCheck className="icon" />
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </form>
                                                                <div className="mt-1">
                                                                    <h4> {profileData.user?.user_type === 'organization' ? profileData.user?.org_name : profileData.user?.name}</h4>
                                                                    <div className="mb-3">
                                                                        {[...Array(filledStars)].map((_, index) => (
                                                                            <FaStar key={index} className="mx-2 text-warning" style={{ fontSize: 25 }} />
                                                                        ))}
                                                                        {percentageFill > 0 && (
                                                                            <FaStar
                                                                                className="mx-2 text-warning"
                                                                                style={{ fontSize: 25, clipPath: `polygon(0 0, ${percentageFill}% 0, ${percentageFill}% 100%, 0 100%)` }}
                                                                            />
                                                                        )}
                                                                        {[...Array(remainingStars)].map((_, index) => (
                                                                            <FaStar key={index} className="mx-2 text-secondary" style={{ fontSize: 25 }} />
                                                                        ))}
                                                                    </div>
                                                                    {/* <h4>★★★★★</h4> */}
                                                                    <p className="text-secondary mb-1">{profileData.user?.user_type}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row gutters-sm">
                                            <div className="col-md-2">
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card mb-3">
                                                    <div className="card-body shadow mt-1">
                                                        <div className="row align-items-center">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Full Name</h6>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary">
                                                                {profileData.user?.name}
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row align-items-center">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Email</h6>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary">
                                                                {profileData.user?.email}
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row align-items-center">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Password</h6>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary d-flex justify-content-between align-items-center">
                                                                <div> ********</div>
                                                                <div>
                                                                    <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#passwordBackdrops">
                                                                        <FaEdit className='text-primary' />
                                                                    </button>
                                                                    <div className="modal fade" id="passwordBackdrops" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                                        <div className="modal-dialog modal-dialog-centered">
                                                                            <div className="modal-content">
                                                                                <div className="modal-header">
                                                                                    <h5 className="modal-title" id="staticBackdropLabel">Change Password</h5>
                                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                </div>
                                                                                <div className="modal-body">
                                                                                    <div className="mb-3">
                                                                                        <label htmlFor="password" className="form-label mt-2 ">Old Password<span className="text-danger">*</span></label>
                                                                                        <input type="password" className="form-control textBox" id="password" onChange={(e) => setOldPassword(e.target.value)} required="required" />
                                                                                    </div>
                                                                                    <div className="mb-3">
                                                                                        <label htmlFor="cpassword" className="form-label mt-2 ">New Password<span className="text-danger">*</span></label>
                                                                                        <input type="password" className="form-control textBox" id="cpassword" onChange={(e) => setNewPassword(e.target.value)} required="required" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="modal-footer">
                                                                                    <div className="d-flex justify-content-around mx-2">
                                                                                        <input type="submit" className="btn btn-sm" value="Submit" onClick={changePassword} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row align-items-center">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Mobile</h6>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary d-flex justify-content-between align-items-center">
                                                                <div> {profileData.user?.phone}</div>
                                                                <div>
                                                                    <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrops">
                                                                        <FaEdit className='text-primary' />
                                                                    </button>
                                                                    <div className="modal fade" id="staticBackdrops" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                                        <div className="modal-dialog modal-dialog-centered">
                                                                            <div className="modal-content">
                                                                                <div className="modal-header">
                                                                                    <h5 className="modal-title" id="staticBackdropLabel">New Phone Number</h5>
                                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                </div>
                                                                                <div className="modal-body">
                                                                                    <div className="mb-3">
                                                                                        <label htmlFor="newPhoneNumber" className="form-label mt-2 ">Enter new number<span className="text-danger">*</span></label>
                                                                                        <input type="number" className="form-control textBox" id="newPhoneNumber" onChange={(e) => setNewNumber(e.target.value)} required="required" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="modal-footer">
                                                                                    <div className="d-flex justify-content-around mx-2">
                                                                                        <input type="submit" className="btn btn-sm" value="Submit" onClick={changeNumber} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row align-items-center">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Address</h6>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary d-flex justify-content-between align-items-center">
                                                                <div>{profileData.user?.address}</div>
                                                                <div>
                                                                    <button type="button" className="btn" onClick={() => {
                                                                        const modalElement = new window.bootstrap.Modal(document.getElementById('staticBackdrop'));
                                                                        modalElement.show();
                                                                    }}>
                                                                        <FaEdit className='text-primary' />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <hr />
                                                        {profileData.user?.user_type === 'organization' && (
                                                            <>
                                                                <div className="row align-items-center">
                                                                    <div className="col-sm-3">
                                                                        <h6 className="mb-0">Office Time</h6>
                                                                    </div>
                                                                    <div className="col-sm-9 text-secondary d-flex justify-content-between align-items-center">
                                                                        <div>{profileData.user?.office_time}</div>
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                                <div className="row align-items-center">
                                                                    <div className="col-sm-3">
                                                                        <h6 className="mb-0">Organization About</h6>
                                                                    </div>
                                                                    <div className="col-sm-9 text-secondary d-flex justify-content-between align-items-center">
                                                                        <div>{profileData.user?.org_about}</div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="centered-content">
                                        <div className="text">Loading...</div>
                                    </div>
                                )}
                            </div>
                            {numberToast && (
                                <div className="toast show bg-light" role="alert" aria-live="assertive" aria-atomic="true" style={{
                                    position: 'fixed', top: '20px', right: '20px', zIndex: 9999, left: '50%', minWidth: '500px',
                                    transform: 'translateX(-50%)',
                                }}>
                                    <div className="toast-header">
                                        <strong className="me-auto text-success">{numberMessage}</strong>
                                        <button type="button" className="btn-close" onClick={closeNumberToast} aria-label="Close"></button>
                                    </div>
                                </div>
                            )}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}