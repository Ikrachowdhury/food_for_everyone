import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import "../../assets/css/DoneeList.css";
import { FaTrash } from 'react-icons/fa';
import { useState } from 'react';

const TableData = [
    { id: 1, postName: "Abdul karim", donorName: 'abdul142@gmail.com', Location: 'Townhall', doneeType: 'Organization',  },
    { id: 2, postName: "Hasanuzzaman", donorName: 'hasan3434@gmail.com', Location: 'Maijdee', doneeType: 'Individual',  },
    { id: 3, postName: "Rohomat Ullah", donorName: 'rohomat52@gmail.com', Location: 'Chowmuhni', doneeType: 'All',  },
    { id: 4, postName: "Afif Hossain", donorName: 'hossain12@gmail.com', Location: 'Sonapur', doneeType: 'Individual',  },
    { id: 5, postName: "Mominul Haque", donorName: 'momin45@gmail.com', Location: 'Biswanath', doneeType: 'All',  },
    { id: 6, postName: "Sabbir Ahmed", donorName: 'sabbir2012@gmail.com', Location: 'Chowmuhni', doneeType: 'Organization',  },
    { id: 7, postName: "Afif Hossain", donorName: 'hossain12@gmail.com', Location: 'Townhall', doneeType: 'Individual', },
    { id: 8, postName: "Mominul Haque", donorName: 'momin45@gmail.com', Location: 'Maijdee', doneeType: 'Organization',  },
    { id: 9, postName: "Sabbir Ahmed", donorName: 'sabbir2012@gmail.com', Location: 'Sonapur', doneeType: 'Individual',  },
];

export default function DonationPostList() {
    const [queries, setQueries] = useState("");
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
                                    <li className="breadcrumb-item"><b>User</b></li>
                                    <li className="breadcrumb-item active" aria-current="page"><b>Food Donation List</b></li>
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
                        <section className="table__body">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="text-center"> Id </th>
                                        <th className="text-center"> Post </th>
                                        <th className="text-center"> Donor Name </th>
                                        <th className="text-center"> Location </th>
                                        <th className="text-center"> Donee Type </th>
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
                                        <tr key={order.id}>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.id}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle', fontSize: '17px' }}>{order.postName}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.donorName}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.Location}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.doneeType}</td>
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
