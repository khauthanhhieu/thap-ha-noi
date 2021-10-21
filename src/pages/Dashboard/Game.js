import Board from '../../components/Game/Board'
import Console from "../../components/Game/Console"
import Rule from "../../components/Game/Rules"

export default function Game() {
  return (
    <div className="game">
      <Console />
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <Board />
          </div>
          <div className="col-lg-6">
            <Rule />
          </div>
        </div>
      </div>
    </div>
  )
}
