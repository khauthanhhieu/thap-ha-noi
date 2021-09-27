import * as types from './types'

export function restartGame() {
  return { type: types.RESTART_GAME }
}

export function changeNumberOfDisk(number) {
  return { type: types.RESTART_GAME, payload: number }
}

export function increaseDisk() {
  return { type: types.INCREASE_DISK }
}

export function decreaseDisk() {
  return { type: types.DECREASE_DISK }
}

export function increaseStep() {
  return { type: types.INCREASE_STEP }
}