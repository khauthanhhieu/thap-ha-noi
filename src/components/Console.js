export default function Console(props) {
  const increaseDisk = () => props.setNumberDisk(number => number < 7 ? number + 1 : number)
  const decreaseDisk = () => props.setNumberDisk(number => number > 1 ? number - 1 : number)

  return (
    <div className="console">
      <div className="console__item">
        <span>Số đĩa: {props.nDisk}</span>
        <button onClick={increaseDisk}>+</button>
        <button onClick={decreaseDisk}>-</button>
      </div>
      <div className="console__item">
        <span>Số bước: {props.step}</span>
      </div>
      <button className="console__button" onClick={props.restartGame}>Chơi lại</button>
      <button className="console__button">Giải đáp</button>
    </div>
  )
}