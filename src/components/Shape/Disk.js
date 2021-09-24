import './Disk.scss'

export default function Disk(props) {
  const { index } = props
  const styleCss = {
    // margin: `0 ${8 - 2*index}vh`,
    width: `calc(${ 4 + 4*index } * var(--unit))`,
    backgroundColor: index % 2 ? 'red' : 'blue'
  }

  return (
    <div className="disk" style={styleCss}>
      {index}
    </div>
  )
}