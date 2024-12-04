import Header from "./components/Header"
import Footer from "./components/Footer"
import { createContext, useEffect, useRef, useState } from "react"
import { useParams } from 'react-router-dom'
import { fetchData } from "./utils/data"

// componentes juegos
import Roulette from "./components/roulette/Roulette"
import Trivia from "./components/trivia/Trivia"
import TriviaMultiple from "./components/triviaMultiple/TriviaMultiple"
import Hangman from "./components/hangman/Hangman"
import SlidingPuzzle from "./components/puzzle-deslizante/SlidingPuzzle"
import VidasMovimientos from "./components/VidasMovimientos"
import Pregunta from "./components/Pregunta"
import GanasteModal from "./components/GanasteModal"
import FallasteModal from "./components/FallasteModal"
import Crucigrama from "./components/crucigrama/Crucigrama"

export const GameContext = createContext();
let cont = 0;
export default function Juegos() {

  const { tipoJuego, oidJuego, oidUsuario } = useParams();
  const [ lostAttempts, setLostAttempts ] = useState(0);
  const [ moves, setMoves ] = useState(0);
  const [ gameStatus, setGameStatus ] = useState('playing');

  const [ boardSize, setBoardSize ] = useState({ width:0, height:0});
  const gameColumnRef = useRef(null);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function setGameComponent () {
    let game = null;
    switch (tipoJuego) {
      case 'ruleta': game = <Roulette />;break;
      case 'trivia': game = <Trivia /> ;break;
      case 'trivia-multiple': game = <TriviaMultiple />;break;
      case 'ahorcado': game = <Hangman />;break;
      case 'rompecabezas': game = <SlidingPuzzle />;break;
      case 'crucigrama': game = <Crucigrama />;break;
      default:break;
    }
    return game;
  }

  function handleMoves(totalMoves,hasWon) {
    setMoves(totalMoves);
    console.log(totalMoves)
    if(totalMoves === 0){
      cont = cont + 1;
      setLostAttempts(prev => prev + 1);
      if(cont === data.intentos){ setGameStatus('fallaste'); alet("Fallaste") }
    }
    if(moves === 1){
      setLostAttempts(lostAttempts + 1);
      if(lostAttempts === data.intentos - 1 )setGameStatus('fallaste');
    }
    if(hasWon)setGameStatus('ganaste');
  } 

  function setWinner(){
    setGameStatus('ganaste');
  }

  // Data fetch API
  useEffect(() => {
    (async () => {
      setLoading(true);
      const dataObj = await fetchData(oidJuego, oidUsuario);
      setTimeout(() => {
        if(dataObj.error){
          setError(dataObj.error);
          setLoading(false);
        }else{
          setData(dataObj);
          setMoves(dataObj.errores);
          setLoading(false);
        }
      }, 2000);
    })();
  }, [oidJuego,]);
  
  // set responsive board game size
  useEffect(() => {
    const handleResize = () => {
      if(gameColumnRef.current){
        const { width, height } = gameColumnRef.current.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(gameColumnRef.current);
        const paddingTop = parseFloat(computedStyle.paddingTop);
        const size= width < height - paddingTop ? width : height - paddingTop;
        setBoardSize({width:size, height:size});
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[]);

  // modal estado del juego
  useEffect(() => {
    let modal = '';
    switch (gameStatus) {
      case 'ganaste':modal='ganasteModal';break;
      case 'fallaste':modal='fallasteModal';break;
      case 'finalizaste':modal='finalizasteModal';break;    
      default:break;
    }
    if(modal !== '')document.getElementById(modal).showModal();
    console.log('gameStatus: '+gameStatus);
  }, [gameStatus]);
  
  return (
    <div className="flex flex-col justify-between flex-nowrap items-center min-h-screen md:min-h-px md:h-screen">
      <Header />
      <main className="grow w-full flex flex-col">

        <header className="w-full bg-gris-claro-azul py-2">
          <div className="container mx-auto text-center">
            <h1 className="text-secondary text-3xl capitalize">{tipoJuego}</h1>
          </div>
        </header>

        <section className="grow container mx-auto flex flex-col md:flex-row xl:justify-start space-x-0 md:space-x-12 space-y-8 md:space-y-0 px-4 lg:px-16 xxl:px-0 pb-12">
          {/* info */}
          <div className="w-full md:w-1/2 h-full 2xl:h-2/3 flex flex-col space-y-6 md:space-y-14 justify-between items-center">
            <VidasMovimientos vidas={data.intentos} errores={lostAttempts} movimientos={moves} />
            <Pregunta pregunta={data.pregunta} isLoading={loading} photo={data.url} />            
          </div>

          {/* juego */}
          <div ref={gameColumnRef} className="w-full md:w-1/2 h-full 2xl:h-2/3 flex justify-center items-center pt-12">
            <div className={`relative aspect-square ${loading ? 'skeleton':''}`} style={{width:boardSize.width+'px',height:boardSize.height+'px'}}>
              <GameContext.Provider value={{data, moves, handleMoves, boardSize, setWinner}}>
                {Object.entries(data).length > 0 ? setGameComponent() : <h2>{error}</h2>}
              </GameContext.Provider>
            </div>
          </div>
        </section>

        {/* modals */}
        <GanasteModal puntos={data.puntos} />
        <FallasteModal />

      </main>
      <Footer />
    </div>
  )
}