import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { githubApi } from "../services/githubAPI"

const rootReducer = combineReducers({})

export const setupStore = () => {
  return  configureStore({
    reducer: {
      [githubApi.reducerPath]: githubApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(githubApi.middleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
