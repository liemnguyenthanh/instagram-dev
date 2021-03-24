import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8080/socket.io/index";
export default  function MessagesScreen() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      console.log("data",data)
      setResponse(data);
    });
  }, []);
  console.log("res",response)
  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}


