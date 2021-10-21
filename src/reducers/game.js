import * as types from '../actions/types'

function createInitTowers(nDisk) {
  return {
    'A': Array.from({length: nDisk}, (_, index) => index + 1),
    'B': [],
    'C': [],
  }
}

const initState = {
  player: true,
  numberDisk: 5,
  step: 0,
  towers: createInitTowers(5),
  selectedTower: undefined,
  selectedDisk: undefined,
  done: false
}

const finish = function(tower) {
  return tower['A'].length === 0 && tower['B'].length === 0
}

export default function game(state = initState, action) {
  switch (action.type) {
    case types.CHANGE_NUMBER_OF_DISK:
      if (!state.player) {
        return state
      }
      return {
        ...state,
        numberDisk: (2 < action.payload && action.payload < 6) ? action.payload : state.numberDisk,
        step: 0
      }
    case types.INCREASE_DISK:
      if (!state.player) {
        return state
      }
      return {
        ...state,
        numberDisk: state.numberDisk < 6 ? state.numberDisk + 1 : state.numberDisk,
        step: 0
      }
    case types.DECREASE_DISK:
      if (!state.player) {
        return state
      }
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
        player: true,
        numberDisk: state.numberDisk,
        step: 0,
        towers: createInitTowers(state.numberDisk),
        selectedTower: undefined,
        selectedDisk: undefined,
        done: false
      }
    case types.SELECT_TOWER: {
      if (state.done || !state.towers[action.payload]) {
        return state
      }

      return {
        ...state,
        selectedTower: action.payload,
        selectedDisk: state.towers[action.payload].shift()
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
            step: state.step + 1,
            done: finish(state.towers)
          }
        }
      }

      return state
    }
    case types.SET_MODE_EXEC:
      return {
        player: false,
        numberDisk: state.numberDisk,
        step: 0,
        towers: createInitTowers(state.numberDisk),
        selectedTower: undefined,
        selectedDisk: undefined,
        done: false
      }
    default:
      return state
  }
}