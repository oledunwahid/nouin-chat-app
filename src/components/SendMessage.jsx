import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = () => {
    const [value,setValue] = useState("");
    const { currentUser } = UserAuth();

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if(value.trim() === "") {
          alert("Enter valid message!");
          return;
        }

        try {
          if (!currentUser || !currentUser.uid) {
            throw new Error("User not authenticated or missing UID.");
          }
      
          const { uid, displayName, photoURL } = currentUser;
          await addDoc(collection(db, "messages"), {
            text: value,
            name: displayName,
            avatar: photoURL,
            createdAt: serverTimestamp(),
            uid: uid,
          });
        } catch (error) {
          console.log(error);
        }
        setValue("");
    };

  return (
    <div className="bg-accent fixed bottom-0 w-full py-7 shadow-xl">
        <form onSubmit={handleSendMessage} className="containerWrap px-2 flex">
            <input value={value} onChange={e => setValue(e.target.value)} className='input w-full focus:outline-none bg-gray-100 rounded-r-none' type="text"/>
            <button type='submit' className="w-auto bg-primary text-white px-5 text-sm rounded-r-lg" >Send</button>
        </form>
    </div>
  )
}

export default SendMessage