import { useEffect, useState, useRef } from "react";
import Message from "./Message";
import { collection, query, onSnapshot, orderBy, limit } from "firebase/firestore";
import { db } from "../Firebase";
import { UserAuth } from "../context/AuthContext";

const ChatBox = () => {
    // Ref to scroll to the bottom of the chat
  const messagesEndRef = useRef();
   // State to store messages and current user
  const [messages, setMessages] = useState([]);
  const { currentUser } = UserAuth();
  // State to track editing message
  const [editingMessageId, setEditingMessageId] = useState(null);
    // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // Query messages from Firestore
    const q = query(collection(db, "messages"), orderBy("createdAt"), limit(50));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  // Function to handle the start of message editing
  const onEditMessage = (messageId) => {
    setEditingMessageId(messageId);
  };

  // Function to handle the saving of edited message
  const onSaveEdit = async (messageId, newText) => {
    // Implement the logic to update the message in Firebase
    try {
      // Update the message in Firestore using updateMessage function
      await updateMessage(messageId, newText);
      console.log("Message updated successfully.");
    } catch (error) {
      console.error("Error updating message:", error);
    }

    setEditingMessageId(null);
  };

  return (
    <div className="pb-44 pt-20 containerWrap">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          onEditMessage={onEditMessage} // Pass down the handleEditMessage function
          onSaveEdit={onSaveEdit} // Pass down the handleSaveEdit function
          isEditing={editingMessageId === message.id} // Check if the current message is being edited
        />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatBox;

/*This ChatBox component is responsible for displaying the chat messages, 
handling editing of messages, and rendering the Message components. 
It fetches messages from Firestore, scrolls to the bottom of the chat, 
  and provides functions for starting and saving message edits.*/