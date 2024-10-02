import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import { useEffect, useState } from 'react';

export default function DirectDonation() {
    const [isLoading, setIsLoading] = useState(true);
    const [queries, setQueries] = useState("");
    const [organizationData, setorganizationData] = useState("")
    const [orgProfileData, setOrgProfileData] = useState("")
    const [user_id, setUserId] = useState("")

    const handleDetailsModal = (id) => {
        
        setUserId(id)
        // setOrgProfileData(orgData);
    };
    // console.log(user_id)
    useEffect(() => {
        const fetchData = async () => {
            try {
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
                console.log(result)
                setOrgProfileData(result.user);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [user_id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/doneeListAdmin`, {
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
                setorganizationData(result.combinedData)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <Navbar />
            <div className="homePage d-flex">
                <Sidebar />
                <div className="main-content mt-5">
                    {/* <div className="homePage mt-5"> */}
                    <main className="table mt-5 table-row-gray-300">
                        <section className="table__header">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0 ms-4">
                                    <li className="breadcrumb-item"><b>Donation</b></li>
                                    <li className="breadcrumb-item active" aria-current="page"><b>Oraganization List</b></li>
                                </ol>
                            </nav>
                            <div className="">
                                <input
                                    placeholder="Search"
                                    className="searchInput me-4" onChange={(e) => setQueries(e.target.value)}
                                />
                            </div>
                        </section>
                        {isLoading ? (
                            <div className="centered-content">
                                <div className="text">Loading...</div>
                            </div>
                        ) :
                            organizationData.length > 0 ? (
                                <section className="table__body">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="min-w-100px text-center"> ID </th>
                                                <th className="min-w-100px text-center"> Organization Name </th>
                                                <th className="min-w-100px text-center" style={{ width: "500px" }}> Description </th>
                                                <th className="min-w-100px text-center"> Address </th>
                                                {/* <th className="min-w-100px text-center"> Contact </th> */}
                                                <th className="min-w-100px text-center"> Action </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {organizationData.filter((data) => {
                                                const values = Object.values(data).flatMap(field => {
                                                    if (typeof field === 'object' && field !== null) {
                                                        return Object.values(field).filter(innerField => typeof innerField === 'string');
                                                    }
                                                    return typeof field === 'string' ? field : [];
                                                });

                                                return values.some(field => field.toLowerCase().includes(queries.toLowerCase()));
                                            }).map((data, index) => (
                                                <tr key={index} >
                                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>{index + 1}</td>
                                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.org_name}</td>
                                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.org_about}</td>
                                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.user.address}</td>
                                                    {/* <td className="text-center" style={{ verticalAlign: 'middle' }}><button className="btn btn-outline-primary ">Message</button></td> */}
                                                    <td className="text-center" style={{ verticalAlign: 'middle' }}><button className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#detailsModal" onClick={() => handleDetailsModal(data.org_id)}>View info</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="modal fade " id="detailsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered modal-xl">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <strong className="me-auto text-success">Organization Information</strong>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                       
                                                    <div className="row gutters-sm ">
                                                        <div className="col-md-2">
                                                        </div>
                                                        <div className="col-md-8 mb-3">
                                                            <div className="card bg-light">
                                                                <div className="card-body shadow">
                                                                    <div className="row">
                                                                        <div className="d-flex flex-column align-items-center text-center">
                                                                            <div className="upload">
                                                                                <img
                                                                                    src={orgProfileData.profile_img}
                                                                                    alt="Profile"
                                                                                    id="image"
                                                                                />
                                                                            </div>
                                                                            <div className="mt-1">
                                                                                <h4> {orgProfileData.org_name}</h4>
                                                                                <p className="text-secondary mb-1">{orgProfileData.user_type}</p>
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
                                                                            {orgProfileData.name}
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <div className="row align-items-center">
                                                                        <div className="col-sm-3">
                                                                            <h6 className="mb-0">Email</h6>
                                                                        </div>
                                                                        <div className="col-sm-9 text-secondary">
                                                                            {orgProfileData.email}
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <div className="row align-items-center">
                                                                        <div className="col-sm-3">
                                                                            <h6 className="mb-0">Mobile</h6>
                                                                        </div>
                                                                        <div className="col-sm-9 text-secondary d-flex justify-content-between align-items-center">
                                                                            <div> {orgProfileData.phone}</div>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <div className="row align-items-center">
                                                                        <div className="col-sm-3">
                                                                            <h6 className="mb-0">Address</h6>
                                                                        </div>
                                                                        <div className="col-sm-9 text-secondary d-flex justify-content-between align-items-center">
                                                                            <div>{orgProfileData.address}</div>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                            <div className="row align-items-center">
                                                                                <div className="col-sm-3">
                                                                                    <h6 className="mb-0">Office Time</h6>
                                                                                </div>
                                                                                <div className="col-sm-9 text-secondary d-flex justify-content-between align-items-center">
                                                                                    <div>{orgProfileData.office_time}</div>
                                                                                </div>
                                                                            </div>
                                                                            <hr />
                                                                            <div className="row align-items-center">
                                                                                <div className="col-sm-3">
                                                                                    <h6 className="mb-0">Organization About</h6>
                                                                                </div>
                                                                                <div className="col-sm-9 text-secondary d-flex justify-content-between align-items-center">
                                                                                    <div>{orgProfileData.org_about}</div>
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
                                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLongTitle">Rating</h5>
                                                    <button type="button" className="close text-danger" data-bs-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="receivedrating">
                                                        <input type="radio" name="receivedrating" id="r1" />
                                                        <label htmlFor="r1"></label>
                                                        <input type="radio" name="receivedrating" id="r2" />
                                                        <label htmlFor="r2"></label>
                                                        <input type="radio" name="receivedrating" id="r3" />
                                                        <label htmlFor="r3"></label>
                                                        <input type="radio" name="receivedrating" id="r4" />
                                                        <label htmlFor="r4"></label>
                                                        <input type="radio" name="receivedrating" id="r5" />
                                                        <label htmlFor="r5"></label>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-primary">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            ) : (
                                <div className="centered-content">
                                    <div className="text">
                                        <span>Ooops...</span>
                                    </div>
                                    <div className="MainMessage">No Organization List</div>
                                </div>
                            )}
                    </main>
                </div>
            </div>
        </div>
        // </div>
    )
}
