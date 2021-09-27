import Tower from "./Shape/Tower"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import actions from "../actions"

const TOWERS = ['A', 'B', 'C']

function createInitState(nDisk) {
  return {
    'A': Array.from({length: nDisk}, (_, index) => index + 1),
    'B': [],
    'C': [],
  }
}

export default function Board() {
  const nDisk = useSelector(state => state.game.numberDisk)

  const [ state, setState ] = useState(createInitState(nDisk))
  const [ selectedDisk, selectDisk ] = useState()
  const [ selectedTower, selectTower ] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    setState(createInitState(nDisk))
    selectDisk(undefined)
    selectTower(undefined)

    dispatch(actions.restartGame())
  }, [nDisk, dispatch])

  const handleSelectTower = function(tower) {
    setState(prevState => {
      const _selectedTower = [ ...prevState[tower] ]
      const disk = _selectedTower.shift()
      if (disk) {
        selectDisk(disk)
        selectTower(tower)
      }

      return {
        ...prevState,
        [tower]: _selectedTower
      }
    })
  }

  const handleMoveToDisk = function(toTower) {
    if (toTower === selectedTower || state[toTower].length === 0 || selectedDisk < state[toTower][0]) {
      setState(prevState => {
        const _selectedTower = [ ...prevState[toTower] ]
        _selectedTower.unshift(selectedDisk)

        return {
          ...prevState,
          [toTower]: _selectedTower
        }
      })
      selectDisk(undefined)
      selectTower(undefined)
      if (toTower !== selectedTower) {
        dispatch(actions.increaseStep())
      }
    }
  }

  const handleClickTower = function(tower) {
    selectedTower ? handleMoveToDisk(tower) : handleSelectTower(tower)
  }

  return (
    <div className="board">
      <div className="board__towers">
        {
          TOWERS.map(label => {
            const selected = selectedTower === label
            const tempDisk = selected ? selectedDisk : undefined
            return (
              <Tower
                key={label} label={label}
                stack={state[label]}
                selected={selected}
                tempDisk={tempDisk}
                onClick={handleClickTower} />
            )
          })
        }
        <div className="board__towers__bottom" />
      </div>
    </div>
  )
}
