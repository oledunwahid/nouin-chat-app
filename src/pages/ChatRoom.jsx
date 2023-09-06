import React, { useContext, useState } from "react";
import ChatBox from "../components/ChatBox";
import SendMessage from "../components/SendMessage";
import { AuthContext } from "../context/AuthContext";
import { updateMessage } from "../Firebase"; // Import the updateMessage function

const ChatRoom = () => {
  const { currentUser } = useContext(AuthContext); // Get the currentUser from AuthContext
  const [editingMessageId, setEditingMessageId] = useState(null);

  // Function to handle editing a message
  const handleEditMessage = (messageId) => {
    setEditingMessageId(messageId);
  };

  // Function to handle saving an edited message
  const handleSaveEdit = async (messageId, newText) => {
    await updateMessage(messageId, newText);
    setEditingMessageId(null);
  };

  return (
    <div>
      {/* Render the user's current profile picture here */}
      <img src={currentUser.profilePicture} alt="Profile" />

      {/* Render the ChatBox and pass down the edit message functions */}
      <ChatBox
        onEditMessage={handleEditMessage}
        onSaveEdit={handleSaveEdit}
        editingMessageId={editingMessageId}
      />
      <SendMessage />
    </div>
  );
};

export default ChatRoom;
