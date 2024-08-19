import Sidebar from '../../components/Sidebar'
import "../../assets/css/RequestedDonation.css"
import image1 from "../../images/avatar.jpg"
import Navbar from '../../components/Navbar'
import { useState } from 'react'
const TableData = [
    { id: 1, ProviderName: "Abdul karim", ProviderNumber: '01875560705', ProviderLocation: 'Sonapur', ReceiverName: 'Hasan Mahmud', ReceiverNumber: '01993424334', ReceiverLocation: 'Townhall', DeliveryTime: '9:00AM - 5:00PM' },
    { id: 2, ProviderName: "Hasanuzzaman", ProviderNumber: '01735255342', ProviderLocation: 'Maijdee', ReceiverName: 'Mominul Haque', ReceiverNumber: '01772294342', ReceiverLocation: 'Campus', DeliveryTime: '9:00AM - 5:00PM' },
    { id: 3, ProviderName: "Rohomat Ullah", ProviderNumber: '01834276324', ProviderLocation: 'Townhall', ReceiverName: 'Afif Hossain', ReceiverNumber: '01735255342', ReceiverLocation: 'Maijdee Bazar', DeliveryTime: '9:00AM - 5:00PM' },
    { id: 4, ProviderName: "Tamim Iqbal", ProviderNumber: '01742971432', ProviderLocation: 'Campus', ReceiverName: 'Hannan Kashem', ReceiverNumber: '01875560705', ReceiverLocation: 'Sonapur', DeliveryTime: '9:00AM - 5:00PM' },
    { id: 5, ProviderName: "Mushfiqur Rahim", ProviderNumber: '01772294342', ProviderLocation: 'Chowmuhni', ReceiverName: 'Towhid Hridoy', ReceiverNumber: '01834276324', ReceiverLocation: 'Maijdee', DeliveryTime: '9:00AM - 5:00PM' },
    { id: 6, ProviderName: "Sabbir Ahmed", ProviderNumber: '01993424334', ProviderLocation: 'Maijdee Bazar', ReceiverName: 'Taskin Ahmed', ReceiverNumber: '01742971432', ReceiverLocation: 'Chowmuhni', DeliveryTime: '9:00AM - 5:00PM' },
]
export default function VolunteerDashboard() {

    const [queries, setQueries] = useState("");
    const [entriesPage, setEntriesPage] = useState(5);
    const [runningCurrentPages, setRunningCurrentPages] = useState(1);
    const totalRunningPage = Math.ceil(TableData.length / entriesPage);

    const handleRunningPageChange = (newPage) => {
        setRunningCurrentPages(newPage);
    };

    const handleRunningNextPage = () => {
        if (runningCurrentPages < totalRunningPage) {
            handleRunningPageChange(runningCurrentPages + 1);
        }
    };

    const handleRunningPrevPage = () => {
        if (runningCurrentPages > 1) {
            handleRunningPageChange(runningCurrentPages - 1);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="homePage d-flex">
                <Sidebar />
                <div className="main-content mt-5">

                    <div >
                        <div className="text-center mx-5 mb-4 mt-5">
                            <h2 className="fw-bold">Running Delivery</h2>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <div className="mt-2 d-flex align-items-center">
                                <h5 className="mb-0 mb-2">Show </h5>
                                <select
                                    className="form-select mx-2"
                                    onChange={(e) => setEntriesPage(parseInt(e.target.value))}
                                    value={entriesPage}
                                    style={{ flex: '1', fontWeight: "bold" }}
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                </select>
                                <h5 className="mb-2">entries </h5>
                            </div>
                            <div className="me-5">
                                <input
                                    placeholder="Search"
                                    className="searchInput me-4" onChange={(e) => setQueries(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="table-responsive mt-4 mb-3 ps-1 pe-4">
                            <table className="table table-hover table-row-gray-300 align-middle gs-0 gy-4">
                                <thead>
                                    <tr className="fw-bold text-muted TableHead" >
                                        <th className="min-w-100px text-center" style={{ verticalAlign: 'middle' }}> Post</th>
                                        <th className="min-w-100px text-center" > Provider Name </th>
                                        <th className="min-w-100px text-center"> Provider Number </th>
                                        <th className="min-w-100px text-center"> Provider Location </th>
                                        <th className="min-w-100px text-center"> Receiver Name </th>
                                        <th className="min-w-100px text-center"> Receiver Number </th>
                                        <th className="min-w-100px text-center"> Receiver Location </th>
                                        <th className="min-w-100px text-center"> Delivery Time</th>
                                        <th className="min-w-100px text-center" style={{ verticalAlign: 'middle' }}> Contact </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TableData.slice((runningCurrentPages - 1) * entriesPage, runningCurrentPages * entriesPage).filter((user) =>
                                        Object.values(user).some(
                                            (field) =>
                                                typeof field === 'string' && field.toLowerCase().includes(queries.toLowerCase())
                                        )
                                    ).slice(0, entriesPage).map((data) => (
                                        <tr key={data.id} style={{ height: "50px" }}>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}><img src={image1} alt="" height={40} width={40} /></td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.ProviderName}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.ProviderNumber}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.ProviderLocation}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.ReceiverName}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.ReceiverNumber}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.ReceiverLocation}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{data.DeliveryTime}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}><button className="btn btn-outline-secondary">Donee</button></td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='d-flex justify-content-end mb-2' >
                            {totalRunningPage > 1 ?
                                <ul className="pagination" >
                                    <li className={`page-item ${runningCurrentPages === 1 ? 'disabled' : ''}`}>
                                        <a className={`page-link px-3 py-2 ${runningCurrentPages === 1 ? 'text-secondary fw-bold' : 'text-success fw-bold'}`} href="#" tabIndex="-1" onClick={handleRunningPrevPage}>{'Prev'}</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link px-3 py-2 text-success" href="#">{runningCurrentPages} of {totalRunningPage} <span className="sr-only">(current)</span></a>
                                    </li>
                                    <li className={`page-item ${runningCurrentPages >= totalRunningPage ? 'disabled' : ''}`}>
                                        <a className={`page-link px-3 py-2 ${runningCurrentPages >= totalRunningPage ? 'text-secondary fw-bold' : 'text-success fw-bold'}`} href="#" onClick={handleRunningNextPage}>{'Next'}</a>
                                    </li>
                                </ul> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
