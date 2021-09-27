import { useState, useRef } from "react"
import Board from "./Board"
import Console from "./Console"
import Rule from "./Rules"

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
      <div className="container">
        <div className="col-6">
          <Board ref={boardRef} nDisk={numberDisk} step={step} setStep={setStep} />
        </div>
        <div className="col-6">
          <Rule />
        </div>
      </div>
    </div>
  )
}
