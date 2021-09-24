import Tower from "./Shape/Tower"
import { useState, useEffect, forwardRef, useImperativeHandle } from "react"

const TOWERS = ['A', 'B', 'C']

function createInitState(nDisk) {
  return {
    'A': Array.from({length: nDisk}, (_, index) => index + 1),
    'B': [],
    'C': [],
  }
}

function Board(props, ref) {
  const [ state, setState ] = useState(createInitState(props.nDisk))
  const [ selectedDisk, selectDisk ] = useState()
  const [ selectedTower, selectTower ] = useState()
  const [ history, setHistory ] = useState([])

  const restart = () => {
    setState(createInitState(props.nDisk))
    selectDisk(undefined)
    selectTower(undefined)
    setHistory([])
  }

  useImperativeHandle(ref, () => ({ restart }))

  useEffect(restart, [props.nDisk])

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
        setHistory(history => ([
          ...history,
          [ selectedTower, toTower ]
        ]))
        props.setStep(step => step + 1)
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

export default forwardRef(Board)
