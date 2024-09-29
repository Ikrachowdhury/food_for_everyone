import './App.css'

import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from './pages/Home' 
import Message from './pages/Message'
// import DonerRegistration from './components/DonerRegistration'
// import ReceiverDashboard from './pages/Receiver/ReceiverDashboard'
// import DonorDashboard from './pages/Donor/DonorDashboard'
// import NewDonation from './pages/Donor/NewDonation'
import Achievement from './pages/Donor/Achievement'
import RequestedDonation from './pages/Donor/RequestedDonation'
import DirectDonation from './pages/Donor/DirectDonation'
import DonateMoney from './pages/Donor/DonateMoney'
import History from './pages/Donor/History'
import { Login } from './components/Login'
// import { DonerRegistration } from './components/DonerRegistration'
import GetFoodOption from './components/GetFoodOption'
import { IndividualRegistration } from './components/IndividualRegistration'
import { OraganizationRegistration } from './components/OrganizationRegistration'
import FoodCart from './pages/Receiver/FoodCart'
import ReceiverHistory from './pages/Receiver/ReceiverHistory'
import ReceivedDonatinon from './pages/Receiver/ReceivedDonation'
import Profile from './pages/Profile' 
// import RequestedDelivery from './pages/Volunteer/RequestedDelivery'
// import RunningDelivery from './pages/Volunteer/RunningDelivery'
// import DonorList from './pages/Admin/DonorList'
import DoneeList from './pages/Admin/DoneeList'
import OrganizationList from './pages/Admin/OrganizationList'
import RiderList from './pages/Admin/RiderList'
// import DonationPostList from './pages/Admin/DonationPostList'
// import PaymentMoneyList from './pages/Admin/PaymentMoneyList'
import Dashboard from './pages/Donor/Dashboard'
import AddNewDonation from './pages/Donor/AddNewDonation'
import ReceiverDashboard from './pages/Receiver/ReceiverDashboard'
import RiderDashboard from './pages/Volunteer/RiderDashboard'
import ForgetPassword from './components/ForgetPassword'
import { AdminLogin } from './pages/Admin/AdminLogin'
// import DonorDashboard from './pages/Donor/DonorDashboard'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/home" exact element={<Home />}></Route>
          <Route path='/login' exact element={<Login />}></Route>
          <Route path='/adminLogin' exact element={<AdminLogin />}></Route>
          <Route path='/individualRegistration' exact element={<IndividualRegistration />}></Route>
          <Route path='/organizationRegistration' exact element={<OraganizationRegistration />}></Route>
          {/* <Route path='/donerRegistration' exact element={<DonerRegistration />}></Route> */}
          <Route path='/getFoodOption' exact element={<GetFoodOption />}></Route>
          {/* <Route path='/receiverDashboard' exact element={<ReceiverDashboard />}></Route> */}
          {/* <Route path='/donorDashboard' exact element={<DonorDashboard />}></Route> */}
          {/* <Route path='/newDonation' exact element={<NewDonation />}></Route> */}
          <Route path='/achievement' exact element={<Achievement />}></Route>
          <Route path='/requestedDonation' exact element={<RequestedDonation />}></Route>
          <Route path='/directDonation' exact element={<DirectDonation />}></Route>
          <Route path='/donateMoney' exact element={<DonateMoney />}></Route>
          <Route path='/history' exact element={<History />}></Route>
          <Route path='/foodCart' exact element={<FoodCart />}></Route>
          <Route path='/doneeHistory' exact element={<ReceiverHistory />}></Route>
          <Route path='/receivedDonation' exact element={<ReceivedDonatinon />}></Route>
          <Route path='/profile' exact element={<Profile />}></Route> 
          <Route path='/message' exact element={<Message />}></Route>
          <Route path='/history' exact element={<History />}></Route>
          {/* <Route path='/requestedDelivery' exact element={<RequestedDelivery />}></Route> */}
          {/* <Route path='/runningDelivery' exact element={<RunningDelivery />}></Route> */}
          {/* <Route path='/donorList' exact element={<DonorList />}></Route> */}
          <Route path='/doneeList' exact element={<DoneeList />}></Route>
          <Route path='/organizationList' exact element={<OrganizationList />}></Route>
          <Route path='/riderList' exact element={<RiderList />}></Route>
          {/* <Route path='/donationPostList' exact element={<DonationPostList />}></Route> */}
          {/* <Route path='/paymentMoneyList' exact element={<PaymentMoneyList />}></Route> */}
          <Route path='/dashboard' exact element={<Dashboard />}></Route>
          <Route path='/receiverDashboard' exact element={<ReceiverDashboard />}></Route>
          <Route path='/addNewDonation' exact element={<AddNewDonation />}></Route>
          <Route path='/riderDashboard' exact element={<RiderDashboard />}></Route>
          <Route path='/forgetPassword' exact element={<ForgetPassword />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
