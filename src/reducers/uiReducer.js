const initial = {
  mobileMenuOpen: false,
  toast: null
}

export default function uiReducer(state = initial, action){
  switch(action.type){
    case 'ui/toggleMenu':
      return { ...state, mobileMenuOpen: !state.mobileMenuOpen }
    case 'ui/toast':
      return { ...state, toast: action.payload }
    case 'ui/clearToast':
      return { ...state, toast: null }
    default:
      return state
  }
}
