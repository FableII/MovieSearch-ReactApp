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
import { booksApi } from "../api/booksApi";  //test УДАЛИТЬ
import { moviesApi } from "../api/moviesApi";

const rootReducer = combineReducers({
  user: userSliceReducer,
  [booksApi.reducerPath]: booksApi.reducer, 
  [moviesApi.reducerPath]: moviesApi.reducer, 
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([checkLoginMiddleware, booksApi.middleware, moviesApi.middleware]),
});

export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
