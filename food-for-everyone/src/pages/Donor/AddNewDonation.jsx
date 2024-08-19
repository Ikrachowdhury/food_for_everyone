import Sidebar from '../../components/Sidebar'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../assets/css/AddNewDonation.css'
import { useRef, useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import Navbar from '../../components/Navbar';
import { FaBoxesPacking } from 'react-icons/fa6';
import { format } from 'date-fns';

export default function AddNewDonation() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [receiveTime, setReceiveTime] = useState(null);
    const datePickerRef = useRef(null);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
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
    const handleDoneeTypeChange = (e) => {
        setDoneeType(e.target.value);
    };
    const handleCategoriesChange = (e) => {
        setCategories(e.target.value);
    };

    const [profileImages, setProfileImages] = useState([null, null, null, null]);

    const handleImageChange = (e, index) => {
        console.log(e)
        console.log(index)
        const files = [...profileImages];
        files[index] = e.target.files[0];
        setProfileImages(files);
    }

    async function newDonation(event) {
        event.preventDefault();
        const urlArray = [];
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
            uploadedUrls.forEach((url, index) => {
                if (url) {
                    urlArray.push(url);
                    console.log(`Image ${index + 1} URL: ${url}`);
                }
            });
            setProfileImages([null, null, null, null]);
        } catch (error) {
            console.log(error);
        }

        const formData = new FormData();
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
        formData.append('urlArray', JSON.stringify(urlArray));
        console.log(JSON.stringify(urlArray))

        console.warn(name, description, serves, expireTime, selectedDate, receiveTime, doneeType, location, categories, urlArray);
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
                    <div className="homePage mt-4">
                        <section >
                            <div>
                                <form onSubmit={newDonation}>
                                    <div className='d-flex justify-content-between'>
                                        <h5 className=' fw-bold'><FaBoxesPacking /> Add New Donation</h5>
                                        <button type="submit" className='donateButton' value="Submit" > ✓ Add Donation</button>
                                    </div>
                                    <div className="mb-4">

                                        <div className="row mt-3">
                                            <div className="col-8 ">
                                                <div className='px-4 py-2 columnBackground'>
                                                    <h5 className='mb-0'>General Information</h5>
                                                    <div className="my-3">
                                                        <label htmlFor="foodName" className="form-label mt-2 ">Title <span className="text-danger">*</span></label>
                                                        <input type="text" className="form-control textBox" id="foodName" onChange={(e) => setName(e.target.value)} required="required" />
                                                    </div>
                                                    <div className="mb-3 ">
                                                        <label htmlFor="foodDescription" className="form-label mt-2">Food Description<span className="text-danger">*</span></label>
                                                        <textarea className="form-control textBox" id="foodDescription" rows="3" onChange={(e) => setDescription(e.target.value)} required="required"></textarea>
                                                    </div>

                                                    <div className="mb-5 row">
                                                        <div className="col mb-2">
                                                            <label htmlFor="contactNumber" className="form-label mt-2 ">Serves <span className="text-danger">*</span></label>
                                                            <input type="number" className="form-control textBox" id="contactNumber" onChange={(e) => setServes(e.target.value)} required="required" />
                                                        </div>
                                                        <div className="col">
                                                            <label htmlFor="donee" className="form-label mt-2 ">Donee <span className="text-danger">*</span></label>
                                                            <select className="form-control textBox" id="donee" value={doneeType} onChange={handleDoneeTypeChange}>
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
                                                                            {/* <p>Upload Image</p> */}
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
                                                            <form action="" onClick={() => document.querySelector(".input-field2").click()} className="ImageForm2 mb-2">
                                                                <input type="file" accept="image/*" className='input-field2' hidden onChange={(e) => {
                                                                    const { files } = e.target;
                                                                    if (files && files[0]) {
                                                                        setImage2(URL.createObjectURL(files[0]));
                                                                        handleImageChange(e, 1);
                                                                    }
                                                                }} />
                                                                {
                                                                    image2 ?
                                                                        <img src={image2} width={115} height={115} />
                                                                        :
                                                                        <>
                                                                            <MdCloudUpload color="#1475cf" size={40} />
                                                                            {/* <p>Upload Image</p> */}
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
                                                            <form action="" onClick={() => document.querySelector(".input-field3").click()} className="ImageForm2 mb-2">
                                                                <input type="file" accept="image/*" className='input-field3' hidden onChange={(e) => {
                                                                    const { files } = e.target;
                                                                    if (files && files[0]) {
                                                                        setImage3(URL.createObjectURL(files[0]));
                                                                        handleImageChange(e, 2);
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
                                                            <form action="" onClick={() => document.querySelector(".input-field4").click()} className="ImageForm2 mb-2">
                                                                <input type="file" accept="image/*" className='input-field4' hidden onChange={(e) => {
                                                                    const { files } = e.target;
                                                                    if (files && files[0]) {
                                                                        setImage4(URL.createObjectURL(files[0]));
                                                                        handleImageChange(e, 3);
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
                                        <div className="row mt-3">
                                            <div className="col-8 ">
                                                <div className='px-4 pt-4 py-2 columnBackground'>
                                                    <h5 className='mb-0'>Time</h5>
                                                    <div className="my-3">
                                                        <label htmlFor="receiveTime" className="form-label mt-2 ">Receive Time<span className="text-danger">*</span><span className='text-muted exampleSpan'> (eg:10:00 AM to 5:00 PM)</span></label>
                                                        <input type="text" className="form-control textBox" id="receiveTime" onChange={(e) => setReceiveTime(e.target.value)} required="required" />
                                                    </div>
                                                    <div className="mb-3 row">
                                                        <div className="col">
                                                            <label htmlFor="expireTime" className="form-label mt-2">Expire Date <span className="text-danger">*</span></label>
                                                            <div className="input-group">
                                                                <DatePicker
                                                                    ref={datePickerRef} wrapperClassName="datepicker" className="form-control textBox" selected={expireTime} onChange={(date) => setExpireTime(date)} id="expireTime" required />
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <label htmlFor="lastReceiveTime" className="form-label mt-2">Last Receive Date <span className="text-danger">*</span></label>
                                                            <div className="input-group">
                                                                <DatePicker
                                                                    ref={datePickerRef} wrapperClassName="datepicker" className="form-control textBox" selected={selectedDate} onChange={(date) => setSelectedDate(date)} id="lastReceiveTime" required />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4 'px-4 pt-4 py-2 columnBackground">
                                                <h5 className='mb-0'>Category and Location</h5>
                                                <div className="my-3">
                                                    <label htmlFor="category" className="form-label mt-2 ">Category <span className="text-danger">*</span></label>
                                                    <select className="form-control textBox" id="category" value={categories} onChange={handleCategoriesChange}>
                                                        <option>Cooked Food</option>
                                                        <option>Readymade Food</option>
                                                        <option>UnCooked Food</option>
                                                    </select>
                                                </div>
                                                <div className="my-3">
                                                    <label htmlFor="foodName" className="form-label mt-2 ">Location <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control textBox" id="foodName" onChange={(e) => setLocation(e.target.value)} required="required" />
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
