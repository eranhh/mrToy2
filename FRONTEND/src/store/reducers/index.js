import { combineReducers } from 'redux'
import { toyReducer } from './toyReducer'
import { reviewReducer } from './reviewReducer'
import { userReducer } from './userReducer'
import { systemReducer } from './systemReducer'

export const rootReducer = combineReducers({
  toyModule: toyReducer,
  systemModule: systemReducer,
  reviewModule: reviewReducer,
  userModule: userReducer
})