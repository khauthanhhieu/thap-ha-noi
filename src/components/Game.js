import Board from "./Board"
import Console from "./Console"
import Rule from "./Rules"

export default function Game() {
  return (
    <div className="game">
      <Console />
      <div className="container">
        <div className="col-6">
          <Board />
        </div>
        <div className="col-6">
          <Rule />
        </div>
      </div>
    </div>
  )
}
