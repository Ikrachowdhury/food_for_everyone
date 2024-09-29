import { useState } from 'react';
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar';
const TableData = [
    { id: 2, postName: 'Post 2', postDate: '13/4/24', quantity: '10', status: 'Delivered', donee: 'Abc', location: 'Sonapur', deliveryData: '13/2/4', rating: '3' },
    { id: 3, postName: 'Post 3', postDate: '14/4/24', quantity: '10', status: 'Expired', donee: 'Defy', location: 'Maijdee', deliveryData: '13/2/4', rating: '5' },
    { id: 1, postName: 'Post 1', postDate: '12/4/24', quantity: '10', status: 'Canceled', donee: 'Ghizz', location: 'Biswanath', deliveryData: '13/2/4', rating: '1' },
    { id: 4, postName: 'Post 4', postDate: '15/4/24', quantity: '10', status: 'Delivered', donee: 'Jklmn', location: 'Garage', deliveryData: '13/2/4', rating: '4' },
    { id: 5, postName: 'Post 5', postDate: '16/4/24', quantity: '10', status: 'Delivered', donee: 'Opqr', location: 'Town Hall', deliveryData: '13/2/4', rating: '2' },
    { id: 6, postName: 'Post 6', postDate: '17/4/24', quantity: '10', status: 'Canceled', donee: 'Stuvwx', location: 'Rashid Colony', deliveryData: '13/2/4', rating: '3' },
]
export default function History() {
    const [queries, setQueries] = useState("");
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
                        <section className="table__body">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="min-w-100px text-center"> ID </th>
                                        <th className="min-w-100px text-center"> Post Name </th>
                                        <th className="min-w-100px text-center"> Post Date </th>
                                        <th className="min-w-100px text-center"> Serves </th>
                                        <th className="min-w-100px text-center"> Status </th>
                                        <th className="min-w-100px text-center"> Donee </th>
                                        <th className="min-w-100px text-center"> Location </th>
                                        <th className="min-w-100px text-center"> Delivery Date </th>
                                        <th className="min-w-100px text-center"> Rating </th>
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
                                            <td className="text-center" style={{ verticalAlign: 'middle', fontSize: '17px' }}>{order.postName}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.postDate}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.quantity}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.status}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.donee}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.location}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.deliveryData}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{order.rating}/5</td>
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
                    </main>
                </div>
            </div>
        </div>
    )
}