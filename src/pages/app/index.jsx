import React, { useState, useRef, useEffect } from "react";
import Me from "./me";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [nome, setNome] = useState("Anonimo");
  const [msgs, setMsgs] = useState([]);
  const messageRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (inputValue === "") return;

    // Limpa o campo de entrada após o envio
    setInputValue("");

    // Envia a mensagem para o servidor Socket.io
    socket.emit("sendMessage", { nome, msg: inputValue });
  };

  // Função para rolar para baixo o scroll da div 'message'
  const scrollToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Chama a função para rolar para baixo sempre que msgs é atualizado
    scrollToBottom();

    // Configura um ouvinte para receber mensagens do servidor Socket.io
    socket.on("receiveMessage", (data) => {
      console.log(data);
      setMsgs([...msgs, data]);
      scrollToBottom();
    });

    // Remover o ouvinte ao desmontar o componente
    return () => {
      socket.off("receiveMessage");
    };
  }, [msgs]);

  const inName = (event) => {
    const novoNome = event.target.value.trim() || "Anonimo";
    setNome(novoNome);
  };

  return (
    <main className="prefeito">
      <div className="actions">
        <input
          type="text"
          placeholder="Nome de usuario"
          onChange={inName}
          value={nome}
        />
      </div>
      <div className="message" ref={messageRef}>
        {msgs.map((data, index) => (
          <Me key={index} nome={data.nome} msg={data.msg} />
        ))}
      </div>
      <form className="actions" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Digite algo!"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">enviar</button>
      </form>
    </main>
  );
}
