import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import "../../assets/css/DoneeList.css";
import image from "../../images/avatar.jpg"
import { FaTrash } from 'react-icons/fa';
import { useState } from 'react';
const TableData = [
    { id: 1, Name: "Abdul karim", Email: 'abdul142@gmail.com', Mobile: '01875560705', Address: 'Sonapur', TotalDelivery: '3', },
    { id: 2, Name: "Hasanuzzaman", Email: 'hasan3434@gmail.com', Mobile: '01735255342', Address: 'Maijdee Bazar', TotalDelivery: '4', },
    { id: 3, Name: "Rohomat Ullah", Email: 'rohomat52@gmail.com', Mobile: '01742971432', Address: 'Chowmuhni', TotalDelivery: '23', },
    { id: 4, Name: "Afif Hossain", Email: 'hossain12@gmail.com', Mobile: '01993424334', Address: 'Maijdee', TotalDelivery: '12', },
    { id: 5, Name: "Mominul Haque", Email: 'momin45@gmail.com', Mobile: '01742971432', Address: 'Campus', TotalDelivery: '7', },
    { id: 6, Name: "Sabbir Ahmed", Email: 'sabbir2012@gmail.com', Mobile: '01772294342', Address: 'Townhall', TotalDelivery: '4', },
    { id: 7, Name: "Afif Hossain", Email: 'hossain12@gmail.com', Mobile: '01993424334', Address: 'Maijdee', TotalDelivery: '12', },
    { id: 8, Name: "Mominul Haque", Email: 'momin45@gmail.com', Mobile: '01742971432', Address: 'Campus', TotalDelivery: '7', },
    { id: 9, Name: "Sabbir Ahmed", Email: 'sabbir2012@gmail.com', Mobile: '01772294342', Address: 'Townhall', TotalDelivery: '4', },
]

export default function RiderList() {
    const [queries, setQueries] = useState("");
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
                                    <li className="breadcrumb-item"><b>User</b></li>
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
                        <section className="table__body">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="text-center"> Id </th>
                                        <th className="text-center"> Image </th>
                                        <th className="text-center"> Name </th>
                                        <th className="text-center"> Email </th>
                                        <th className="text-center"> Mobile </th>
                                        <th className="text-center"> Address </th>
                                        <th className="text-center"> Total Delivery </th>
                                        <th className="text-center"> Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TableData.filter((doneelist) =>
                                        Object.values(doneelist).some(
                                            (field) =>
                                                typeof field === 'string' && field.toLowerCase().includes(queries.toLowerCase())
                                        )
                                    ).map(order => (
                                        <tr key={order.id} >
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.id}</td>
                                            <td className="text-center">
                                                <img src={image} alt="Image" />
                                            </td>
                                            <td className="text-center" style={{ verticalAlign: 'middle', fontSize: '17px' }}>{order.Name}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.Email}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.Mobile}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.Address}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.TotalDelivery}</td>
                                            <td className="text-center">
                                                <button className="btn btn-outline-danger mx-2" style={{ border: "none" }}><FaTrash /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
}