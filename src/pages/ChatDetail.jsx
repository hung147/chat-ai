import { useEffect, useState } from "react";
import ImgTemp from "/Users/ngtuonghung/Desktop/CHAT-AI/chat-ai/src/assets/temp.jpeg";
import IconMenu from "/Users/ngtuonghung/Desktop/CHAT-AI/chat-ai/src/assets/menu.png";
import SideBar from "../components/SideBar";
import IconStar from "/Users/ngtuonghung/Desktop/CHAT-AI/chat-ai/src/assets/star.png";
import { useParams } from "react-router-dom";
import Gemini from "/Users/ngtuonghung/Desktop/CHAT-AI/chat-ai/src/gemini";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setNameChat } from "../store/chatSlice";

const ChatDetail = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [dataDetail, setDataDetail] = useState([]);
  const [inputChat, setInputChat] = useState("");
  const [messageDetail, setMessageDetail] = useState("");
  const { id } = useParams();
  const { data } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data.length > 0) {
      const chat = data.find((chat) => chat.id === id);
      if (chat) {
        // console.log("chat:", chat);
        setDataDetail(chat);
        setMessageDetail(chat.messages);
      }
    }
  }, [data, id]);
  const handleChatDetail = async () => {
    if (id) {
      const chatText = await Gemini(inputChat, messageDetail);
      if (dataDetail.title === "Chat") {
        const promptName = `This is a new chat, and user ask about ${inputChat}. No rely and comment just give me a name for this chat, Max length is 10 characters`;
        const newTitle = await Gemini(promptName);
        dispatch(setNameChat({ newTitle, chatId: id }));
      }
      if (chatText) {
        const dataMessage = {
          idChat: id, // Đảm bảo rằng idChat được truyền đúng
          userMess: inputChat,
          botMess: chatText,
        };
        dispatch(addMessage(dataMessage));
        setInputChat(""); // Xóa input sau khi gửi
      }
    }
  };
  return (
    <div className="text-white xl:w-[80%] w-full relative">
      <div className="flex items-center space-x-2 p-4">
        <button onClick={() => setMenuToggle(!menuToggle)}>
          <img src={IconMenu} alt="menu icon" className="w-8 h-8 xl:hidden" />
        </button>
        <h1 className="text-xl uppercase font-bold p-4">Gemini</h1>
      </div>
      {menuToggle && (
        <div className="absolute h-full top-0 left-0 xl:hidden">
          <SideBar onToggle={() => setMenuToggle(!menuToggle)} />
        </div>
      )}
      <div className="max-w-[90%] w-full mx-auto  mt-20 flex-col space-y-10">
        {id ? (
          <div className="flex flex-col space-y-4 p-4 h-[400px] overflow-x-hidden overflow-y-auto">
            {Array.isArray(messageDetail) &&
              messageDetail.map((item) => (
                <div className="flex space-y-6 flex-col " key={item.id}>
                  <div className="flex space-x-8 items-baseline">
                    {item.isBot ? (
                      <>
                        <img alt="star" src={IconStar} className="w-8 h-8" />
                        <p dangerouslySetInnerHTML={{ __html: item.text }} />
                      </>
                    ) : (
                      <>
                        <p>User</p>
                        <p>{item.text}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="max-w-[90%] w-full mx-auto  mt-32 flex-col space-y-20">
            <div className="flex flex-col space-y-5 ">
              <div className="space-y-1">
                <h2 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-[30px] font-bold text-xl inline-block text-transparent bg-clip-text">
                  Xin chào
                </h2>
                <p className="text-3xl">Hôm nay tôi có thể giúp gì cho bạn</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-[200px] h-[200px] bg-primaryBg-SideBar flex items-center justify-center rounded-lg">
                  <p>Lên kế hoạch bữa ăn</p>
                </div>
                <div className="w-[200px] h-[200px] bg-primaryBg-SideBar flex items-center justify-center rounded-lg">
                  <p>Cụm từ ngôn ngữ mới</p>
                </div>
                <div className="w-[200px] h-[200px] bg-primaryBg-SideBar flex items-center justify-center rounded-lg">
                  <p>Bí quyết viết đơn xin việc</p>
                </div>
                <div className="w-[200px] h-[200px] bg-primaryBg-SideBar flex items-center justify-center rounded-lg flex-col">
                  <p>Tạo hình với AI</p>
                  <img
                    src={ImgTemp}
                    alt="temp"
                    className="w-[150px] h-[100px]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center space-x-4">
          <input
            value={inputChat}
            onChange={(e) => setInputChat(e.target.value)}
            type="text"
            className="p-4 rounded-lg bg-primaryBg-default w-[90%] border"
            placeholder="Nhập câu lệnh tại đây"
          />
          <button
            className="p-4 rounded-lg bg-green-500 text-white"
            onClick={handleChatDetail}
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
