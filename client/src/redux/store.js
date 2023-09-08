import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import pageReducer from "./pageSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist configuration for user
const userPersistConfig = {
  key: "user",
  storage,
};

// Persist configuration for page
const pagePersistConfig = {
  key: "page",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedPageReducer = persistReducer(pagePersistConfig, pageReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    page: persistedPageReducer,
  },
});

export const persistor = persistStore(store);
