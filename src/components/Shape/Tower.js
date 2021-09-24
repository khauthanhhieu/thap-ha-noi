import Disk from "./Disk"

export default function Tower(props) {
  return (
    <div className={"tower" + (props.selected ? ' tower-selected' : '') } onClick={() => props.onClick(props.label)}>
      {
        props.tempDisk &&
        <div className="tower__temp-disk">
          <Disk index={props.tempDisk} key={props.tempDisk} />
        </div>
      }
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
      {/* <div className="tower__label">{props.label}</div> */}
    </div>
  )
}