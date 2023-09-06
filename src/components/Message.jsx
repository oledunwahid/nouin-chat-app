
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import { updateMessage, deleteMessage } from "../Firebase";

const Message = ({ message }) => {
  const { currentUser } = UserAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message.text);

  const handleEdit = () => {
    setIsEditing(true);

    //Handle Cancel With Toast//
  };
  const handleCancelEdit= async () => {
    const confirmCancelEdit = window.confirm("Are you sure you want to Cancel Edit?");
  
    if (confirmCancelEdit) {
      try {
        await      setIsEditing(false);
        setEditedMessage(message.text);
      } catch (error) {
        console.log(error);
      }
    }

    //Handle Delete With Toast//
  };
  const handleSaveEdit = async () => {
    await updateMessage(message.id, editedMessage);
    setIsEditing(false);

    //Handle Delete With Toast//
  };
  const handleDelete= async () => {
    const confirmDelete = window.confirm("Are you sure you want to Delete Message?");
  
    if (confirmDelete) {
      try {
        await    deleteMessage(message.id);;
      } catch (error) {
        console.log(error);
      }
    }
  };
  
//Const Date//
  const timestamp = message.createdAt ? new Date(message.createdAt.toDate()) : null;

  //Const Time//
  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  
  //Handle KeyDown Enter And Escape//
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === "Escape" && !e.shiftKey) {
      handleDelete();
    }
  };
  const timeString = timestamp ? timestamp.toLocaleTimeString(undefined, timeOptions) : null;
       {/* Display Avatar */}
  return (
    <div className={`chat ${message.uid === currentUser.uid ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-12 rounded-full">
          <img src={message.avatar} alt={message.name} />
        </div>
      </div>
                  {/* Display Name */}
      <div className="chat-header tracking-wider font-bold text-[14px] text-primary-focus">{message.name}</div>
 
 {/* Display Chat Bubble */}
      <div className="chat-bubble bg-accent font-semibold text-[13px] text-[#292524] overflow-hidden">
  {!isEditing ? (
    message.text
  ) : (
    <textarea
      value={editedMessage}
      onChange={(e) => setEditedMessage(e.target.value)}
      onKeyDown={handleKeyDown}
      style={{ maxHeight: "300px", overflowX: "auto" }} // Adjust the max height as needed
    ></textarea>
  )}
  {/* Display Time */}
  {timestamp && (
    <div className="chat-timestamp tracking-wider text-[9px] text-[#3b3b3b] font-bold">
      {timeString}
    </div>
  )}
      </div>

      {/* Edit and Delete buttons */}
      {message.uid === currentUser.uid && (
        <div className="button-container">
          {!isEditing ? (
              <button
                onClick={handleEdit}
                className="edit-button font-bold hover:underline px-1 text-[#292524] hover:text-blue-700 text-[11px]"
              >
                Edit
              </button>
            ) : (
              <>
              
      {/* Save And Cancel buttons */}
                <button
                  onClick={handleSaveEdit}
                  className="save-button font-bold  text-[#292524] hover:text-blue-600 text-[11px] px-1 hover:underline"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="cancel-button text-[#292524] font-bold  hover:text-red-600 text-[11px] hover:underline"
                >
                  Cancel
                </button>
              </>
            )}

            {/* Conditionally render the delete button */}
            {!isEditing && (
              <button
                onClick={handleDelete}
                className="delete-button hover:underline font-bold text-[#292524] hover:text-red-600 text-[11px]"
              >
                Delete
              </button>
            )}
          </div>
        )}
      


      
    </div>
  );
};

export default Message;