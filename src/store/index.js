import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from './reduxDevtools'
import uiReducer from '../reducers/uiReducer'
import contentReducer from '../reducers/contentReducer'
import { persistMiddleware, rehydrateState } from './persist'

const rootReducer = combineReducers({
  ui: uiReducer,
  content: contentReducer
})

const preloaded = rehydrateState()

const middleware = [thunk, persistMiddleware]

const store = createStore(rootReducer, preloaded, composeWithDevTools(
  applyMiddleware(...middleware)
))

export default store
