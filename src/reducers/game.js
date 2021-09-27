import * as types from '../actions/types'

function createInitTowers(nDisk) {
  return {
    'A': Array.from({length: nDisk}, (_, index) => index + 1),
    'B': [],
    'C': [],
  }
}

const initState = {
  numberDisk: 5,
  step: 0,
  towers: createInitTowers(5),
  selectedTower: undefined,
  selectedDisk: undefined
}

export default function game(state = initState, action) {
  switch (action.type) {
    case types.CHANGE_NUMBER_OF_DISK:
      return {
        ...state,
        numberDisk: (2 < action.payload && action.payload < 6) ? action.payload : state.numberDisk,
        step: 0
      }
    case types.INCREASE_DISK:
      return {
        ...state,
        numberDisk: state.numberDisk < 6 ? state.numberDisk + 1 : state.numberDisk,
        step: 0
      }
    case types.DECREASE_DISK:
      return {
        ...state,
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
        numberDisk: state.numberDisk,
        step: 0,
        towers: createInitTowers(state.numberDisk),
        selectedTower: undefined,
        selectedDisk: undefined
      }
    case types.SELECT_TOWER: {
      const selectedTower = action.payload
      if (!state.towers[selectedTower]) {
        return state
      }
      const selectedDisk = state.towers[selectedTower].shift()

      return {
        ...state,
        selectedTower,
        selectedDisk
      }
    }
    case types.MOVE_DISK_TO: {
      if (!state.selectedDisk || !state.selectedTower) {
        return state
      }
      if (state.towers[action.payload]) {
        const stack = state.towers[action.payload]
        if (stack.length === 0 || stack[0] > state.selectedDisk) {
          stack.unshift(state.selectedDisk)

          return {
            ...state,
            selectedTower: undefined,
            selectedDisk: undefined,
            step: state.step + 1
          }
        }
      }

      return state
    }
    default:
      return state
  }
}