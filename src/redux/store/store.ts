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
import { moviesAPI } from "../api/movieApi";

const rootReducer = combineReducers({
  user: userSliceReducer,
  [moviesAPI.reducerPath]: moviesAPI.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    moviesAPI.reducerPath
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
    }).concat([checkLoginMiddleware, moviesAPI.middleware]),
});

export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
