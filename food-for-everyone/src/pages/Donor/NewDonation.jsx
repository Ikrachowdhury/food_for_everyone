import Sidebar from '../../components/Sidebar'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../assets/css/newDonation.css'
import { useRef, useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import Navbar from '../../components/Navbar';
export default function NewDonation() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [receiveTime, setReceiveTime] = useState(null);
    const datePickerRef = useRef(null);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [expireTime, setExpireTime] = useState("");
    const [description, setDescription] = useState("");
    const [serves, setServes] = useState("");
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)
    const [image4, setImage4] = useState(null)
    const [doneeType, setDoneeType] = useState('');
    const userId = localStorage.getItem('user_id');

    // Handle the change event
    const handleDoneeTypeChange = (e) => {
        setDoneeType(e.target.value);
    };

    async function newDonation(event) {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('post_name', name);
        formData.append('post_description', description);
        formData.append('serves', serves);
        formData.append('expiredate', expireTime);
        formData.append('last_receive_date', selectedDate);
        formData.append('receive_time', receiveTime);
        formData.append('donee_type', doneeType);
        formData.append('pickup_location', location);
    
        if (image1) {
            formData.append('images[]', image1);
        }
        if (image2) {
            formData.append('images[]', image2);
        }
        if (image3) {
            formData.append('images[]', image3);
        }
        if (image4) {
            formData.append('images[]', image4);
        }
    
        console.warn(name, description, serves, expireTime, selectedDate, receiveTime, doneeType, location);
        try {
            let response = await fetch("http://localhost:8000/api/newdonation", {
                method: 'POST',
                body: formData,
                headers: {
                    "Accept": 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let result = await response.json();
            console.log("Result:", result);
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
                    <div className="homePage mt-5">
                        <section className="px-5">
                            <div>
                                <div className="container mb-5">
                                    <form className="mx-5 px-5 " onSubmit={newDonation}>
                                        {/* <h2 className="text-center my-5 heading">New Donation Form</h2> */}
                                        <div className="row row-cols-1 row-cols-xl-2 row-cols-lg-2 row-cols-md-1 row-cols-sm-1 g-4 mb-3">
                                            <div className="col">
                                                <h5 className='foodFormHeading mb-3'>Food Info</h5>
                                                <hr className='horizontalLine' />
                                                <div className="mb-3">
                                                    <label htmlFor="foodName" className="form-label mt-2 formLabel">Title <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control formInput bg-light" id="foodName" onChange={(e) => setName(e.target.value)} required="required" />
                                                </div>
                                                <div className="mb-3 ">
                                                    <label htmlFor="foodDescription" className="form-label mt-2 formLabel">Food Description<span className="text-danger">*</span></label>
                                                    <textarea className="form-control bg-light" id="foodDescription" rows="5" onChange={(e) => setDescription(e.target.value)}></textarea>
                                                </div>
                                                <div className="mb-3 row">
                                                    <div className="col">
                                                        <label htmlFor="contactNumber" className="form-label mt-2 formLabel">Serves <span className="text-danger">*</span></label>
                                                        <input type="number" className="form-control formInput bg-light" id="contactNumber" onChange={(e) => setServes(e.target.value)} required="required" />
                                                    </div>
                                                    <div className="col">
                                                        <label htmlFor="donee" className="form-label mt-2 formLabel">Donee <span className="text-danger">*</span></label>
                                                        <select className="form-control formInput bg-light" id="donee" value={doneeType} onChange={handleDoneeTypeChange}>
                                                            <option>Organization</option>
                                                            <option>Individual Person</option>
                                                            <option>Anyone</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <h5 className='foodFormHeading mb-3'>Upload Image</h5>
                                                <hr className='horizontalLine' />
                                                <div className="row">
                                                    <div className="col text-center px-1 d-flex justify-content-center">
                                                        <div >
                                                            <form action="" onClick={() => document.querySelector(".input-field1").click()} className="Image1Form mb-3">
                                                                <input type="file" accept="image/*" className='input-field1' hidden onChange={({ target: { files } }) => {
                                                                    files[0]
                                                                    if (files) {
                                                                        setImage1(URL.createObjectURL(files[0]))
                                                                    }
                                                                }} />
                                                                {
                                                                    image1 ?
                                                                        <img src={image1} width={240} height={240} />
                                                                        :
                                                                        <>
                                                                            <MdCloudUpload color="#1475cf" size={60} />
                                                                            <p>Upload Image</p>
                                                                        </>
                                                                }
                                                            </form>
                                                            <div>
                                                                {
                                                                    image1 ?
                                                                        <button className='btn btn-danger mb-3 w-100' onClick={() => {
                                                                            setImage1(null)
                                                                        }}>Remove</button>
                                                                        : ""
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col text-center px-1 d-flex justify-content-center">
                                                        <div >
                                                            <form action="" onClick={() => document.querySelector(".input-field2").click()} className="ImageForm1 mb-3">
                                                                <input type="file" accept="image/*" className='input-field2' hidden onChange={({ target: { files } }) => {
                                                                    files[0]
                                                                    if (files) {
                                                                        setImage2(URL.createObjectURL(files[0]))
                                                                    }
                                                                }} />
                                                                {
                                                                    image2 ?
                                                                        <img src={image2} width={115} height={115} />
                                                                        :
                                                                        <>
                                                                            <MdCloudUpload color="#1475cf" size={60} />
                                                                            <p>Upload Image</p>
                                                                        </>
                                                                }
                                                            </form>
                                                            <div>
                                                                {
                                                                    image2 ?
                                                                        <button className='btn btn-danger mb-3 w-100' onClick={() => {
                                                                            setImage2(null)
                                                                        }}>Remove</button>
                                                                        : ""
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col text-center px-1 d-flex justify-content-center">
                                                        <div >
                                                            <form action="" onClick={() => document.querySelector(".input-field3").click()} className="ImageForm1 mb-3">
                                                                <input type="file" accept="image/*" className='input-field3' hidden onChange={({ target: { files } }) => {
                                                                    files[0]
                                                                    if (files) {
                                                                        setImage3(URL.createObjectURL(files[0]))
                                                                    }
                                                                }} />
                                                                {
                                                                    image3 ?
                                                                        <img src={image3} width={115} height={115} />
                                                                        :
                                                                        <>
                                                                            <MdCloudUpload color="#1475cf" size={60} />
                                                                            <p>Upload Image</p>
                                                                        </>
                                                                }
                                                            </form>
                                                            <div>
                                                                {
                                                                    image3 ?
                                                                        <button className='btn btn-danger mb-3 w-100' onClick={() => {
                                                                            setImage3(null)
                                                                        }}>Remove</button>
                                                                        : ""
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col text-center px-1 d-flex justify-content-center">
                                                        <div>
                                                            <form action="" onClick={() => document.querySelector(".input-field4").click()} className="ImageForm1 mb-3">
                                                                <input type="file" accept="image/*" className='input-field4' hidden onChange={({ target: { files } }) => {
                                                                    files[0]
                                                                    if (files) {
                                                                        setImage4(URL.createObjectURL(files[0]))
                                                                    }
                                                                }} />
                                                                {
                                                                    image4 ?
                                                                        <img src={image4} width={115} height={115} />
                                                                        :
                                                                        <>
                                                                            <MdCloudUpload color="#1475cf" size={60} />
                                                                            <p>Upload Image</p>
                                                                        </>
                                                                }
                                                            </form>
                                                            <div>
                                                                {
                                                                    image4 ?
                                                                        <button className='btn mb-3 w-100 btn-danger' onClick={() => {
                                                                            setImage4(null)
                                                                        }}>Remove</button>
                                                                        : ""
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h5 className='foodFormHeading mt-5 mb-3'>Time and Receive</h5>
                                        <hr className='horizontalLine' />
                                        <div className="row row-cols-1 row-cols-xl-2 row-cols-lg-2 row-cols-md-1 row-cols-sm-1 g-4">
                                            <div className="col mb-3">
                                                <label htmlFor="receiveLocation" className="form-label mt-2 formLabel">Receive Location <span className="text-danger">*</span><span className='text-muted exampleSpan'></span></label>
                                                <input type="text" className="form-control formInput bg-light" id="receiveLocation" required="required" onChange={(e) => setLocation(e.target.value)} />
                                            </div>
                                            <div className="col mb-3">
                                                <label htmlFor="receiveTime" className="form-label mt-2 formLabel">Receive Time<span className="text-danger">*</span><span className='text-muted exampleSpan'> (eg:10:00 AM to 5:00 PM)</span></label>
                                                <input type="text" className="form-control formInput bg-light" id="receiveTime" onChange={(e) => setReceiveTime(e.target.value)} required="required" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col mb-3">
                                                <label htmlFor="expirationTime" className="form-label mt-2 formLabel">Expire Date<span className="text-danger">*</span></label>
                                                <input type="text" className="form-control formInput bg-light" id="expirationTime" onChange={(e) => setExpireTime(e.target.value)} required="required" />
                                            </div>
                                            <div className="col mb-3">
                                                <label htmlFor="receiveTime" className="form-label mt-2 formLabel">Last Receive Date <span className="text-danger">*</span></label>
                                                <div className="input-group">
                                                    <DatePicker
                                                        ref={datePickerRef}
                                                        wrapperClassName="datepicker"
                                                        className="form-control formInput bg-light"
                                                        selected={selectedDate}
                                                        onChange={(date) => setSelectedDate(date)}
                                                        id="receiveTime"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-around my-4">
                                            <input type="submit" className="btn btn-sm mb-3 submitButton" value="Submit" />
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
