import { useSelector } from "react-redux"
import Disk from "./Disk"

export default function Tower(props) {
  const tower = useSelector(state => state.game.towers)
  const selectedTower = useSelector(state => state.game.selectedTower)
  const selectedDisk = useSelector(state => state.game.selectedDisk)

  const tempDisk = selectedTower === props.label ? selectedDisk : undefined
  const stack = tower[props.label]

  return (
    <div className={"tower" + (props.selected ? ' tower-selected' : '') } onClick={() => props.onClick(props.label)}>
      {
        tempDisk &&
        <div className="tower__temp-disk">
          <Disk index={tempDisk} key={tempDisk} />
        </div>
      }
      <div className="tower__container">
        <div className="tower__container-rod" />
        <div className="tower__container-stack">
          {
            stack && stack.map(disk => (
              <Disk index={disk} key={disk} />
            ))
          }
        </div>
      </div>
      {/* <div className="tower__label">{props.label}</div> */}
    </div>
  )
}