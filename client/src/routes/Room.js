import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
import Header from '../components/Header/Header';
import Participants from '../components/Participants/Participants';
import Message from '../components/Message/Message';
import StreamButton from '../components/StreamButton/StreamButton';
import LiveStream from '../components/LiveStream/LiveStream';

const Room = () => {

    const userVideo = useRef();
    const partnerVideo = useRef();
    const peerRef = useRef();
    const socketRef = useRef();
    const otherUser = useRef();
    const userStream = useRef();
    const audioRef = useRef();
    const cameraRef = useRef();
    const sendChannel = useRef();

    const [text, setText] = useState('');
    const [message, setMessage] = useState([]);

    console.log(message)

    const { roomID } = useParams();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
            userVideo.current.srcObject = stream;
            userStream.current = stream;

            socketRef.current = io.connect("/");
            socketRef.current.emit("join room", roomID)

            socketRef.current.on("other user", userID => {
                callUser(userID)
                otherUser.current = userID
            })

            socketRef.current.on("user joined", userID => {
                otherUser.current = userID
            });

            socketRef.current.on("offer", handleReceiveCall);
            socketRef.current.on("answer", handleAnswer);
            socketRef.current.on("ice-candidate", handleNewICECandidateMsg)

        })
    }, []);

    const callUser = (userID) => {
        peerRef.current = createPeer(userID)
        userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current))
        sendChannel.current = peerRef.current.createDataChannel("sendChannel");
        sendChannel.current.onmessage = handleReceiveMessage
    };

    const handleReceiveMessage = (e) => {
        setMessage(messages => [...messages, {yours: false, value: e.data}])
    }

    const createPeer = (userID) => {
        const peer = new RTCPeerConnection({
            iceServers: [
            { urls: ['stun:stun1.1.google.com:19302', 'stun:stun2.1.google.com:19302'] }
        ]
        });

        peer.onicecandidate = handleICECandidateEvent;
        peer.ontrack = handleTrackEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

        return peer;
    }

    const handleNegotiationNeededEvent = (userID) => {
        peerRef.current.createOffer().then(offer => {
            return peerRef.current.setLocalDescription(offer);
        }).then(() => {
            const payload = {
                target: userID,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            }
            socketRef.current.emit("offer", payload)
        }).catch(e => console.log(e));
    }

    const handleReceiveCall = (incoming) => {
        peerRef.current = createPeer();
        peerRef.current.ondatachannel = (event) => {
            sendChannel.current = event.channel;
            sendChannel.current.onmessage = handleReceiveMessage;
        }
        const desc = new RTCSessionDescription(incoming.sdp);
        peerRef.current.setRemoteDescription(desc).then(() => {
            userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current))
        }).then(() => {
            return peerRef.current.createAnswer()
        }).then((answer) => {
            return peerRef.current.setLocalDescription(answer)
        }).then(() => {
            const payload = {
                target: incoming.caller,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            }
            socketRef.current.emit("answer", payload)
        })
    };

    const handleAnswer = (message) => {
        const desc = new RTCSessionDescription(message.sdp)
        peerRef.current.setRemoteDescription(desc).catch(e => console.log(e))
    }

    const handleICECandidateEvent = (e) => {
        if (e.candidate) {
            const payload = {
                target: otherUser.current,
                candidate: e.candidate
            }
            socketRef.current.emit("ice-candidate", payload)
        }
    }

    const handleNewICECandidateMsg = (incoming) => {
        const candidate = new RTCIceCandidate(incoming);

        peerRef.current.addIceCandidate(candidate)
        .catch(e => console.log(e))
    }

    const handleTrackEvent = (e) => {
        partnerVideo.current.srcObject = e.streams[0]
    }

    const handleChange = (e) => {
        setText(e.target.value)
    };

    const sendMessage = () => {
        sendChannel.current.send(text); 
        setMessage(messages => [...messages, { yours: true, value: text }]);
        setText('');
    }

    const toggleCamera = async () => {
        let videoTracks = userStream.current.getTracks().find(track => track.kind === 'video');

        if (videoTracks.enabled) {
            videoTracks.enabled = false
            cameraRef.current.style.backgroundColor = 'rgb(255, 80, 80)'
        } else {
            videoTracks.enabled = true
            cameraRef.current.style.backgroundColor = 'rgb(179, 102, 249, .9)'
        }
    };

    const toggleMic = async () => {
        let audioTracks = userStream.current.getTracks().find(track => track.kind === 'audio');

        if (audioTracks.enabled) {
            audioTracks.enabled = false
            audioRef.current.style.backgroundColor = 'rgb(255, 80, 80)'
        } else {
            audioTracks.enabled = true
            audioRef.current.style.backgroundColor = 'rgb(179, 102, 249, .9)'
        }
    }


  return (
      <div>
          <Header />
          <LiveStream
              userVideo={userVideo}
              partnerVideo={partnerVideo}
          />
          <Participants />
          <Message
              value={text}
              handleChange={handleChange}
              sendMessage={sendMessage}
              message={message}
          />
          <StreamButton
              toggleCamera={toggleCamera}
              cameraRef={cameraRef}
              audioRef={audioRef}
              toggleMic={toggleMic}
          />
    </div>
  )
}

export default Room