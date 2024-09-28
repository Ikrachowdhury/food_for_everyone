import Sidebar from '../../components/Sidebar'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../assets/css/AddNewDonation.css'
import { useEffect, useRef, useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import Navbar from '../../components/Navbar';
import { FaBoxesPacking } from 'react-icons/fa6';
import { format } from 'date-fns';
import { useLocation, useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJtYW4yOTYiLCJhIjoiY20wOWYwejBlMTJhajJrb21qOTR0YWYxYSJ9.2NVdAp3kdgwt2g9WBZeBJw';

export default function AddNewDonation() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [receiveTime, setReceiveTime] = useState(null);
    const datePickerRef = useRef(null);
    const [name, setName] = useState("");
    const [donationID, setDonationID] = useState(0);
    const [expireTime, setExpireTime] = useState(null);
    const [description, setDescription] = useState("");
    const [serves, setServes] = useState("");
    const [categories, setCategories] = useState('Cooked Food');
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)
    const [image4, setImage4] = useState(null)
    const [doneeType, setDoneeType] = useState('Organization');
    const userId = localStorage.getItem('user_id');
    const formattedExpireDate = expireTime ? format(expireTime, 'dd/MM/yyyy') : '';
    const formattedReceiveDate = selectedDate ? format(selectedDate, 'dd/MM/yyyy') : '';
    const locations = useLocation();
    const { donations } = locations.state || {};
    // const [urlArray, setUrlArray] = useState([]);
    const [map, setMap] = useState(null);
    const [defaultLocation, setDefaultLocation] = useState(null);
    const [clickedLocation, setClickedLocation] = useState(null);
    const [locationLat, setLocationLat] = useState("");
    const [locationLon, setLocationLon] = useState("");
    const [location, setLocation] = useState('');
    const [placeInfo, setPlaceInfo] = useState('');
    // const [editFilteredUrls, setEditFilteredUrls] = useState([]);
    const [previousUrls, setPreviousUrls] = useState([]);
    const [warning, setWarning] = useState('');
    const [warningLastReceiveTime, setWarningLastReceiveTime] = useState('');
    // const [concatenatedUrls, setConcatenatedUrls] = useState([]);
    // let editFilteredUrls = [];

    // console.log(donations)
    // console.log(locationLon)
    const handleDateChange = (date) => {
        setExpireTime(date);
        if (date && date < new Date()) {
            setWarning('Warning: The selected date is in the past!');
            setExpireTime(null)
        } else {
            setWarning('');
        }
    };
    const handleSelectedDateChange = (date) => {
        setSelectedDate(date);
        if (date && date < new Date() || date && date > expireTime) {
            setWarningLastReceiveTime('Warning: The last receive time is in the past!');
            setSelectedDate(null)
        }
        else {
            setWarningLastReceiveTime('');
        }
    };

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
    };

    // useEffect(() => {
    //     setUrlArray([image1, image2, image3, image4].filter(img => img !== null));
    // }, [image1, image2, image3, image4]);
    // console.log(urlArray);

    // const updateUrlArray = () => {
    //     setUrlArray([image1, image2, image3, image4].filter(img => img !== null));
    // };
    const handleDoneeTypeChange = (e) => {
        setDoneeType(e.target.value);
    };
    const handleCategoriesChange = (e) => {
        setCategories(e.target.value);
    };

    const [profileImages, setProfileImages] = useState([null, null, null, null]);

    const handleImageChange = (e, index) => {
        // console.log(e.target.files[0])
        const files = [...profileImages];
        files[index] = e.target.files[0];
        console.log(e.target.files[0]);
        setProfileImages(files);
    }
    const handleRemoveImage1 = () => {
        setImage1(null);
        if (donations) {
            const updatedUrls = [...previousUrls];
            updatedUrls[0] = null;
            setPreviousUrls(updatedUrls);
        }
        // updateUrlArray();
    };
    const handleRemoveImage2 = () => {
        setImage2(null);
        if (donations) {
            const updatedUrls = [...previousUrls];
            updatedUrls[1] = null;
            setPreviousUrls(updatedUrls);
        }
        // updateUrlArray();
    };

    const handleRemoveImage3 = () => {
        setImage3(null);
        if (donations) {
            if (donations) {
                const updatedUrls = [...previousUrls];
                updatedUrls[2] = null;
                setPreviousUrls(updatedUrls);
            }
        }
        // updateUrlArray();
    };

    const handleRemoveImage4 = () => {
        setImage4(null);
        if (donations) {
            const updatedUrls = [...previousUrls];
            updatedUrls[3] = null;
            setPreviousUrls(updatedUrls);
        }

        // updateUrlArray();
    };

    // const updateConcatenatedUrls = () => {
    //     const nonEmptyEditUrls = editFilteredUrls.filter(url => url !== "");
    //     const combinedUrls = filteredUrls.concat(nonEmptyEditUrls);
    //     setConcatenatedUrls(combinedUrls);
    //     console.log('Concatenated URLs:', combinedUrls);
    // };

    useEffect(() => {
        if (donations) {
            setDonationID(donations.donationPost.donation_id)
            setImage1(donations.imagePaths[0]);
            setImage2(donations.imagePaths[1]);
            setImage3(donations.imagePaths[2]);
            setImage4(donations.imagePaths[3]);
            setName(donations.donationPost.post_name);
            setDescription(donations.donationPost.post_description);
            setServes(donations.donationPost.serves)
            setReceiveTime(donations.donationPost.receive_time)
            setLocation(donations.donationPost.pickup_location)
            const [day, month, year] = donations.donationPost.last_receive_date.split('/');
            setSelectedDate(new Date(`${year}-${month}-${day}`));
            const [d, m, y] = donations.donationPost.expiredate.split('/');
            setExpireTime(new Date(`${y}-${m}-${d}`));
            setLocationLat(donations.donationPost.location_lat);
            setLocationLon(donations.donationPost.location_lon)
            const initialFilteredUrls = [
                donations.imagePaths[0],
                donations.imagePaths[1],
                donations.imagePaths[2],
                donations.imagePaths[3],
            ].filter(url => url !== undefined && url !== null);
            setPreviousUrls(initialFilteredUrls);
            console.log('Initial Filtered URLs:', initialFilteredUrls);
        }
    }, [donations]);

    async function newDonation(event) {
        event.preventDefault();
        try {
            const uploadedUrls = await Promise.all(profileImages.map(async (image) => {
                if (
                    image && (
                        image.type === "image/png" ||
                        image.type === "image/jpg" ||
                        image.type === "image/jpeg"
                    )
                ) {
                    const formData = new FormData();
                    formData.append("file", image);
                    formData.append("cloud_name", "de0xjzms6");
                    formData.append("upload_preset", "egqlo2q6");

                    const response = await fetch(
                        "https://api.cloudinary.com/v1_1/de0xjzms6/image/upload",
                        {
                            method: "POST",
                            body: formData
                        }
                    );
                    const imgData = await response.json();
                    return imgData.url;
                }
                return null;
            }));

            // const filteredUrls = uploadedUrls.filter(url => url !== null);
            // const mergedUrls = [
            //     ...previousUrls,
            //     ...filteredUrls
            // ].filter((url, index, self) => self.indexOf(url) === index);
            const filteredUrls = uploadedUrls.filter(url => url !== null);

            // Remove null values from previousUrls
            const cleanedPreviousUrls = previousUrls.filter(url => url !== null);

            // Merge cleaned previousUrls with filteredUrls and remove duplicates
            const mergedUrls = [
                ...cleanedPreviousUrls,
                ...filteredUrls
            ].filter((url, index, self) => self.indexOf(url) === index);

            // console.log('Merged URLs:', mergedUrls);


            // console.log(mergedUrls)
            setProfileImages([null, null, null, null]);

            // console.log('URL in  form:', urlArray);
            const formData = new FormData();
            formData.append('donation_id', donationID)
            formData.append('user_id', userId);
            formData.append('post_name', name);
            formData.append('post_description', description);
            formData.append('serves', serves);
            formData.append('expiredate', formattedExpireDate);
            formData.append('last_receive_date', formattedReceiveDate);
            formData.append('receive_time', receiveTime);
            formData.append('donee_type', doneeType);
            formData.append('pickup_location', location);
            formData.append('categories', categories);
            if (donations) {
                formData.append('urlArray', JSON.stringify(mergedUrls));
            }
            else {
                formData.append('urlArray', JSON.stringify(filteredUrls));
            }
            formData.append('location_lat', parseFloat(locationLat));
            formData.append('location_lon', parseFloat(locationLon));

            let response = await fetch("http://localhost:8000/api/newdonation", {
                method: 'POST',
                body: formData,
                headers: {
                    "Accept": 'application/json'
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Validation Errors:', errorData.errors);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // if (!response.ok) {
            //     throw new Error(`HTTP error! Status: ${response.status}`);
            // }
            let result = await response.json();
            console.log("Result:", result);
            navigate("/dashboard")
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div>
            <Navbar />
            <div className="homePage d-flex">
                <Sidebar />
                <div className="main-content mt-5">
                    <div className="homePage mt-4">
                        <section >
                            <div>
                                <form onSubmit={newDonation}>
                                    <div className='d-flex justify-content-between'>
                                        <h5 className=' fw-bold'><FaBoxesPacking /> Add New Donation</h5>
                                        <button type="submit" className='donateButton' value="Submit">
                                            {donations ? ("✓ Save Changes ") : ("✓ Add Donation ")}
                                        </button>
                                    </div>
                                    <div className="mb-4">
                                        <div className="row mt-3">
                                            <div className="col-8 ">
                                                <div className='px-4 py-2 columnBackground'>
                                                    <h5 className='mb-0'>General Information</h5>
                                                    <div className="my-3">
                                                        <label htmlFor="foodName" className="form-label mt-2 ">Title <span className="text-danger">*</span></label>
                                                        <input type="text" className="form-control textBox" id="foodName" onChange={(e) => setName(e.target.value)} required="required" value={name} />
                                                    </div>
                                                    <div className="mb-3 ">
                                                        <label htmlFor="foodDescription" className="form-label mt-2">Food Description<span className="text-danger">*</span></label>
                                                        <textarea className="form-control textBox" id="foodDescription" rows="3" onChange={(e) => setDescription(e.target.value)} required="required" value={description}></textarea>
                                                    </div>

                                                    <div className="mb-5 row">
                                                        <div className="col mb-2">
                                                            <label htmlFor="contactNumber" className="form-label mt-2 ">Serves <span className="text-danger">*</span></label>
                                                            <input type="number" className="form-control textBox" id="contactNumber" onChange={(e) => setServes(e.target.value)} required="required" value={serves} />
                                                        </div>
                                                        <div className="col">
                                                            <label htmlFor="donee" className="form-label mt-2 ">Donee <span className="text-danger">*</span></label>
                                                            <select className="form-control textBox" id="donee" value={donations?.donationPost?.pickup_location || doneeType} onChange={handleDoneeTypeChange}>
                                                                <option>Organization</option>
                                                                <option>Individual Person</option>
                                                                <option>Anyone</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-4 px-4 py-2 columnBackground">
                                                <h5 className='mb-0'>Upload Image</h5>
                                                <div className="row mt-4 ">
                                                    <div className="col text-center px-1 d-flex justify-content-center">
                                                        <div >
                                                            <form action="" onClick={() => document.querySelector(".input-field1").click()} className="ImageForm1 mb-3">
                                                                <input type="file" accept="image/*" className='input-field1' hidden onChange={(e) => {
                                                                    const { files } = e.target;
                                                                    if (files && files[0]) {
                                                                        setImage1(URL.createObjectURL(files[0]));
                                                                        handleImageChange(e, 0);
                                                                    }
                                                                }} />
                                                                {
                                                                    image1 ?
                                                                        <img src={image1} width={240} height={240} />
                                                                        :
                                                                        <>
                                                                            <MdCloudUpload color="#1475cf" size={60} />
                                                                        </>
                                                                }
                                                            </form>
                                                            <div>
                                                                {
                                                                    image1 ?
                                                                        <button className='btn btn-danger mb-3 w-100' onClick={handleRemoveImage1}>Remove</button>
                                                                        // <button className='btn btn-danger mb-3 w-100' onClick={() => {
                                                                        //     setImage1(null)
                                                                        // }}>Remove</button>
                                                                        : ""
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col text-center px-1 d-flex justify-content-center">
                                                        <div >
                                                            <form action="" onClick={() => document.querySelector(".input-field2").click()} className="ImageForm2 mb-2">
                                                                <input type="file" accept="image/*" className='input-field2' hidden onChange={(e) => {
                                                                    const { files } = e.target;
                                                                    if (files && files[0]) {
                                                                        // if (donations&& donations.imagePaths[1]!=null) {
                                                                        //     setImage2(donations.imagePaths[1]);
                                                                        // } else {
                                                                        setImage2(URL.createObjectURL(files[0]));
                                                                        handleImageChange(e, 1);
                                                                        // }
                                                                        // setImage2(URL.createObjectURL(files[0]));

                                                                    }
                                                                }} />
                                                                {
                                                                    image2 ?
                                                                        <img src={image2} width={115} height={115} />
                                                                        :
                                                                        <>
                                                                            <MdCloudUpload color="#1475cf" size={40} />
                                                                        </>
                                                                }
                                                            </form>
                                                            <div>
                                                                {
                                                                    image2 ?
                                                                        <button className='btn btn-danger mb-3 w-100' onClick={handleRemoveImage2}>Remove</button>
                                                                        // <button className='btn btn-danger mb-3 w-100' onClick={() => {
                                                                        //     setImage2(null)
                                                                        // }}>Remove</button>
                                                                        : ""
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col text-center px-1 d-flex justify-content-center">
                                                        <div >
                                                            <form action="" onClick={() => document.querySelector(".input-field3").click()} className="ImageForm2 mb-2">
                                                                <input type="file" accept="image/*" className='input-field3' hidden onChange={(e) => {
                                                                    const { files } = e.target;
                                                                    if (files && files[0]) {
                                                                        // if (donations && donations.imagePaths[2]!=null) {
                                                                        //     setImage3(donations.imagePaths[2]);
                                                                        // } else {
                                                                        setImage3(URL.createObjectURL(files[0]));
                                                                        handleImageChange(e, 2);
                                                                        // }
                                                                    }
                                                                }} />
                                                                {
                                                                    image3 ?
                                                                        <img src={image3} width={115} height={115} />
                                                                        :
                                                                        <>
                                                                            <MdCloudUpload color="#1475cf" size={40} />
                                                                            {/* <p>Upload Image</p> */}
                                                                        </>
                                                                }
                                                            </form>
                                                            <div>
                                                                {
                                                                    image3 ?
                                                                        <button className='btn btn-danger mb-3 w-100' onClick={handleRemoveImage3}>Remove</button>
                                                                        // <button className='btn btn-danger mb-3 w-100' onClick={() => {
                                                                        //     setImage3(null)
                                                                        // }}>Remove</button>
                                                                        : ""
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col text-center px-1 d-flex justify-content-center">
                                                        <div>
                                                            <form action="" onClick={() => document.querySelector(".input-field4").click()} className="ImageForm2 mb-2">
                                                                <input type="file" accept="image/*" className='input-field4' hidden onChange={(e) => {
                                                                    const { files } = e.target;
                                                                    if (files && files[0]) {
                                                                        // if (donations && donations.imagePaths[3]!=null) {
                                                                        //     setImage4(donations.imagePaths[3]);
                                                                        // } else {
                                                                        setImage4(URL.createObjectURL(files[0]));
                                                                        handleImageChange(e, 3);
                                                                        // }
                                                                    }
                                                                }} />
                                                                {
                                                                    image4 ?
                                                                        <img src={image4} width={115} height={115} />
                                                                        :
                                                                        <>
                                                                            <MdCloudUpload color="#1475cf" size={40} />
                                                                            {/* <p>Upload Image</p> */}
                                                                        </>
                                                                }
                                                            </form>
                                                            <div>
                                                                {
                                                                    image4 ?
                                                                        <button className='btn mb-3 w-100 btn-danger' onClick={handleRemoveImage4}>Remove</button>
                                                                        // <button className='btn mb-3 w-100 btn-danger' onClick={() => {
                                                                        //     setImage4(null)
                                                                        // }}>Remove</button>
                                                                        : ""
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-8 ">
                                                <div className='px-4 pt-4 py-2 columnBackground'>
                                                    <h5 className='mb-0'>Time</h5>
                                                    <div className="my-3">
                                                        <label htmlFor="receiveTime" className="form-label mt-2 ">Receive Time<span className="text-danger">*</span><span className='text-muted exampleSpan'> (eg:10:00 AM to 5:00 PM)</span></label>
                                                        <input type="text" className="form-control textBox" id="receiveTime" onChange={(e) => setReceiveTime(e.target.value)} required="required" value={receiveTime} />
                                                    </div>
                                                    <div className="mb-3 row">
                                                        <div className="col">
                                                            <label htmlFor="expireTime" className="form-label mt-2">Expire Date <span className="text-danger">*</span></label>
                                                            <div className="input-group">
                                                                
                                                                <DatePicker
                                                                    ref={datePickerRef}
                                                                    wrapperClassName="datepicker"
                                                                    className="form-control textBox"
                                                                    selected={expireTime}
                                                                    onChange={handleDateChange}
                                                                    id="expireTime"
                                                                    required
                                                                    value={expireTime}
                                                                />
                                                                {warning && <div className="warning text-danger mt-2">{warning}</div>}
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <label htmlFor="lastReceiveTime" className="form-label mt-2">Last Receive Date <span className="text-danger">*</span></label>
                                                            <div className="input-group">
                                                                <DatePicker
                                                                    ref={datePickerRef} wrapperClassName="datepicker" className="form-control textBox" selected={selectedDate} onChange={handleSelectedDateChange} id="lastReceiveTime" required="required" value={selectedDate} />
                                                                {warningLastReceiveTime && <div className="warning text-danger mt-2">{warningLastReceiveTime}</div>}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4 'px-4 pt-4 py-2 columnBackground">
                                                <h5 className='mb-0'>Category and Location</h5>
                                                <div className="my-3">
                                                    <label htmlFor="category" className="form-label mt-2 ">Category <span className="text-danger">*</span></label>
                                                    <select className="form-control textBox" id="category" value={donations?.donationPost?.pickup_location || categories} onChange={handleCategoriesChange}>
                                                        <option>Cooked Food</option>
                                                        <option>Readymade Food</option>
                                                        <option>UnCooked Food</option>
                                                    </select>
                                                </div>
                                                <div className="my-3">
                                                    <label htmlFor="foodName" className="form-label mt-2 ">Location <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control textBox" id="foodName" onChange={(e) => setLocation(e.target.value)} required="required" value={location} onFocus={() => {
                                                        const modalElement = new window.bootstrap.Modal(document.getElementById('staticBackdrop'));
                                                        modalElement.show();
                                                    }} />


                                                </div>
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
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
