"use client";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const VideoCall = () => {
  const [myPhoneNumber, setMyPhoneNumber] = useState("");
  const [callTo, setCallTo] = useState("");
  const [isClient, setIsClient] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Create a single socket instance
    socketRef.current = io("http://localhost:5000");

    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    socketRef.current.on("incomingCall", async ({ from, offer }) => {
      console.log("Incoming call from:", from);
      if (!peerConnection.current) return;

      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socketRef.current?.emit("answerCall", { to: from, answer });

      peerConnection.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
    });

    socketRef.current.on("callAnswered", async (answer) => {
      if (!peerConnection.current) return;
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    });

    socketRef.current.on("candidate", async (candidate) => {
      if (!peerConnection.current) return;
      await peerConnection.current.addIceCandidate(
        new RTCIceCandidate(candidate)
      );
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate && callTo) {
        socketRef.current?.emit("candidate", {
          to: callTo,
          candidate: event.candidate,
        });
      }
    };

    return () => {
      peerConnection.current?.close();
      socketRef.current?.disconnect();
    };
  }, [callTo, isClient]);

  const registerUser = () => {
    if (!isClient || !socketRef.current) return;
    socketRef.current.emit("register", myPhoneNumber);
  };

  const startCall = async () => {
    if (!isClient || !peerConnection.current || !socketRef.current) return;

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }

    stream
      .getTracks()
      .forEach((track) => peerConnection.current!.addTrack(track, stream));

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    socketRef.current.emit("startCall", {
      from: myPhoneNumber,
      to: callTo,
      offer,
    });
  };

  if (!isClient) return null;

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2">Video Call</h2>
      <input
        type="text"
        placeholder="Your Phone Number"
        value={myPhoneNumber}
        onChange={(e) => setMyPhoneNumber(e.target.value)}
        className="border p-2 mb-2"
      />
      <button
        onClick={registerUser}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Register
      </button>
      <input
        type="text"
        placeholder="Call to (Phone Number)"
        value={callTo}
        onChange={(e) => setCallTo(e.target.value)}
        className="border p-2 mb-2"
      />
      <button
        onClick={startCall}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Start Call
      </button>
      <div className="flex mt-4">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          className="w-1/2 border"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-1/2 border"
        />
      </div>
    </div>
  );
};

export default VideoCall;
