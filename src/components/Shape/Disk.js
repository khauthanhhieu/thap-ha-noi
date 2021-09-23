import './Disk.css'

export default function Disk(props) {
  const { index } = props
  const styleCss = {
    margin: `0 ${8 - 2*index}vh`,
    backgroundColor: index % 2 ? 'red' : 'blue'
  }

  return (
    <div className="disk" style={styleCss}>
      {index}
    </div>
  )
}