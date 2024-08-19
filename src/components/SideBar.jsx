import React from "react";
import PropTypes from "prop-types";
import IconPlus from "/Users/ngtuonghung/Desktop/CHAT-AI/chat-ai/src/assets/plusIcon.png";
import IconChat from "/Users/ngtuonghung/Desktop/CHAT-AI/chat-ai/src/assets/chat.png";
import IconRemove from "/Users/ngtuonghung/Desktop/CHAT-AI/chat-ai/src/assets/remove.png";
import IconMenu from "/Users/ngtuonghung/Desktop/CHAT-AI/chat-ai/src/assets/menu.png";
import { useDispatch, useSelector } from "react-redux";
import { addChat, removeChat } from "../store/chatSlice";
import { Link, useNavigate } from "react-router-dom";
const SideBar = ({ onToggle }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => {
    return state.chat;
  });
  const navigate = useNavigate();
  const handleNewChat = () => {
    dispatch(addChat());
  };
  const handleRemoveChat = (id) => {
    dispatch(removeChat(id));
    navigate("/");
  };
  return (
    <div className="bg-primaryBg-SideBar h-screen w-[280px] text-white p-8">
      <button className="ml-auto flex  xl:hidden " onClick={onToggle}>
        <img src={IconMenu} alt="menu icon" className="w-10 h-10" />
      </button>
      <div className="mt-20">
        <button
          className="px-4 py-2 flex items-center space-x-4 bg-gray-600 mb-10"
          onClick={handleNewChat}
        >
          <img src={IconPlus} alt="" className="w-4 h-4" />
          <p>Cuộc trò chuyện mới</p>
        </button>
        <div className="space-y-4">
          <p>Gần đây:</p>
          <div className="flex flex-col space-y-6">
            {data.map((chat) => {
              return (
                <Link
                  to={`/chat/${chat.id}`}
                  className="flex items-center justify-between p-4 bg-gray-800"
                  key={chat?.id}
                >
                  <div className="flex items-center space-x-4">
                    <img src={IconChat} alt="" className="w-8 h-8" />
                    <p>{chat.title}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveChat(chat.id);
                    }}
                  >
                    <img src={IconRemove} alt="" className="w-5 h-5" />
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  onToggle: PropTypes.func,
};
export default SideBar;
