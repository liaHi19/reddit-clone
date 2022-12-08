import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { reducers } from "./rootReducer";

const store = configureStore({
  reducer: reducers,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
