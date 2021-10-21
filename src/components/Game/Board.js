import Tower from "./Tower"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import actions from "../../actions"

const TOWERS = ['A', 'B', 'C']

export default function Board() {
  const nDisk = useSelector(state => state.game.numberDisk)
  const state = useSelector(state => state.game.towers)
  const selectedTower = useSelector(state => state.game.selectedTower)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.restartGame())
  }, [nDisk, dispatch])

  const handleClickTower = function(tower) {
    selectedTower ? dispatch(actions.moveDiskTo(tower)) : dispatch(actions.selectTower(tower))
  }

  return (
    <div className="board">
      <div className="board__towers">
        {
          TOWERS.map(label => {
            return (
              <Tower
                key={label} label={label}
                stack={state[label]}
                onClick={handleClickTower} />
            )
          })
        }
        <div className="board__towers__bottom" />
      </div>
    </div>
  )
}
