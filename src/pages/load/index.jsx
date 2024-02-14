import { useState, useEffect } from "react";
import logo from "../../assets/img/logo.png";



export default function Load() {

  const [frase, setFrase] = useState("");


  var fraseArray = [
    "O discode foi criado pensando em você, programador.",
    "Feito especialmente para os desenvolvedores, o discode está aqui.",
    "O programador é a inspiração por trás do discode.",
    "Voilà, o discode, uma criação para os amantes de programação!",
    "Feito com carinho para os coders, o discode está pronto para ser explorado.",
    "O discode é a escolha ideal para aqueles que codificam com paixão.",
    "Para cada linha de código, o discode foi concebido para você, programador.",
    "Desenvolvido com dedicação, o discode é um presente para os programadores.",
    "O discode, uma obra-prima para os mestres da programação.",
    "Codificadores, o discode é a sua ferramenta perfeita."
  ];

  useEffect(() => {


    const fraseAleatoria = fraseArray[Math.floor(Math.random() * fraseArray.length)];
    setFrase(fraseAleatoria);


    async function getStatus(){
        try {
          const status = await fetch("https://chatserver-ess2.onrender.com/")
          const result = await status.json()
          if (result && result.code == 200){
            window.location.href="/app"
          }
        } catch (error) {
          console.log(error)
        }
      }
  
      getStatus()
    


  }, []);



 
  return (
    <section className="load">
      <img src={logo} alt="Logo"/>
        <span>{frase}</span>
    </section>
  );
}