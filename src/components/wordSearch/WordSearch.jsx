import React, { useEffect, useCallback, createContext } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import Header from "../Header";
import Footer from "../Footer";
import Corazon from "../Corazon"
import Gameboard from "./WordSearch/components/Gameboard";
import "./wordsearch.css"
import WordList from "./WordSearch/components/WordList";
import { useState } from "react";

const SIZE_VALIDATION_REGEX = /^[1-2]?[0-9]\*[1-2]?[0-9]$/s;
const DEFAULT_SIZE = [13, 15];

export const WordSearchContext = createContext();

const WordSearch = ({vidas = 3, movimientos}) => {
  const [query, setQuery] = useSearchParams({ size: '10*10' });
  const [listal, setListaL] = useState([]);
  const [moves, setMoves] = useState(10);
  const [vueltasCorazon, setVueltasCorazon] = useState(3);

  const error = console.error;
  console.error = (...args) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  const getValidSize = useCallback(() => {
    const _size = query.get('size')?.trim();
    return !_size || !SIZE_VALIDATION_REGEX.test(_size) ? DEFAULT_SIZE.join('*') : _size;
  }, [query]);

  useEffect(() => {
    setQuery(
      (prev) => {
        return { ...prev, size: getValidSize() };
      },
      { replace: true }
    );
  }, [getValidSize, setQuery]);

  const size = getValidSize().split('*');

  const getListWord = (data) => setListaL(data);

  useEffect(() => {
    if(moves == 0 && vueltasCorazon >= 1){
      setMoves(10);
      setVueltasCorazon(prev => prev - 1);
    }

    if(vueltasCorazon === 0){
      setMoves(0)
      alert("Persite perdiste")
    }
  }, [moves]);

  return(
    <WordSearchContext.Provider value={{getListWord, listal, setMoves}}>
      <div className="flex flex-col justify-between flex-nowrap items-center min-h-screen md:min-h-px md:h-screen">
        <Header />
        <main className="grow w-full flex flex-col">
          <div className="w-full bg-gris-claro-azul py-2">
            <div className="container mx-auto text-center">
              <h1 className="text-secondary text-3xl">Sopa de Letras</h1>
            </div>
          </div>
          <div className="grow container mx-auto flex flex-col md:flex-row xl:justify-start space-x-0 md:space-x-12 space-y-8 md:space-y-0 px-4 lg:px-16 xxl:px-0 pb-12">
            {/* info */}
            <div className="w-full md:w-1/2 h-80 md:h-full xl:h-2/3 flex flex-col space-y-6 md:space-y-14 justify-between items-center">
              <div className="flex bg-primary text-white rounded-b-3xl w-4/5 md:w-2/3 h-1/3 max-h-max p-2 pt-8 divide-x-2">
                <div className="w-1/2 flex flex-col justify-end items-center">
                  <div className="vidas flex space-x-2 mb-4">
                    {Array.from({ length: vueltasCorazon}).map((vida,index) => <Corazon key={index}/>)}
                  </div>
                  <div className="text-sm">Vidas</div>
                </div>
                <div className="w-1/2 flex flex-col justify-end items-center">
                  <div className="movimientos text-4xl mb-2">{moves}</div>
                  <div className="text-sm">Movimientos</div>
                </div>
              </div>
              <div className="bg-gris-claro-azul rounded-3xl w-full  p-4 md:p-4 justify-center flex flex-col items-center">
                {/*<div className="pregunta space-y-2">
                  <p className="text-2xl"><span className="skeleton block w-36 min-h-8"></span></p>
                  <p className="text-xl"><span className="skeleton block min-w-60 min-h-4"></span></p>
                  <p className="text-xl"><span className="skeleton block min-w-60 min-h-4"></span></p>
                </div>*/}
                {/*<p className="text-primary text-3xl text-center">Pistas</p>*/}
                <WordList wordlist={listal} />
              </div>
            </div>
            {/* juego */}
            <div className="w-full md:w-1/2 flex justify-center items-center pt-8">

              {/*<div className="aspect-square h-full max-h-96 md:max-h-full">
                <div className="skeleton size-full"></div>
              </div>*/}
              <Gameboard size={size} getListWord={getListWord} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </WordSearchContext.Provider>
  )
}
export default WordSearch