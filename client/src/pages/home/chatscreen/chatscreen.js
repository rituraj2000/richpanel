import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBarsProgress,
  faChartBar,
  faCoffee,
  faComment,
  faEnvelope,
  faPhone,
  faSignOut,
  faSync,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { axiosInstance } from "../../../apicalls/axiosInst";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ChatScreen = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState(""); // New state for holding the input text
  const [chatList, setChatList] = useState([]);
  const [psid, setPsid] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const page = useSelector((state) => state.page);
  const moment = require("moment");
  const [activeUser, setActiveUser] = useState({
    name: " ",
    email: " ",
    picture: "https://randomuser.me/api/portraits/men/23.jpg",
  });
  const chatContainerRef = useRef(null);
  const fullName = activeUser.name;
  const [firstName, lastName] = fullName.split(" ");

  const sendMessage = async (psid, msg) => {
    try {
      const response = await axiosInstance.post(
        `https://graph.facebook.com/v17.0/${page.value.page_id}/messages?recipient={id:${psid}}&message={text:'${msg}'}&messaging_type=RESPONSE&access_token=${page.value.page_accessToken}`
      );

      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const transformData = (response) => {
    const data = response.data.data; // Assume this is an array containing your conversations
    const result = [];

    for (const conversation of data) {
      const conversationId = conversation.id;
      // // Sort the messages by created_time
      const sortedMessages = conversation.messages.data.sort(
        (a, b) => new Date(a.created_time) - new Date(b.created_time)
      );
      let startTime = moment(sortedMessages[0].created_time);
      let endTime = startTime.clone();

      for (let i = 1; i < sortedMessages.length; i++) {
        const currentTime = moment(sortedMessages[i].created_time);
        const diffHours = currentTime.diff(endTime, "hours");
        //console.log(sortedMessages[i]);
        if (diffHours <= 2) {
          endTime = currentTime;
        } else {
          result.push({
            chat_id: conversationId,
            start_time: startTime,
            end_time: endTime,
          });

          startTime = currentTime;
          endTime = currentTime;
        }
      }

      result.push({
        chat_id: conversationId,
        start_time: startTime,
        end_time: endTime,
      });
    }

    // // Sort by end_time
    // result.sort((a, b) => new Date(a.end_time) - new Date(b.end_time));

    // console.log(result);
  };

  const getMessages = async () => {
    try {
      const response = await axiosInstance.get(
        `https://graph.facebook.com/v17.0/${page.value.page_id}/conversations?fields=participants,messages{id,message,from,created_time}&access_token=${page.value.page_accessToken}`
      );

      console.log(response);
      // transformData(response);

      setChatList(response.data.data);

      setPsid(response.data.data[0].participants.data[0].id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

    // Authorization
    const token = localStorage.getItem("token");
    if (!token || user.value.userId === null) {
      navigate("/"); // Redirect to login if token or user is missing
      toast.error("Authorization Failed!");
      return;
    }

    const fetchData = async () => {
      await getMessages();
    };

    fetchData();

    // Set up an interval to fetch new messages every 5 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000); // 5 seconds

    // Clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, [chatList, selectedChat]);

  return (
    <div className=" h-screen w-full flex">
      {/* Sections 1 */}
      <div className="h-screen bg-[#004E96] flex flex-col items-center justify-start py-20">
        <button className="bg-white w-full h-20 font-thin">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="text-[#004E96] text-2xl"
          />
        </button>
        <button className="bg-[#004E96] w-full h-20 font-thin text-gray-50">
          <FontAwesomeIcon icon={faUsers} className="text-white text-2xl" />
        </button>
        <button className="bg-[#004E96]-700 w-full h-20 font-thin text-gray-50">
          <FontAwesomeIcon
            icon={faBarsProgress}
            className="text-white text-2xl"
          />
        </button>

        <div className=" mx-3 relative mt-auto bg-[#004E96] rounded-full w-12 h-12 bg-cover bg-center border-4 border-white overflow-hidden">
          <img
            src={`${user && user.value.picture}`}
            alt="Description"
            class="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"></div>
        </div>

        <button
          className="bg-[#004E96] w-full h-20 font-thin text-gray-50"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
            return;
          }}
        >
          <FontAwesomeIcon icon={faSignOut} className="text-white text-2xl" />
          <h1 className=" text-sm font-bold">Logout</h1>
        </button>
      </div>

      {/* Section 2 */}
      <div className="w-2/12 h-screen bg-white border-slate-100 overflow-y-auto">
        <div className="p-4 flex items-center h-16">
          <FontAwesomeIcon icon={faBars} className=" text-slate-400 text-sm" />
          <div className=" w-1/12"></div>
          <h1 className="font-bold text-xl text-slate-700">Conversations</h1>
          <div className=" w-1/6"></div>
          <FontAwesomeIcon icon={faSync} className=" text-slate-400 text-sm" />
        </div>
        {console.log(chatList)}
        {chatList.map((chat, index) => {
          return (
            <div
              key={index}
              className="text-slate-700 p-4 cursor-pointer border-slate-200 border bg-white hover:bg-slate-200 flex flex-col justify-between items-start"
              onClick={() => {
                setSelectedChat(chat.id);
                setActiveUser(chat.participants.data[0]);
              }}
            >
              {/* Checkbox and Sender details in a column */}
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <div className="flex flex-col">
                  <div className="font-bold text-sm">
                    {chat.participants.data[0].name}
                  </div>
                  <div className="text-xs font-medium text-slate-500">
                    Facebook DM
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start text-xs mt-2">
                <div className="font-bold text-sm">
                  {chat.messages.data[chat.messages.data.length - 1].message}
                </div>
                <div className="text-xs font-medium text-slate-500">
                  {chat.messages.data[0].message}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section 3 */}
      <div className="w-7/12 h-screen bg-slate-100 overflow-y-auto flex flex-col justify-between">
        <div className="p-4 border border-slate-200 bg-white h-16">
          <h1 className="font-bold text-2xl text-slate-700">
            {activeUser.name}
          </h1>
        </div>
        <div
          className="h-4/6 py-16 px-6 overflow-y-auto"
          ref={chatContainerRef}
        >
          {selectedChat
            ? chatList
                .filter((chat) => chat.id === selectedChat)
                .map((filteredChat) =>
                  filteredChat.messages.data
                    .slice(0)
                    .reverse()
                    .map((messageObj, idx) => {
                      return (
                        <div
                          className={`flex items-center ${
                            messageObj.from.name !== user.value.name
                              ? " flex-row-reverse justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div className="overflow-hidden w-7 h-7 rounded-full bg-slate-400 flex items-center justify-center border-2 border-slate-500">
                            <img
                              src={`${
                                messageObj.from.name === user.value.name
                                  ? "https://randomuser.me/api/portraits/men/58.jpg"
                                  : user.value.picture
                              }`}
                              alt="Description"
                              class="w-full h-full object-cover"
                            />
                          </div>
                          <div
                            className={`${
                              messageObj.from.name !== user.value.name
                                ? " ml-auto"
                                : ""
                            } mb-4`}
                          >
                            <div
                              key={idx}
                              className={`text-slate-600 text-sm font-medium px-4 py-2 m-2 rounded-lg shadow-lg w-fit bg-white}`}
                            >
                              {messageObj.message}
                            </div>
                            {console.log(messageObj)}
                            <div className="text-[10px] mx-4 text-gray-400">
                              {`${messageObj.from.name} - ${moment(
                                messageObj.created_time
                              ).format("MMM D, h : mm A")}`}
                            </div>
                          </div>
                        </div>
                      );
                    })
                )
            : "Select a chat to view messages"}
        </div>

        <div className="flex items-center h-1/6 mb-0 px-6 py-0">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 border rounded"
          />
          <button
            onClick={() => sendMessage(psid, message)}
            className="ml-2 p-2 bg-blue-600 text-white rounded"
          >
            Send
          </button>
        </div>
      </div>

      {/* Section 4 */}
      <div className="flex flex-col w-2/12 h-screen bg-white border border-slate-300">
        <div className="h-1/3 bg-white flex flex-col items-center justify-center p-6">
          <div className=" bg-blue-500 rounded-full w-20 h-20 overflow-hidden border-2 border-slate-200">
            {activeUser.name !== " " ? (
              <img
                src="https://randomuser.me/api/portraits/men/58.jpg"
                alt="Description"
                class="w-full h-full object-cover"
              />
            ) : null}
          </div>
          <h1 className=" font-bold mt-2">{activeUser.name}</h1>
          <div className="flex items-center justify-center w-full">
            <div className=" rounded-full w-2 h-2 bg-green-600 mr-1"></div>
            <h1 className=" text-xs"> Online</h1>
          </div>
          <div className="w-full flex items-center justify-center mt-5">
            <div className=" border border-gray-400 rounded-lg py-1 px-2 mx-1 flex">
              <FontAwesomeIcon
                icon={faPhone}
                className=" text-slate-400 text-xs"
              />
              <div className=" text-xs">Profile</div>
            </div>
            <div className=" border border-gray-400 rounded-lg py-1 px-2 mx-1 flex">
              <FontAwesomeIcon
                icon={faUser}
                className=" text-slate-400 text-xs"
              />
              <div className=" text-xs">Profile</div>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className=" h-2/3 bg-slate-200 px-3 py-4">
          <div className=" w-full bg-white rounded-xl shadow-md px-4 py-4 flex flex-col text-[11px] pt-5">
            <div className=" font-semibold text-sm mb-4">Customer Details</div>

            <div className=" font-medium text-sm text-gray-500 flex justify-between">
              <div className=" font-medium text-[11px] text-gray-500">
                Email
              </div>
              <div className=" font-medium text-[10px] text-black">
                {`${activeUser.email.slice(0, 5)}......@${
                  activeUser.email.split("@")[1]
                }`}
              </div>
            </div>
            <div className=" font-medium text-gray-500 flex justify-between mt-2">
              <div className=" font-medium  text-gray-500">First Name</div>
              <div className=" font-medium  text-black">{firstName}</div>
            </div>
            <div className=" font-medium text-gray-500 flex justify-between mt-2">
              <div className=" font-medium  text-gray-500">Last Name</div>
              <div className=" font-medium  text-black">{lastName}</div>
            </div>
            <div className=" font-medium text-blue-900 mt-3">
              View more details
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
