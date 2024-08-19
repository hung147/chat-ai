import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { marked } from "marked";
import DOMPurify from "dompurify";
const initData = {
  data: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initData,
  reducers: {
    addChat: (state) => {
      state.data.push({
        id: uuidv4(),
        title: "Chat",
        messages: [],
      });
    },
    addMessage: (state, action) => {
      const { idChat, title, message, userMess, botMess } = action.payload;
      const chat = state.data.find((chat) => chat.id === idChat);
      if (chat) {
        const messageFormat = marked.parse(botMess);
        const safeChat = DOMPurify.sanitize(messageFormat);
        const newMessage = [
          ...chat.messages,
          { id: uuidv4(), text: userMess, isBot: false },
          { id: uuidv4(), text: safeChat, isBot: true },
        ];
        chat.messages = newMessage;
        state.data = [...state.data];
        console.log("Message added:", { idChat, userMess, botMess }); // Debug log
      }
    },
    removeChat: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    setNameChat: (state, action) => {
      const { newTitle, chatId } = action.payload;
      const chat = state.data.find((chat) => chat.id === chatId);
      if (chat) {
        chat.title = newTitle;
      }
    },
  },
});
export const { removeChat, addChat, addMessage, setNameChat } =
  chatSlice.actions;
export default chatSlice.reducer;
