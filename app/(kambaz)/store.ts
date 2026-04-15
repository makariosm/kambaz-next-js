import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./courses/reducer";
import modulesReducer from "./courses/[cid]/modules/reducer";
import assignmentsReducer from "./courses/assignments/reducer";
import accountReducer from "./account/reducer";
import enrollmentsReducer from "./enrollments/reducer";
import pazzaPostsReducer from "./courses/[cid]/piazza/postsReducer";
import pazzaFoldersReducer from "./courses/[cid]/piazza/foldersReducer";

const store = configureStore({
  reducer: {
    coursesReducer,
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
    pazzaPostsReducer,
    pazzaFoldersReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
