import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './Square.jsx'
import { TURNS, saveGameToStorage, resetGameStorage, checkWinnerFrom, checkEndGame } from './helpers.js'
import { WinnerModal } from './WinnerModal.jsx'
import './board.css'

function Board () {
  let [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  let [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return

    let newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    let newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    saveGameToStorage({board: newBoard,turn: newTurn})

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
    
  }

  return (
    <main className='board'>
      <h1>Tres en línea</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default Board
