import { useState, useEffect } from 'react';
import '../assets/css/sidebar.css';
import { useNavigate } from 'react-router-dom';
import { MdDashboard, MdFastfood, MdMessage, MdOutlineDirectionsBike } from "react-icons/md";
import { BiSolidDonateHeart, BiSolidReport } from 'react-icons/bi';
import { GiAchievement, GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { CiSquareQuestion } from 'react-icons/ci';
import { FcMoneyTransfer, FcMultipleInputs } from 'react-icons/fc';
import {  FaHistory, FaUsers } from 'react-icons/fa';
// import { IoIosArrowDown } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { TiArrowSortedDown } from 'react-icons/ti';
import { RiUserReceived2Fill } from 'react-icons/ri';
import { GrOrganization } from 'react-icons/gr';

export default function Sidebar() {
  const isOpen = useSelector(state => state.isOpen);
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const logout = () => {
    localStorage.clear(); 
    sessionStorage.clear(); 
    navigate('/home', { replace: true }); 
  };
  
  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    if (!userToken || userToken === "null") {
      navigate('/home'); 
    }
  }, [navigate]);

  useEffect(() => {
    const valueFromLocalStorage = localStorage.getItem('user_type');
    if (valueFromLocalStorage) {
      setValue(valueFromLocalStorage);
    }
  }, []);

  return (
    <>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul className="nav-list">
          {value === 'donor' ? (
            <>
              <li>
                <div onClick={() => navigate('/dashboard')} className='listDiv'>
                  <MdDashboard className='icons' style={{ color: "#004f83" }} />
                  <span className="link_name" >Dashboard</span>
                </div>
              </li>
              <li>
                <div onClick={() => navigate('/addNewDonation')} className='listDiv'>
                  <BiSolidDonateHeart className='icons' style={{ color: "#004f83" }} />
                  <span className="link_name">New Donation</span>
                </div>
              </li>
              <li>
                <div onClick={() => navigate('/achievement')} className='listDiv'>
                  <GiAchievement className='icons' style={{ color: "green" }} />
                  <span className="link_name">Achievement</span>
                </div>
              </li>
              <li>
                <div onClick={() => navigate('/message')} className='listDiv'>
                  <MdMessage className='icons' style={{ color: "#841B2D" }} />
                  <span className="link_name">Message</span>
                </div>
              </li>
              {/* <li>
                <div className='listDiv collapsed has-dropdown' data-bs-toggle="collapse" data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                  <MdMessage className='icons' style={{ color: "#841B2D" }} />
                  <div>
                    <span className="link_name">Message </span>
                    <span className="link_name"><IoIosArrowDown /></span>
                  </div>
                </div>
                <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                  <li>
                    <div onClick={() => navigate('/message')} className='listDiv'>
                      <CiSquareQuestion className='icons' style={{ color: "red" }} />
                      <span className="link_name">Request</span>
                    </div>
                  </li>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">Rider</a>
                  </li>
                </ul>
              </li> */}
              <li>
                <div onClick={() => navigate('/requestedDonation')} className='listDiv'>
                  <CiSquareQuestion className='icons' style={{ color: "red" }} />
                  <span className="link_name">Request</span>
                </div>
              </li>
              <li>
                <div onClick={() => navigate('/directDonation')} className='listDiv'>
                  <GiPayMoney className='icons' style={{ color: "red" }} />
                  <span className="link_name">Direct Donation</span>
                </div>
              </li>
              <li>
                <div onClick={() => navigate('/donateMoney')} className='listDiv'>
                  <FcMoneyTransfer className='icons' />
                  <span className="link_name">Donate Money</span>
                </div>
              </li>
              {/* <li>
                <div onClick={() => navigate('/history')} className='listDiv'>
                  <FaHistory className='icons' style={{ color: "yellow" }} />
                  <span className="link_name">History</span>
                </div>
              </li> */}
            </>
          ) : value === 'donee' ? (
            <>
              <li>
                <div onClick={() => navigate('/receiverDashboard')} className='listDiv'>
                  <MdDashboard className='icons' style={{ color: "#004f83" }} />
                  <span className="link_name" >Dashboard</span>
                </div>
              </li>
              <li>
                <div onClick={() => navigate('/foodCart')} className='listDiv'>
                  <MdFastfood className='icons' style={{ color: "red" }} />
                  <span className="link_name">Food Cart</span>
                </div>
              </li>
              <li>
                <div onClick={() => navigate('/receivedDonation')} className='listDiv'>
                  <GiReceiveMoney className='icons' style={{ color: "green" }} />
                  <span className="link_name">Received Donation</span>
                </div>
              </li>
              <li>
                <div className='listDiv collapsed has-dropdown' data-bs-toggle="collapse" data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                  <MdMessage className='icons' style={{ color: "#841B2D" }} />
                  <div>
                    <span className="link_name ">Message </span>
                    <span className="link_name"><TiArrowSortedDown /></span>
                  </div>
                </div>
                <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                  <li>
                    <div onClick={() => navigate('/requestedDonation')} className='sublistDiv listDiv'>
                      <FaUsers className='icons' style={{ color: "red" }} />
                      <span className="link_namee">Donor</span>
                    </div>
                  </li>
                  <li>
                    <div onClick={() => navigate('/requestedDonation')} className='sublistDiv listDiv'>
                      <MdOutlineDirectionsBike className='icons' style={{ color: "blue" }} />
                      <span className="link_namee">Rider</span>
                      {/* <a href="#" className='link_name'>Request</a> */}
                    </div>
                  </li>
                </ul>
              </li>
            </>
          ) : value === 'rider' ? (
            <>
              <li>
                <div onClick={() => navigate('/riderDashboard')} className='listDiv'>
                  <FcMultipleInputs className='icons' style={{ color: "red" }} />
                  <span className="link_name">Dashboard</span>
                </div>
              </li>
              {/* <li>
                <div onClick={() => navigate('/runningDelivery')} className='listDiv'>
                  <FaRunning className='icons' style={{ color: "green" }} />
                  <span className="link_name">Running Delivery</span>
                </div>
              </li> */}
              <li>
                <div onClick={() => navigate('/message')} className='listDiv'>
                  <MdMessage className='icons' style={{ color: "#841B2D" }} />
                  <span className="link_name">Message</span>
                </div>
              </li>
            </>
          ) : null}
          {value === 'Donor' || value === 'Rider' ? (
            <>
              <li>
                <div onClick={() => navigate('/history')} className='listDiv'>
                  <FaHistory className='icons' style={{ color: "yellow" }} />
                  <span className="link_name">History</span>
                </div>
              </li>
            </>
          ) : null}
          {value === 'Admin' ? (
            <>
              {/* <li>
                <div onClick={() => navigate('/donorList')} className='listDiv'>
                  <MdSendAndArchive className='icons' style={{ color: "blue" }} />
                  <span className="link_name">Donors</span>
                </div>
              </li> */}
              <li>
                <div onClick={() => navigate('/doneeList')} className='listDiv'>
                  <RiUserReceived2Fill className='icons' style={{ color: "red" }} />
                  <span className="link_name">Organizations</span>
                </div>
              </li>
              <li>
                <div onClick={() => navigate('/organizationList')} className='listDiv'>
                  <GrOrganization className='icons' style={{ color: "pink" }} />
                  <span className="link_name">Request</span>
                </div>
              </li>
              <li>
                <div onClick={() => navigate('/riderList')} className='listDiv'>
                  <MdOutlineDirectionsBike className='icons' style={{ color: "black" }} />
                  <span className="link_name">Riders</span>
                </div>
              </li>
              <li>
                <div onClick={() => navigate('/riderList')} className='listDiv'>
                  <BiSolidReport  className='icons' style={{ color: "black" }} />
                  <span className="link_name">Reports</span>
                </div>
              </li>
              {/* <li>
                <div onClick={() => navigate('/donationPostList')} className='listDiv'>
                  <FaClipboardList className='icons' style={{ color: "violet" }} />
                  <span className="link_name">Food Donations</span>
                </div>
              </li> */}
              {/* <li>
                <div onClick={() => navigate('/paymentMoneyList')} className='listDiv'>
                  <GiTakeMyMoney className='icons' style={{ color: "green" }} />
                  <span className="link_name">Money Donations</span>
                </div>
              </li> */}
            </>
          ) : null}
          <li className="profile">
            <div className="profile_details">
              <div className="profile_content">
                <div className="name"><b>Armanur Rashid</b></div>
                <div className="designation"><b>{value}</b></div>
              </div>
            </div>
            <div onClick={logout}>
              <i className="bx bx-log-out" id="log_out"></i>
            </div>
          </li>
        </ul>
      </div >
    </>
  );
}
