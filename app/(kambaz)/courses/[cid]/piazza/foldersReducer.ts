import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folders: [] as any[],
};

const pazzaFoldersSlice = createSlice({
  name: "pazzaFolders",
  initialState,
  reducers: {
    setFolders: (state, action) => {
      state.folders = action.payload;
    },
    addFolder: (state, { payload: folder }) => {
      state.folders = [...state.folders, folder];
    },
    removeFolder: (state, { payload: folderId }) => {
      state.folders = state.folders.filter((f: any) => f._id !== folderId);
    },
    updateFolderInList: (state, { payload: folder }) => {
      state.folders = state.folders.map((f: any) =>
        f._id === folder._id ? folder : f
      );
    },
  },
});

export const { setFolders, addFolder, removeFolder, updateFolderInList } =
  pazzaFoldersSlice.actions;
export default pazzaFoldersSlice.reducer;
