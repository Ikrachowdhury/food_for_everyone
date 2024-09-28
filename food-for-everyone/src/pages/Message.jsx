import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import "../assets/css/message.css" 
import { HiDotsVertical } from 'react-icons/hi';
import { useEffect, useState } from 'react';
const friendsData = [ 
    { id: 2, name: "Ikra Chowdhury", message: "Campus", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/real-terminator.png" },
    
]; 

export default function Message() { 
    const [inboxes, setInboxes] = useState([]); 
    const [chatHeadInfo, setChatHeadInfo] = useState({}); 
    const [inboxId, setInboxId] = useState(null); 
    const [donationId, setDonationId] = useState(null);
    const [masgType, setMasgType] = useState(null);
    const [isChatHeadOpen, setIsChatHeadOpen] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [usermsgarray, setUsermsgarray] = useState([]);
    const [replyId, seReplyId] = useState(0);
    const [msgHistory, setMsgHistory] = useState([]);
    const user_id = localStorage.getItem('user_id');


    useEffect(() => {
        const fetchInboxes = async () => {
            try {
                 
                const response = await fetch(`http://localhost:8000/api/getAllInboxes/${user_id}`); // Replace 8 
                const result = await response.json();

                if (response.status === 200) {
                    setInboxes(result.inboxes);  
                } else {
                    console.log("Failed to load inboxes");
                }
                // if (inboxes.length > 0) {
                //     inboxes.forEach(async (inbox) => {
                //         try {
                //             const response2 = await fetch(`http://localhost:8000/api/getChatHeaadInfo/${inbox.donation_id}/${inbox.reciever_id}`, {
                //                 method: 'GET',
                //                 headers: {
                //                     'Content-Type': 'application/json',
                //                     'Accept': 'application/json',
                //                 },
                //             });
                //             const data = await response2.json();
                //             console.log(data.reciever_info);
        
                //             // Update chatHeadInfo with the inbox_id as the key
                //             setChatHeadInfo(data.reciever_info)
                //         } catch (error) {
                //             console.error("Error fetching chat head info:", error);
                //         }
                //     });
                // }
                // console.log(chatHeadInfo);
            } catch (error) {
                console.error("Error fetching inboxes:", error);
            }
        }; 
        fetchInboxes();
 
    }, []);
    
    useEffect(() => {
        const fetchChatHeadInfoFromInboxes = async () => {
            if (inboxes.length > 0) {
                inboxes.forEach(async (inbox) => {
                    try {
                        const response2 = await fetch(`http://localhost:8000/api/getChatHeaadInfo/${inbox.donation_id}/${inbox.reciever_id}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                            },
                        });
                        const data = await response2.json();
                        // console.log(data.reciever_info);
    
                        // Update chatHeadInfo with the inbox_id as the key 
                        setChatHeadInfo(prevState => ({
                            ...prevState,
                            [inbox.inbox_id]: {
                                ...data,  // Add the fetched data (e.g., reciever_info)
                                inbox_id: inbox.inbox_id  // Add the donation_id
                            },
                        }));
                    } catch (error) {
                        console.error("Error fetching chat head info:", error);
                    }
                });
            }
          
        } 
        fetchChatHeadInfoFromInboxes();
    }, [inboxes]);

    const setMainChatBoxInfo = async (inbox) => {
        setInboxId(inbox.inbox_id);
        setDonationId(inbox.donation_info[0]?.donation_id)
        setMsgHistory([]);
        await fetchMessageHistory(inbox.inbox_id);

        setIsChatHeadOpen(true)
          
    }
    useEffect(() => {  
        //Changes in main chat box info when button clicked       
    }, [isChatHeadOpen]);
 
  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
  };
 
  const handleSendClick = async (replyId) => {
    console.log('Message:', userMessage);
    if (userMessage.trim()) {  
        setUsermsgarray((prevMessages) => [...prevMessages, userMessage]);
        setUserMessage('');

        const formData = new FormData(); 
                formData.append("inbox_id",inboxId); 
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
                    <div className="mt-3">
                        <div className="container">
                            <div className="row no-gutters">
                                <div className="col-md-4 border-right" style={{ height: '92vh', overflowY: 'auto' }}>
                                    <div className="settings-tray d-flex justify-content-between align-items-center">
                                        <div className='d-flex align-items-center'>
                                            <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/filip.jpg" alt="Profile img" />
                                            <h6 className='ms-2 mb-0 fw-bold'>Armanur Rashid</h6>
                                            </div>
                                        
                                    </div>
                                    
                                    {Object.values(chatHeadInfo).map((inbox, index) => ( 

                                        <div key={index}>
                                            <div className="friend-drawer friend-drawer--onhover">
                                                {/* <img className="profile-image" src={friend.imageUrl} alt={`${friend.name}'s profile`} /> */}
                                                <button  onClick={() => setMainChatBoxInfo(inbox)}>
                                                <div className="text">
                                                    <h6>{inbox.reciever_info[0]?.user_type}:{inbox.reciever_info[0]?.name}</h6>
                                                    <p className="text-muted">{inbox.donation_info[0]?.post_name}</p>
                                                </div>
                                                <span className="time text-muted small">{inbox.reciever_info[0]?.phone}</span>
                                                </button>
                                            </div>
                                            <hr className='messageHR'/>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-md-8" style={{ height: '92vh', overflowY: 'auto', overflowX: "hidden" }}>
                                    <div className="settings-tray">
                                    {isChatHeadOpen ? (
                               Object.values(chatHeadInfo).map((inbox,index )=> (
                                inbox.donation_info[0]?.donation_id === donationId ? (  
                                <div key={index} className="friend-drawer list-drawer--onhover">
                                    <img className="profile-image" src={inbox.donation_info[0]?.profile_photo_url} alt={`${inbox.reciever_info[0]?.name}'s profile`} />
                                    <div className="text">
                                        <h6>{inbox.reciever_info[0]?.name}</h6>
                                        <p className="text-muted">{inbox.donation_info[0]?.post_name}</p>
                                    </div>
                                </div>):null
                            ))
                        ) : (
                            <p>No Chat is Selected</p> // Optional fallback when no inboxId is present
                        )}

                        
                                        
                                    </div>
                                    <div className="row no-gutters">
        <div className="col-md-3">
          <div className="chat-bubble chat-bubble--left">
            Hello dude!
          </div>
        </div>
      </div> 
                                    <div className="chat-panel">
                                    {msgHistory.map((msg, index) => (
        <div className="row no-gutters" key={index}>
            <div className={`col-md-3 ${msg.msg_sender_id == user_id ? 'offset-md-9' : ''}`}>
                <div className={`chat-bubble ${msg.msg_sender_id == user_id ? 'chat-bubble--right' : 'chat-bubble--left'}`}>
                    {msg.msg}
                </div>
            </div>
        </div>
    ))}
                                    {usermsgarray.map((msg, index) => (
        <div className="row no-gutters" key={index}>
          <div className="col-md-3 offset-md-9">
            <div className="chat-bubble chat-bubble--right">
              {msg}
            </div>
          </div>
        </div>
      ))}
                                  
                                       
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="chat-box-tray">
                                                    <input type="text" placeholder="Type your message here..." className='pl-3 messageInput'value={userMessage} onChange={handleInputChange} />
                                                    <button className='btn' onClick={() => handleSendClick(replyId)}>Send</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
