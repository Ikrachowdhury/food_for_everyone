import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
// import "../../assets/css/DoneeList.css";
import { useEffect, useState } from 'react';

// const TableData = [
//     { id: 1, Name: "Abdul karim", Email: 'abdul142@gmail.com', Mobile: '01875560705', Address: 'Sonapur', About: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quam voluptatum laudantium recusandae sunt delectus laboriosam iusto dolorem illo error.' },
//     { id: 2, Name: "Hasanuzzaman", Email: 'hasan3434@gmail.com', Mobile: '01735255342', Address: 'Maijdee Bazar', About: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quam voluptatum laudantium recusandae sunt delectus laboriosam iusto dolorem illo error.' },
//     { id: 3, Name: "Rohomat Ullah", Email: 'rohomat52@gmail.com', Mobile: '01742971432', Address: 'Chowmuhni', About: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quam voluptatum laudantium recusandae sunt delectus laboriosam iusto dolorem illo error.' },
//     { id: 4, Name: "Afif Hossain", Email: 'hossain12@gmail.com', Mobile: '01993424334', Address: 'Maijdee', About: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quam voluptatum laudantium recusandae sunt delectus laboriosam iusto dolorem illo error.' },
//     { id: 5, Name: "Mominul Haque", Email: 'momin45@gmail.com', Mobile: '01742971432', Address: 'Campus', About: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quam voluptatum laudantium recusandae sunt delectus laboriosam iusto dolorem illo error.' },
//     { id: 6, Name: "Sabbir Ahmed", Email: 'sabbir2012@gmail.com', Mobile: '01772294342', Address: 'Townhall', About: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quam voluptatum laudantium recusandae sunt delectus laboriosam iusto dolorem illo error.' },
//     { id: 7, Name: "Afif Hossain", Email: 'hossain12@gmail.com', Mobile: '01993424334', Address: 'Maijdee', About: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quam voluptatum laudantium recusandae sunt delectus laboriosam iusto dolorem illo error.' },
//     { id: 8, Name: "Mominul Haque", Email: 'momin45@gmail.com', Mobile: '01742971432', Address: 'Campus', About: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quam voluptatum laudantium recusandae sunt delectus laboriosam iusto dolorem illo error.' },
//     { id: 9, Name: "Sabbir Ahmed", Email: 'sabbir2012@gmail.com', Mobile: '01772294342', Address: 'Townhall', About: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quam voluptatum laudantium recusandae sunt delectus laboriosam iusto dolorem illo error.' },
// ];

export default function OrganizationList() {
    const [queries, setQueries] = useState("");
    const [error, setError] = useState("");
    const [toast, setToast] = useState("");
    const [message, setMessage] = useState("");
    const [organizationData, setorganizationData] = useState("")
    console.log(error)
    console.log(organizationData)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/organizationList`, {
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
                setorganizationData(result.combinedData)
            } catch (error) {
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    const handleApproveOrganization = async (org_id, email) => {
        console.log(email)
        const url = 'http://localhost:8000/api/approveOrganizationRequest';
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
                setMessage("Organization Request accepted Successfully");
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
                setMessage("Organization Request Rejected Successfully");
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
                <div className="main-content mt-5">
                    <main className="table mt-5" id="customers_table" >
                        <section className="table__header">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0 ms-4">
                                    <li className="breadcrumb-item active" aria-current="page"><b>Organization Approval List</b></li>
                                </ol>
                            </nav>

                            <div className="">
                                <input
                                    placeholder="Search"
                                    className="searchInput me-4"
                                    onChange={(e) => setQueries(e.target.value)}
                                />
                            </div>
                        </section>
                        {organizationData.length > 0 ? (
                            <section className="table__body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="text-center"> Id </th>
                                            <th className="text-center"> Name </th>
                                            <th className="text-center"> Email </th>
                                            <th className="text-center"> Address </th>
                                            <th className="text-center"> Details </th>
                                            <th className="text-center"> Approval </th>
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
                                        }).map((order, index) => (
                                            <tr key={index}>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{index + 1}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle', fontSize: '17px' }}>{order.org_name}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.user.email}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.user.address}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                    <button className="btn btn-outline-primary mx-2" style={{ border: "none" }}>See Details </button>
                                                </td>
                                                <td className="text-center">
                                                    <div className="d-flex justify-content-center">
                                                        <button className="btn btn-outline-success mx-2" style={{ border: "none" }} onClick={() => handleApproveOrganization(order.org_id, order.user.email)}>✓ </button>
                                                        <button className="btn btn-outline-danger mx-2" style={{ border: "none" }} onClick={() => handleRejectOrganization(order.org_id)}>X</button>
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
                                <div className="MainMessage">No Request</div>
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
