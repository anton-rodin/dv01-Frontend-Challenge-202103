import statisticsReducer from './statistics/statistics';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  statistics: statisticsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type Dispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;

export default store;
