import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSliceReducer from "../slices/userSlice";
import { checkLoginMiddleware } from "../../middleware/checkLoginMiddleware";
import { moviesApi } from "../api/moviesApi";

import { moviesAPI } from "../api/API"; // TEST

const rootReducer = combineReducers({
  user: userSliceReducer,
  [moviesApi.reducerPath]: moviesApi.reducer,
  [moviesAPI.reducerPath]: moviesAPI.reducer, // ТЕСТ
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    moviesApi.reducerPath,
    moviesAPI.reducerPath // ТЕСТ
  ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([checkLoginMiddleware, moviesApi.middleware, moviesAPI.middleware]), // ТЕСТ moviesAPI - удалить
});

export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
