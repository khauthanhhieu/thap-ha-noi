import { useDispatch, useSelector } from "react-redux"
import actions from '../../actions'
import { Modal, Button } from 'react-bootstrap'
import { useCallback, useState } from "react"
import execHanoiTower from '../../logic/execHanoiTower'

export default function Console() {
  const nDisk = useSelector(state => state.game.numberDisk)
  const step = useSelector(state => state.game.step)
  const done = useSelector(state => state.game.done)
  const player = useSelector(state => state.game.player)

  const dispatch = useDispatch()


  const callback = useCallback(async (newValue, id) => {
    if (!player) {
      await execHanoiTower(nDisk, async (from, to) => {

        dispatch(actions.selectTower(from))
        await sleep(1000);
        dispatch(actions.moveDiskTo(to))
        await sleep(1000);
      })
    }
  }, [ nDisk, player, dispatch ])

  const increaseDisk = () => dispatch(actions.increaseDisk())
  const decreaseDisk = () => dispatch(actions.decreaseDisk())
  const restartGame = () => dispatch(actions.restartGame())

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const exec = async function() {
    dispatch(actions.setModeExec())

    // await execHanoiTower(nDisk, async (from, to) => {
    //   console.log(player)
    //   dispatch(actions.selectTower(from))
    //   console.log('selectTower', from)
    //   await sleep(1000);
    //   dispatch(actions.moveDiskTo(to))
    //   console.log('moveDiskTo', to)
    //   await sleep(1000);
    // })
    callback()
  }

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <div className="console">
      <div className="console__item">
        <span>Số đĩa: {nDisk}</span>
        <button onClick={increaseDisk}>+</button>
        <button onClick={decreaseDisk}>-</button>
      </div>
      <div className="console__item">
        <span>Số bước: {step}</span>
      </div>
      <button className="console__button" onClick={restartGame}>Chơi lại</button>
      <button className="console__button" onClick={exec}>Giải đáp</button>

      {
        (player && done) &&
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Chúc mừng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Bạn đã hoàn thành trò chơi với {step} bước.</p>
            { (step > Math.pow(2, nDisk) - 1) ? 'Hãy thử cách khác để giảm số bước' : 'Đây là số bước đi tốt nhất' }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Tiếp tục
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  )
}