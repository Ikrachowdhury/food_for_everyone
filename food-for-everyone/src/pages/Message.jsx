import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import "../assets/css/message.css"
import userImage from '../images/avatar.png'
// import { HiDotsVertical } from 'react-icons/hi';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { flushSync } from 'react-dom';
import selectchat from '../images/selectchat.png';
import { FaPhoneSquareAlt } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';

export default function Message() {
    const [profileData, setProfileData] = useState({});
    const [inboxes, setInboxes] = useState([]);
    const [chatHeadInfo, setChatHeadInfo] = useState({});
    const [inboxId, setInboxId] = useState(null);
    const [donationId, setDonationId] = useState(null);
    const [masgType, setMasgType] = useState(null);
    const [isChatHeadOpen, setIsChatHeadOpen] = useState(false);
    const [isIncomingChatHeadOpen, setIsIncomingChatHeadOpen] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    // const [usermsgarray, setUsermsgarray] = useState([]);
    const [replyId, seReplyId] = useState(0);
    const [msgHistory, setMsgHistory] = useState([]);
    const user_id = localStorage.getItem('user_id');
    const location = useLocation();
    const buttonRefs = useRef([]);
    // const [isMapFinished, setIsMapFinished] = useState(false); 

    //checks for incoming msg
    const incomingChatHead = async () => {
        if (location.state && Object.keys(location.state).length > 0) {
            if (location.state.donation_id || location.state.reciever_id) {
                console.log(location.state.donation_id)
                for (const inbox of Object.values(chatHeadInfo)) {
                    if (inbox.donation_info[0]?.donation_id === location.state.donation_id) {
                        setMainChatBoxInfo(inbox);
                        break;
                    }
                }
                setIsIncomingChatHeadOpen(true);
            }
        } else {
            console.log("location.state is empty or undefined");
        }
    };
    useEffect(() => {
        const autoClickHandler = async () => {
            let matchingButtonIndex = null;
            let targetDonationId = null;
            if (isIncomingChatHeadOpen && location.state?.donation_id) {
                // const targetDonationId = location.state.donation_id;
                if (location.state?.reciever_id) {
                    console.log("ok")
                    targetDonationId = location.state?.reciever_id;
                    matchingButtonIndex = Object.values(chatHeadInfo).findIndex(inbox =>
                        inbox.reciever_info[0]?.id === targetDonationId
                    );
                } else {
                    targetDonationId = location.state?.donation_id;
                    matchingButtonIndex = Object.values(chatHeadInfo).findIndex(inbox =>
                        inbox.donation_info[0]?.donation_id === targetDonationId
                    );
                }

                console.log(`Matching button index for ID ${targetDonationId}: ${matchingButtonIndex}`);
                if (matchingButtonIndex !== -1) {
                    if (buttonRefs.current[matchingButtonIndex]) {
                        buttonRefs.current[matchingButtonIndex].click();
                        console.log(`Auto-clicked the button for donation ID: ${targetDonationId}`);
                    } else {
                        console.warn(`Button ref not found for index: ${matchingButtonIndex}`);
                    }
                } else {
                    console.warn(`No matching button found for donation ID: ${targetDonationId}`);
                }
            }
        };

        autoClickHandler();
    }, [isIncomingChatHeadOpen, chatHeadInfo]);
    //get all iboxes for the user id 
    //then gets all chat head from every inbox
    useEffect(() => {
        const fetchInboxes = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/getAllInboxes/${user_id}`);
                const result = await response.json();
                console.log("result    " + result.inboxes);
                if (response.status === 200) {
                    setInboxes(result.inboxes);
                    if (result.inboxes.length > 0) {
                        console.log("inbox > 0");
                        fetchChatHeadInfoFromInboxes(result.inboxes);
                    }
                } else {
                    console.log("Failed to load inboxes");
                }
            } catch (error) {
                console.error("Error fetching inboxes:", error);
            }
        };
        const fetchChatHeadInfoFromInboxes = async (Inboxes) => {

            Inboxes.forEach(async (inbox) => {
                try {
                    let reciver_id = null;
                    if (inbox.reciever_id == user_id) {
                        reciver_id = inbox.doner_id
                        // console.log(reciver_id+" user to donor")
                    } else {
                        reciver_id = inbox.reciever_id
                        // console.log(reciver_id+"Donee")
                    }
                    // console.log("inbox id "+inbox.inbox_id  )
                    const response2 = await fetch(`http://localhost:8000/api/getChatHeaadInfo/${inbox.donation_id}/${reciver_id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                    });
                    const data = await response2.json();

                    setChatHeadInfo(prevState => ({
                        ...prevState,
                        [inbox.inbox_id]: {
                            ...data,
                            inbox_id: inbox.inbox_id,
                            masg_type: inbox.masg_type,
                        },
                    }));
                } catch (error) {
                    console.error("Error fetching chat head info:", error);
                }
            });

        }
        fetchInboxes();
        incomingChatHead();

    }, []);
    //user profile 
    useEffect(() => {
        const fetchProfile = async () => {
            const response2 = await fetch(`http://localhost:8000/api/profile/${user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            if (!response2.ok) {
                throw new Error('Network response was not ok');
            }
            const result2 = await response2.json();
            setProfileData(result2);
        }
        fetchProfile();
    }, []);
    //after clicking chathead sets the main chatbox
    const setMainChatBoxInfo = async (inbox) => {
        setMsgHistory([]);
        setInboxId(inbox.inbox_id);
        setDonationId(inbox.donation_info[0]?.donation_id);
        setMasgType(inbox.masg_type);
        setIsChatHeadOpen(true);

        await fetchMessageHistory(inbox.inbox_id);
    };
    useEffect(() => {
        if (isChatHeadOpen) {
        }
    }, [isChatHeadOpen]);
    const handleInputChange = (e) => {
        setUserMessage(e.target.value);
    };
    const handleSendClick = async (replyId) => {
        console.log('Message:', userMessage);
        if (userMessage.trim()) {

            const formData = new FormData();
            formData.append("inbox_id", inboxId);
            formData.append("reply_id", replyId);
            formData.append("user_id", user_id);
            formData.append("msg", userMessage);

            let response = await fetch("http://localhost:8000/api/sendMsg", {
                method: 'POST',
                body: formData,
                headers: {
                    "Accept": 'application/json'
                }
            });
            let result = await response.json();
            console.log("Result:", result);
            setUserMessage('');
        }
    };
    //get msg history every 5 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchNewMessages();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [inboxId]);
    const fetchNewMessages = async () => {
        if (inboxId) {
            try {
                const response = await fetch(`http://localhost:8000/api/getMsghistory/${inboxId}`);
                const result = await response.json();
                if (response.status === 200) {
                    setMsgHistory(result.msg_history);
                } else {
                    console.log("Failed to load message history");
                }
            } catch (error) {
                console.error("Error fetching message history:", error);
            }
        }
    };
    const fetchMessageHistory = async (inboxId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/getMsghistory/${inboxId}`);
            const result = await response.json();
            if (response.status === 200) {
                setMsgHistory(result.msg_history);
            } else {
                console.log("Failed to load message history");
            }
        } catch (error) {
            console.error("Error fetching message history:", error);
        }
    }
    return (
        <div>
            <Navbar />
            <div className="homePage d-flex">
                <Sidebar />
                <div className="main-content mt-5">
                    <div className="mt-2 ">
                        <div className="container">
                            <div className="row no-gutters">
                                <div className="col-md-4 border-right" style={{ height: '92vh', overflowY: 'auto' }}>
                                    <div className="settings-tray d-flex justify-content-between align-items-center">
                                        <div className='d-flex align-items-center'>
                                            <img className="profile-image" src={Object.keys(profileData).length > 0 ? profileData.user?.profile_img : userImage} alt="Profile img" />
                                            <h6 className='ms-2 mb-0 fw-bold'>{Object.keys(profileData).length > 0 ? profileData.user?.name : null}</h6>
                                        </div>
                                    </div>

                                    {Object.values(chatHeadInfo).map((inbox, index) => (
                                        <div key={index}>
                                            <div className="drawer-friend friend-drawer--onhover pb-0">
                                                <ul className="list-unstyled mb-0">
                                                    <li ref={(el) => (buttonRefs.current[index] = el)}
                                                        onClick={() => setMainChatBoxInfo(inbox)}
                                                        className="friend-drawer list-drawer--onhover d-flex align-items-center px-3 me-2 listItem"
                                                        style={{ cursor: 'pointer' }}>
                                                        <img className="profile-image" src={inbox.reciever_info[0]?.profile_img ? inbox.reciever_info[0].profile_img : userImage} alt={`${inbox.reciever_info[0]?.name}'s profile`} />
                                                        <div className="text d-flex flex-column justify-content-center" style={{ height: '100%' }}>
                                                            <h6 className='mx-1'>{inbox.reciever_info[0]?.user_type}: {inbox.reciever_info[0]?.name}</h6>
                                                            <h6 className="text-muted m-1">
                                                                {masgType === "onRun" ? inbox.donation_info[0]?.post_name : masgType}
                                                            </h6>

                                                        </div>
                                                    </li>
                                                </ul>


                                            </div>
                                            <hr className='messageHR' />
                                        </div>
                                    ))}
                                </div>
                                {/* start of Chat box section */}
                                {isChatHeadOpen || isIncomingChatHeadOpen ? (
                                    <div className="col-md-8" style={{ height: '92vh', display: 'flex', flexDirection: 'column' }}>
                                        <div className="settings-tray p-0" >
                                            {Object.values(chatHeadInfo).map((inbox, index) => (
                                                inbox.inbox_id == inboxId ? (
                                                    <div key={index} className="friend-drawer list-drawer--onhover d-flex align-items-center" style={{ backgroundColor: "#eee", width: "100%" }}>
                                                        <img className="profile-image" src={inbox.reciever_info[0]?.profile_img ? inbox.reciever_info[0].profile_img : userImage}  alt={`${inbox.reciever_info[0]?.name}'s profile`} />
                                                        <div className="text d-flex flex-column justify-content-center flex-grow-1" style={{ height: '100%' }}>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <h6 className='m-0'>{inbox.reciever_info[0]?.name}</h6>
                                                            </div>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <h6 className="text-muted m-0">
                                                                    {masgType === "onRun" ? inbox.donation_info[0]?.post_name : masgType}
                                                                </h6>
                                                                <h6 className="time text-muted m-1 me-3">
                                                                    <FaPhoneSquareAlt style={{ color: "green", fontSize: "1.5rem" }} /> {inbox.reciever_info[0]?.phone}
                                                                </h6>
                                                            </div>

                                                        </div>
                                                    </div>


                                                ) : null
                                            ))}
                                        </div>

                                        <div className="chat-panel" style={{ flex: '1', overflowY: 'auto', overflowX: 'hidden' }}>
                                            {msgHistory.map((msg, index) => (
                                                <div className="row no-gutters" key={index}>
                                                    <div className={`col-md-3 ${msg.msg_sender_id == user_id ? 'offset-md-9' : ''}`}>
                                                        <div className={`chat-bubble ${msg.msg_sender_id == user_id ? 'chat-bubble--right' : 'chat-bubble--left'}`}>
                                                            {msg.msg}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="chat-box-tray">
                                            <input
                                                type="text"
                                                placeholder="Type your message here..."
                                                className='pl-3 messageInput'
                                                value={userMessage}
                                                onChange={handleInputChange}
                                            />
                                            <button onClick={() => handleSendClick(replyId)}><IoSend style={{ fontSize: "1.8rem" }} /></button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="col-md-5 d-flex flex-column justify-content-center align-items-center" style={{ height: '95vh', marginLeft: "200px" }}>
                                        <div>
                                            <img src={selectchat} alt="" style={{ width: "auto", height: "400px" }} />
                                        </div>
                                        <div>
                                            <div><h1>Please select a chat</h1></div>
                                        </div>
                                        {/* <div className="number">Please select a chat</div> */}
                                    </div>
                                )}
                                {/* end */}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
