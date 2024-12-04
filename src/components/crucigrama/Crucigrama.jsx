import React, { useContext, useEffect, useRef, useState, useCallback } from "react";

import "./index.css"
import initCrosswordGame from "./ttsciihuy";
import { GameContext } from "../../Juegos";

const Crucigrama = () => {
  const { data, moves, handleMoves, setWinner, boardSize } = useContext(GameContext);
  const crossword = useRef(null)
  useEffect(() => {
    if(crossword.current !== null){
      initCrosswordGame(data);
      window.externalFunction = (valor) => {
        handleMoves(moves - valor)
        console.log()
        if(moves - valor < 1){
          handleMoves(10)
          window.wordIncorrect = 0
        }
      }


      const script = document.createElement("script");
      script.src = `/crossword.js`; // Ruta al archivo JS en public
      script.async = true;

      document.body.appendChild(script);
      return () => {
        delete window.externalFunction
        document.body.removeChild(script); // Limpieza del script
      };
    }
  }, []);  

  return(
    <>
      <div id="ttscontainer">
        <div id="crossword" ref={crossword} style={{width: boardSize.width, height: boardSize.height}}></div>
      </div>
    </>
  )
}
export default Crucigrama