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
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{index+1}</td>
                                                
                                                <td className="text-center" style={{ verticalAlign: 'middle', fontSize: '17px' }}>{order.name}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.email}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.phone}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.address}</td>
                                             
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
                    </main>
                </div>
            </div>
        </div>
    );
}