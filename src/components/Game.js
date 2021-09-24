import { useState, useRef } from "react"
import Board from "./Board"
import Console from "./Console"

export default function Game(props) {
  const [ numberDisk, setNumberDisk ] = useState(5)
  const [ step, setStep ] = useState(0)

  const boardRef = useRef()

  const restart = () => {
    if (boardRef.current) {
      boardRef.current.restart()
      setStep(0)
    }
  }

  return (
    <div className="game">
      <Console nDisk={numberDisk} setNumberDisk={setNumberDisk} restartGame={restart} step={step} />
      <Board ref={boardRef} nDisk={numberDisk} step={step} setStep={setStep} />
    </div>
  )
}
