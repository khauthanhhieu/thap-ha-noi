export default function Disk(props) {
  const { index } = props
  const styleCss = {
    width: `calc(${ 4 + 4*index } * var(--unit))`,
    backgroundColor: index % 2 ? 'red' : 'blue'
  }

  return (
    <div className="disk" style={styleCss}>
      {index}
    </div>
  )
}