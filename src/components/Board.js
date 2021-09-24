import Tower from "./Shape/Tower"
import './Board.css'
import { useState } from "react"

const TOWERS = ['A', 'B', 'C']

function createInitState(nDisk) {
  return {
    'A': Array.from({length: nDisk}, (_, index) => index + 1),
    'B': [],
    'C': [],
  }
}

export default function Board(props) {
  const [ state, setState ] = useState(createInitState(props.nDisk))
  const [ selectedDisk, selectDisk ] = useState()
  const [ selectedTower, selectTower ] = useState()
  const [ step, setStep ] = useState(0)
  const [ history, setHistory ] = useState([])

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
        setStep(step => step + 1)
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
      <div className="board__status">
        <div>Số bước: { step }</div>
        <div>Lịch sử</div>
        <ol>
          { history.map((ele, index) => (
            <li key={index}> {ele[0]} - {ele[1]} </li>
          )) }
        </ol>
      </div>
    </div>
  )
}