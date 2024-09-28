import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import "../../assets/css/DoneeList.css";
// import image from "../../images/avatar.jpg"
// import { FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
// const TableData = [
//     { id: 1, Name: "Abdul karim", Email: 'abdul142@gmail.com', Mobile: '01875560705', Address: 'Sonapur', TotalDelivery: '3', },
//     { id: 2, Name: "Hasanuzzaman", Email: 'hasan3434@gmail.com', Mobile: '01735255342', Address: 'Maijdee Bazar', TotalDelivery: '4', },
//     { id: 3, Name: "Rohomat Ullah", Email: 'rohomat52@gmail.com', Mobile: '01742971432', Address: 'Chowmuhni', TotalDelivery: '23', },
//     { id: 4, Name: "Afif Hossain", Email: 'hossain12@gmail.com', Mobile: '01993424334', Address: 'Maijdee', TotalDelivery: '12', },
//     { id: 5, Name: "Mominul Haque", Email: 'momin45@gmail.com', Mobile: '01742971432', Address: 'Campus', TotalDelivery: '7', },
//     { id: 6, Name: "Sabbir Ahmed", Email: 'sabbir2012@gmail.com', Mobile: '01772294342', Address: 'Townhall', TotalDelivery: '4', },
//     { id: 7, Name: "Afif Hossain", Email: 'hossain12@gmail.com', Mobile: '01993424334', Address: 'Maijdee', TotalDelivery: '12', },
//     { id: 8, Name: "Mominul Haque", Email: 'momin45@gmail.com', Mobile: '01742971432', Address: 'Campus', TotalDelivery: '7', },
//     { id: 9, Name: "Sabbir Ahmed", Email: 'sabbir2012@gmail.com', Mobile: '01772294342', Address: 'Townhall', TotalDelivery: '4', },
// ]

export default function RiderList() {
    const [queries, setQueries] = useState("");
    const [riderData, setRiderData] = useState("")
    const [toast, setToast] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/riderListAdmin`, {
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
                setRiderData(result.rider)
            } catch (error) {
                alert(error.message);
            }
        };
        fetchData();
    }, []);

    const handleApproveOrganization = async (org_id, email) => {
        console.log(email)
        const url = 'http://localhost:8000/api/approveRiderRequest';
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ org_id })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let result = await response.json();
            console.log("Result:", result);
            if (response.ok) {
                let emailResult = await fetch(`http://localhost:8000/api/send-adminApproval-mail/${email}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": 'application/json',
                        "Accept": 'application/json'
                    }
                });
                let emailResultData = await emailResult.json();
                console.warn("email result", emailResultData);

                // if (emailResult.ok) {
                //     alert("Verification email sent successfully");
                // } else {
                //     alert("Error sending verification email", emailResultData);
                // }
            }
            if (result.success) {
                setMessage("Rider Request accepted Successfully");
                setToast(true);
                // alert('Organization Request accepted successfully!');
                // window.location.reload(); 

            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while accepting the donation. ' + error.message);
        }
    };
    const handleRejectOrganization = async (org_id) => {
        console.log(org_id)
        const url = 'http://localhost:8000/api/rejectOrganizationRequest';
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ org_id })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let result = await response.json();
            console.log("Result:", result);
            if (result.success) {
                setMessage("Rider Request Rejected");
                setToast(true);
                // alert('Organization Request Rejected successfully!');
                // window.location.reload(); 
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while accepting the donation. ' + error.message);
        }
    };
    const closeToast = () => {
        setToast(false)
        window.location.reload();
    }
    return (
        <div>
            <Navbar />
            <div className="homePage d-flex">
                <Sidebar />
                <div className="main-content mt-5 ">
                    <main className="table mt-5  style={{ verticalAlign: 'middle' }} table-row-gray-300">
                        <section className="table__header">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0 ms-4">
                                    {/* <li className="breadcrumb-item"><b>User</b></li> */}
                                    <li className="breadcrumb-item active" aria-current="page"><b>Rider List</b></li>
                                </ol>
                            </nav>
                            <div className="">
                                <input
                                    placeholder="Search"
                                    className="searchInput me-4" onChange={(e) => setQueries(e.target.value)}
                                />
                            </div>
                        </section>
                        {riderData.length > 0 ? (
                            <section className="table__body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="text-center"> Id </th>
                                            <th className="text-center"> Name </th>
                                            <th className="text-center"> Email </th>
                                            <th className="text-center"> Mobile </th>
                                            <th className="text-center"> Address </th>
                                            <th className="text-center"> Approval </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {riderData.filter((data) => {
                                            const values = Object.values(data).flatMap(field => {
                                                if (typeof field === 'object' && field !== null) {
                                                    return Object.values(field).filter(innerField => typeof innerField === 'string');
                                                }
                                                return typeof field === 'string' ? field : [];
                                            });

                                            return values.some(field => field.toLowerCase().includes(queries.toLowerCase()));
                                        }).map((order, index) => (
                                            <tr key={index} >
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{index + 1}</td>

                                                <td className="text-center" style={{ verticalAlign: 'middle', fontSize: '17px' }}>{order.name}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.email}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.phone}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.address}</td>
                                                <td className="text-center">
                                                    <div className="d-flex justify-content-center">
                                                        <button className="btn btn-outline-success mx-2" style={{ border: "none" }} onClick={() => handleApproveOrganization(order.id, order.email)}>✓ </button>
                                                        <button className="btn btn-outline-danger mx-2" style={{ border: "none" }} onClick={() => handleRejectOrganization(order.id)}>X</button>
                                                    </div>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </section>
                        ) : (
                            <div className="centered-content">
                                <div className="text">
                                    <span>Ooops...</span>
                                </div>
                                <div className="MainMessage">No Rider List</div>
                            </div>
                        )}
                        {toast && (
                            <div className="toast show bg-light" role="alert" aria-live="assertive" aria-atomic="true" style={{
                                position: 'fixed', top: '20px', right: '20px', zIndex: 9999, left: '50%', minWidth: '500px',
                                transform: 'translateX(-50%)',
                            }}>
                                <div className="toast-header">
                                    <strong className="me-auto text-success">{message}</strong>
                                    <button type="button" className="btn-close" onClick={closeToast} aria-label="Close"></button>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}