import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar';

export default function History() {
    const [queries, setQueries] = useState("");
    const [historyData, setHistoryData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                console.log(user_id)
                const response = await fetch(`http://localhost:8000/api/donorHistory/${user_id}`, {
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
                setHistoryData(result.donations)
                console.log(result.donations)
            } catch (error) {
                console.log(error)
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
                    <main className="table mt-5 table-row-gray-300">
                        <section className="table__header">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0 ms-4">
                                    <li className="breadcrumb-item"><b>Donation</b></li>
                                    <li className="breadcrumb-item active" aria-current="page"><b>History</b></li>
                                </ol>
                            </nav>
                            <div className="">
                                <input
                                    placeholder="Search"
                                    className="searchInput me-4" onChange={(e) => setQueries(e.target.value)}
                                />
                            </div>
                        </section>
                        {historyData.length > 0 ? (
                            <section className="table__body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="min-w-100px text-center"> ID </th>
                                            <th className="min-w-100px text-center"> Post Name </th>
                                            <th className="min-w-100px text-center"> Expire Date </th>
                                            <th className="min-w-100px text-center"> Serves </th>
                                            <th className="min-w-100px text-center"> Status </th>
                                            <th className="min-w-100px text-center"> Donee </th>
                                            <th className="min-w-100px text-center"> Location </th>
                                            <th className="min-w-100px text-center"> Rating </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {historyData.filter((data) => {
                                            const values = Object.values(data).flatMap(field => {
                                                if (typeof field === 'object' && field !== null) {
                                                    return Object.values(field).filter(innerField => typeof innerField === 'string');
                                                }
                                                return typeof field === 'string' ? field : [];
                                            });

                                            return values.some(field => field.toLowerCase().includes(queries.toLowerCase()));
                                        }).map((data, index) => (
                                            <tr key={data.donation_id}>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{index + 1}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle', fontSize: '17px' }}>{data.post_name}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.expiredate}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.serves}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.donee_info ? data.donee_info.accept_status : ''}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.donee_info ? data.donee_info.name : ''}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.pickup_location}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.donee_info ? data.donee_info.rating : ''}</td>
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
                                <div className="MainMessage">No  History</div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}