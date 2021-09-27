import { useDispatch, useSelector } from "react-redux"
import actions from '../actions'

export default function Console() {
  const nDisk = useSelector(state => state.game.numberDisk)
  const step = useSelector(state => state.game.step)

  const dispatch = useDispatch()

  const increaseDisk = () => dispatch(actions.increaseDisk())
  const decreaseDisk = () => dispatch(actions.decreaseDisk())
  const restartGame = () => dispatch(actions.restartGame())

  return (
    <div className="console">
      <div className="console__item">
        <span>Số đĩa: {nDisk}</span>
        <button onClick={increaseDisk}>+</button>
        <button onClick={decreaseDisk}>-</button>
      </div>
      <div className="console__item">
        <span>Số bước: {step}</span>
      </div>
      <button className="console__button" onClick={restartGame}>Chơi lại</button>
      <button className="console__button">Giải đáp</button>
    </div>
  )
}