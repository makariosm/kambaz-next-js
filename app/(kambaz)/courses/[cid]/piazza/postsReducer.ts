import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [] as any[],
  selectedPost: null as any,
};

const pazzaPostsSlice = createSlice({
  name: "pazzaPosts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    addPost: (state, { payload: post }) => {
      state.posts = [post, ...state.posts];
    },
    removePost: (state, { payload: postId }) => {
      state.posts = state.posts.filter((p: any) => p._id !== postId);
      if (state.selectedPost && state.selectedPost._id === postId) {
        state.selectedPost = null;
      }
    },
    updatePostInList: (state, { payload: post }) => {
      state.posts = state.posts.map((p: any) =>
        p._id === post._id ? post : p
      );
      if (state.selectedPost && state.selectedPost._id === post._id) {
        state.selectedPost = post;
      }
    },
  },
});

export const { setPosts, setSelectedPost, addPost, removePost, updatePostInList } =
  pazzaPostsSlice.actions;
export default pazzaPostsSlice.reducer;
