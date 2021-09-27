import * as types from '../actions/types'

const initState = {
  numberDisk: 5,
  step: 0
}

export default function game(state = initState, action) {
  switch (action.type) {
    case types.CHANGE_NUMBER_OF_DISK:
      return {
        numberDisk: (2 < action.payload && action.payload < 6) ? action.payload : state.numberDisk,
        step: 0
      }
    case types.INCREASE_DISK:
      return {
        numberDisk: state.numberDisk < 6 ? state.numberDisk + 1 : state.numberDisk,
        step: 0
      }
    case types.DECREASE_DISK:
      return {
        numberDisk: state.numberDisk > 3 ? state.numberDisk - 1 : state.numberDisk,
        step: 0
      }
    case types.INCREASE_STEP:
      return {
        ...state,
        step: state.step + 1
      }
    case types.RESTART_GAME:
      return {
        ...state,
        step: 0
      }
    default:
      return state
  }
}