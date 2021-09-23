import Disk from "./Disk"
import './Tower.css'

export default function Tower(props) {
  return (
    <div className={"tower" + (props.selected ? ' tower-selected' : '') } onClick={() => props.onClick(props.label)}>
      <div className="tower__container">
        <div className="tower__container-rod" />
        <div className="tower__container-stack">
          {
            props.stack.map(disk => (
              <Disk index={disk} key={disk} />
            ))
          }
        </div>
      </div>
      <div className="tower__label">{props.label}</div>
    </div>
  )
}