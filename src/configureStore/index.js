import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers' // giá trị trả về từ combineReducers

const persistConfig = {
  key: 'root',
  storage: storage,
}

const pReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(pReducer)
export const persistor = persistStore(store)
