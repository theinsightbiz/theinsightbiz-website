const KEY = 'insight_biz_state_v1'

export const persistMiddleware = store => next => action => {
  const result = next(action)
  const state = store.getState()
  const toPersist = { content: state.content }
  try {
    localStorage.setItem(KEY, JSON.stringify(toPersist))
  } catch (e){ /* ignore quota errors */ }
  return result
}

export const rehydrateState = () => {
  try {
    const raw = localStorage.getItem(KEY)
    if(!raw) return undefined
    return JSON.parse(raw)
  } catch(e){
    return undefined
  }
}
