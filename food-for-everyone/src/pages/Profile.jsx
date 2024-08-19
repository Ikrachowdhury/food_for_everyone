import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../assets/css/profile.css';
import arman from "../images/IMG_20191227_130350_Bokeh.jpg";
import { FaEdit } from 'react-icons/fa';
// import { MdCloudUpload } from 'react-icons/md';
import { useState } from 'react';

export default function Profile() {
    const [image2, setImage2] = useState(null)
    return (
        <div>
            <Navbar />
            <div className="homePage d-flex">
                <Sidebar />
                <div className="main-content">
                    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100">
                        <div className="container">
                            <div className="main-body">
                                <div className="row gutters-sm">
                                    <div className="col-md-4 mb-3">
                                        <div className="card">
                                            <div className="card-body shadow ">
                                                <div className="d-flex flex-column align-items-center text-center">
                                                    <form action="" onClick={() => document.querySelector(".input-field2").click()} className="ImageForm11 mb-3">
                                                        <input type="file" accept="image/*" className='input-field2' hidden onChange={({ target: { files } }) => {
                                                            files[0]
                                                            if (files) {
                                                                setImage2(URL.createObjectURL(files[0]))
                                                            }
                                                        }} />
                                                        {
                                                            image2 ?
                                                                <img src={image2} width={178} height={178} className="rounded-circle" />
                                                                :
                                                                <>
                                                                    <img src={arman} alt="Admin" className="rounded-circle" width="178" height="178" />
                                                                    {/* <MdCloudUpload color="#1475cf" size={60} />
                                                                            <p>Upload Image</p> */}
                                                                </>
                                                        }
                                                    </form>
                                                    {/* <img src={arman} alt="Admin" className="rounded-circle" width="178" height="178" /> */}
                                                    <div>
                                                        {
                                                            image2 ?
                                                                <div className='d-flex'>
                                                                    <button className='btn btn-danger mb-3 w-100' onClick={() => setImage2(null)}>Cancel</button>
                                                                    <button className='btn btn-primary mb-3 w-100 ms-2'>Save</button>
                                                                </div>
                                                                : ""
                                                        }
                                                    </div>

                                                    <div className="mt-1">
                                                        <h4>Armanur Rashid</h4>
                                                        <h4>★★★★★</h4>
                                                        <p className="text-secondary mb-1">Donor</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card mb-3">
                                            <div className="card-body shadow mt-1">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Full Name</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        Kenneth Valdez
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row align-items-center">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Email</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        armanurrashid105086@gmail.com
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
                                                            <div className="modal fade " id="passwordBackdrops" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                                <div className="modal-dialog modal-dialog-centered">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h5 className="modal-title" id="staticBackdropLabel">New Password</h5>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="name" className="form-label mt-2 OrganizationLabel">Enter Old Password</label>
                                                                                <input type="text" className="form-control registrationInput" id="name" required="required" />
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label htmlFor="name" className="form-label mt-2 OrganizationLabel">Enter New Password</label>
                                                                                <input type="text" className="form-control registrationInput" id="name" required="required" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-primary">Update</button>
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
                                                        <div> 01875560507</div>
                                                        <div>
                                                            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrops">
                                                                <FaEdit className='text-primary' />
                                                            </button>
                                                            <div className="modal fade " id="staticBackdrops" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                                <div className="modal-dialog modal-dialog-centered">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h5 className="modal-title" id="staticBackdropLabel">New Phone Number</h5>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            <input type="number" className="form-control registrationInput" id="name" required="required" />
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-primary">Update</button>
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
                                                        <div>Sonapur, Noakhali</div>
                                                        <div>
                                                            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                                <FaEdit className='text-primary' />
                                                            </button>
                                                            <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                                <div className="modal-dialog modal-dialog-centered">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h5 className="modal-title" id="staticBackdropLabel">New Address</h5>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            <textarea className="form-control" rows="3"></textarea>
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-primary">Update</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <hr /> */}
                                            </div>
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
