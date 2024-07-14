import React, { useState } from "react";
import "../css/joinroom.css";
import { useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { db } from "../firebase";
import { doc, updateDoc, getDoc, addDoc, collection, arrayUnion } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";


const JoinRoomContainer = () => {
  const [roomCode, setRoomCode] = useState("");
  const [roomTitle, setRoomTitle] = useState("");
  const navigate = useNavigate();

  const { user } = UserAuth();

  // const handleCreateRoom = async () => {

  //   navigate("/focus-room");
  // };
  const handleCreateRoom = async () => {
    console.log("Creating new room");
    try {
      const colRef = collection(db, "room");
      const newDocRef = await addDoc(colRef, {
        title: roomTitle,
        photoURLs: [user.photoURL], // initialize with current user's photoURL
        displayNames: [user.displayName] // initialize with current user's displayName
      });
      console.log("Document written with ID: ", newDocRef.id);
      navigate(`/focus-room/${newDocRef.id}`); // navigate to focus room with document ID
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleJoinNow = async () => {
    if (roomCode === "") {
      alert("Please enter a room code");
      return;
    }

    console.log("Joining room with code: ", roomCode);
    // Update the document with id: roomCode
    const docRef = doc(db, "room", roomCode);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const roomData = docSnap.data();
      await updateDoc(docRef, {
        photoURLs: [...roomData.photoURLs, user.photoURL], // append current user's photoURL
        displayNames: [...roomData.displayNames, user.displayName] // append current user's displayName
      });
    } else {
      console.log("No such document!");
    }

    navigate(`/focus-room/${roomCode}`); // navigate to focus room with room code
  }

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      id="main"
    >
      <div className="box">
        <div className="text-6xl font-bold mb-8 mt-10">
          <h1>Join Room</h1>
        </div>
        <div className="text-2xl font-bold mb-8">
          Join or create an exclusive focus room where <br /> all your
          distractions fade and productivity prevails!
        </div>
        <div className="flex flex-row gap-10 items-center justify-center">
          <div className="flex flex-col gap-5 items-center justify-center">
            <Input
              value={roomCode}
              label="Enter Room Code"
              onChange={(e) => setRoomCode(e.target.value)}
              color="white"
              className="ma-w-md"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleJoinNow}
            >
              Join Now
            </button>
          </div>
          <div className="h-24 w-0.5 bg-white"></div>
          <div className="flex flex-col gap-5 items-center justify-center">
            <Input
              value={roomTitle}
              label="Enter Room Title"
              onChange={(e) => setRoomTitle(e.target.value)}
              color="white"
              className="ma-w-md"
            />

            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleCreateRoom}
            >
              Create Room
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-4">

        </div>
      </div>
    </div>
  );
};

export default JoinRoomContainer;
