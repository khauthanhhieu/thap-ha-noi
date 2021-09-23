import Tower from "./Shape/Tower"
import './Board.css'
import { useState } from "react"

const TOWERS = ['A', 'B', 'C']

export default function Board(props) {
  const [ state, setState ] = useState({
    'A': [1, 2, 3, 4, 5],
    'B': [],
    'C': [],
  })
  const [ selectedDisk, selectDisk ] = useState()
  const [ selectedTower, selectTower ] = useState()

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
    }
  }

  const handleClickTower = function(tower) {
    // if (!selectedTower) {
    //   selectTower(tower)
    // } else {
    //   if (selectedTower !== tower) {
    //     const topDisk = state[tower][0] || 0
    //     if(state[selectedTower][0] > topDisk) {
    //       setState((prevState) => {
    //         const selectedDisks = [ ...prevState[selectedTower] ]
    //         const disk = selectedDisks.shift()
    //         const disks = [ disk, ...prevState[tower] ]
            
    //         return {
    //           ...prevState,
    //           [selectedTower]: selectedDisks,
    //           [tower]: disks
    //         }
    //       })
    //     }
    //   }
    //   selectTower(undefined)
    // }

    selectedTower ? handleMoveToDisk(tower) : handleSelectTower(tower)
  }

  return (
    <div className="board">
      {
        TOWERS.map(label => (<Tower key={label} label={label} stack={state[label]} selected={selectedTower === label} onClick={handleClickTower} />))
      }
    </div>
  )
}