import Sidebar from '../../components/Sidebar'
// import image1 from "../../images/avatar.jpg"
import Navbar from '../../components/Navbar'
import { useEffect, useState } from 'react';
// const TableData = [
//     { id: 2, postName: 'Post 2', organizationName: 'Abc', description: 'lorem10', location: 'sonapur' },
//     { id: 3, postName: 'Post 3', organizationName: 'Defg', description: 'lorem10', location: 'sonapur' },
//     { id: 1, postName: 'Post 1', organizationName: 'Hijkl', description: 'lorem10', location: 'sonapur' },
//     { id: 4, postName: 'Post 4', organizationName: 'Mnop', description: 'lorem10', location: 'sonapur' },
//     { id: 5, postName: 'Post 5', organizationName: 'Qrs', description: 'lorem10', location: 'sonapur' },
//     { id: 6, postName: 'Post 6', organizationName: 'Tuvwx', description: 'lorem10', location: 'sonapur' },
// ]
export default function DirectDonation() {
    const [queries, setQueries] = useState("");
    const [organizationData, setorganizationData] = useState("")

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
                console.log(result)
                setorganizationData(result.combinedData)
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
                        {organizationData.length > 0 ? (
                            <section className="table__body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="min-w-100px text-center"> ID </th>
                                            <th className="min-w-100px text-center"> Organization Name </th>
                                            <th className="min-w-100px text-center"> Description </th>
                                            <th className="min-w-100px text-center"> Address </th>
                                            <th className="min-w-100px text-center"> Contact </th>
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
                                        }).map((order, index) => (
                                            <tr key={index} >
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{index+1}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.org_name}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.org_about}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.user.address}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}><button className="btn btn-outline-primary ">Message</button></td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}><button className="btn btn-outline-secondary">View info</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
