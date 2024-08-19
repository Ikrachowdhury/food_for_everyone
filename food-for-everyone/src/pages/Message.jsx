import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import "../assets/css/message.css"
import React, { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
const friendsData = [
    { id: 1, name: "Armanur Rashid", message: "Sonapur", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/real-terminator.png" },
    { id: 2, name: "Ikra Chowdhury", message: "Campus", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/real-terminator.png" },
    { id: 3, name: "Skynet", message: "Maijdee", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/real-terminator.png" },
    { id: 4, name: "Skynet", message: "Seen that canned piece of s?", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/real-terminator.png" },
    { id: 5, name: "Robo Cop", message: "Hey, you're arrested!", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg", time: "13:21" },
    { id: 6, name: "Termy", message: "I'm studying Spanish...", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/termy.jpg", time: "13:21" },
    { id: 7, name: "Richard", message: "I'm not sure...", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/rick.jpg", time: "13:21" },
    { id: 8, name: "XXXXX", message: "Hi, wanna see something?", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/rachel.jpeg", time: "13:21" },
    { id: 9, name: "Optimus", message: "Wanna grab a beer?", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/optimus-prime.jpeg", time: "00:32" },
    { id: 10, name: "Richard", message: "I'm not sure...", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/rick.jpg", time: "13:21" },
    { id: 11, name: "XXXXX", message: "Hi, wanna see something?", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/rachel.jpeg", time: "13:21" },
];
const chatFriendsData = [
    { id: 1, name: "Robo Cop", message: "Hey, you're arrested!", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg", time: "13:21" },
    { id: 2, name: "Optimus", message: "Wanna grab a beer?", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/optimus-prime.jpeg", time: "00:32" },
    { id: 3, name: "Skynet", message: "Seen that canned piece of s?", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/real-terminator.png", time: "13:21", },
    { id: 4, name: "Skynet", message: "Seen that canned piece of s?", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/real-terminator.png", time: "13:21" },
    { id: 5, name: "Skynet", message: "Seen that canned piece of s?", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/real-terminator.png", time: "13:21" },
    { id: 6, name: "Termy", message: "I'm studying Spanish...", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/termy.jpg", time: "13:21" },
    { id: 7, name: "Richard", message: "I'm not sure...", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/rick.jpg", time: "13:21" },
    { id: 8, name: "XXXXX", message: "Hi, wanna see something?", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/rachel.jpeg", time: "13:21" },
    { id: 9, name: "Termy", message: "I'm studying Spanish...", imageUrl: "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/termy.jpg", time: "13:21" },
];

export default function Message() {
    const [selectedButton, setSelectedButton] = useState('Donar');
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
                                        <div ><button type="button" className="btn listOption" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <HiDotsVertical />
                                        </button>
                                            <div className="modal fade" data-bs-backdrop="static" id="exampleModal" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-scrollable">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <div className='d-flex'>
                                                                <button
                                                                    className={`modal-title me-5 listOption ${selectedButton === 'Donor' ? 'text-primary' : 'text-muted'}`}
                                                                    id="staticBackdropLabel"
                                                                    onClick={() => setSelectedButton('Donor')}
                                                                >
                                                                    Donor
                                                                </button>
                                                                <button
                                                                    className={`modal-title listOption ${selectedButton === 'Rider' ? 'text-primary' : 'text-muted'}`}
                                                                    id="staticBackdropLabel"
                                                                    onClick={() => setSelectedButton('Rider')}
                                                                >
                                                                    Rider
                                                                </button>
                                                            </div>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            {friendsData.map(friend => (
                                                                <div key={friend.id} className="friend-drawer list-drawer--onhover">
                                                                    <img className="profile-image" src={friend.imageUrl} alt={`${friend.name}'s profile`} />
                                                                    <div className="text">
                                                                        <h6>{friend.name}</h6>
                                                                        <p className="text-muted">{friend.message}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {chatFriendsData.map(friend => (
                                        <React.Fragment key={friend.id}>
                                            <div className="friend-drawer friend-drawer--onhover">
                                                <img className="profile-image" src={friend.imageUrl} alt={`${friend.name}'s profile`} />
                                                <div className="text">
                                                    <h6>{friend.name}</h6>
                                                    <p className="text-muted">{friend.message}</p>
                                                </div>
                                                <span className="time text-muted small">{friend.time}</span>
                                            </div>
                                            <hr className='messageHR'/>
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className="col-md-8" style={{ height: '92vh', overflowY: 'auto', overflowX: "hidden" }}>
                                    <div className="settings-tray">
                                        <div className="friend-drawer no-gutters friend-drawer--grey">
                                            <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg" alt="" />
                                            <div className="text">
                                                <h6>Robo Cop</h6>
                                                <p className="text-muted">Layin down the law since like before Christ...</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-panel">
                                        <div className="row no-gutters">
                                            <div className="col-md-3">
                                                <div className="chat-bubble chat-bubble--left">
                                                    Hello dude!
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row no-gutters">
                                            <div className="col-md-3 offset-md-9">
                                                <div className="chat-bubble chat-bubble--right">
                                                    Hello dude!
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row no-gutters">
                                            <div className="col-md-3 offset-md-9">
                                                <div className="chat-bubble chat-bubble--right">
                                                    Hello dude!
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row no-gutters">
                                            <div className="col-md-3">
                                                <div className="chat-bubble chat-bubble--left">
                                                    Hello dude!
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row no-gutters">
                                            <div className="col-md-3">
                                                <div className="chat-bubble chat-bubble--left">
                                                    Hello dude!
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row no-gutters">
                                            <div className="col-md-3">
                                                <div className="chat-bubble chat-bubble--left">
                                                    Hello dude!
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row no-gutters">
                                            <div className="col-md-3">
                                                <div className="chat-bubble chat-bubble--left">
                                                    Hello dude!
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row no-gutters">
                                            <div className="col-md-3 offset-md-9">
                                                <div className="chat-bubble chat-bubble--right">
                                                    Hello dude!
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row no-gutters">
                                            <div className="col-md-3 offset-md-9">
                                                <div className="chat-bubble chat-bubble--right">
                                                    Hello dude!
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="chat-box-tray">
                                                    <input type="text" placeholder="Type your message here..." className='pl-3 messageInput' />
                                                    <button className='btn'>Send</button>
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
