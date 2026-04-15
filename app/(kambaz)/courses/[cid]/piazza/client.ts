import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const PAZZA_API = `${HTTP_SERVER}/api/pazza`;

// Posts
export const findPostsForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/pazza/posts`
  );
  return data;
};
export const findPostById = async (postId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${PAZZA_API}/posts/${postId}`
  );
  return data;
};
export const createPost = async (courseId: string, post: any) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/pazza/posts`,
    post
  );
  return data;
};
export const updatePost = async (postId: string, post: any) => {
  const { data } = await axiosWithCredentials.put(
    `${PAZZA_API}/posts/${postId}`,
    post
  );
  return data;
};
export const deletePost = async (postId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${PAZZA_API}/posts/${postId}`
  );
  return data;
};
export const addView = async (postId: string) => {
  const { data } = await axiosWithCredentials.put(
    `${PAZZA_API}/posts/${postId}/view`
  );
  return data;
};
export const getStats = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/pazza/stats`
  );
  return data;
};

// Answers
export const findAnswersForPost = async (postId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${PAZZA_API}/posts/${postId}/answers`
  );
  return data;
};
export const createAnswer = async (postId: string, answer: any) => {
  const { data } = await axiosWithCredentials.post(
    `${PAZZA_API}/posts/${postId}/answers`,
    answer
  );
  return data;
};
export const updateAnswer = async (answerId: string, answer: any) => {
  const { data } = await axiosWithCredentials.put(
    `${PAZZA_API}/answers/${answerId}`,
    answer
  );
  return data;
};
export const deleteAnswer = async (answerId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${PAZZA_API}/answers/${answerId}`
  );
  return data;
};

// Discussions
export const findDiscussionsForPost = async (postId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${PAZZA_API}/posts/${postId}/discussions`
  );
  return data;
};
export const createDiscussion = async (postId: string, discussion: any) => {
  const { data } = await axiosWithCredentials.post(
    `${PAZZA_API}/posts/${postId}/discussions`,
    discussion
  );
  return data;
};
export const updateDiscussion = async (discussionId: string, updates: any) => {
  const { data } = await axiosWithCredentials.put(
    `${PAZZA_API}/discussions/${discussionId}`,
    updates
  );
  return data;
};
export const deleteDiscussion = async (discussionId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${PAZZA_API}/discussions/${discussionId}`
  );
  return data;
};
export const addReply = async (discussionId: string, reply: any) => {
  const { data } = await axiosWithCredentials.post(
    `${PAZZA_API}/discussions/${discussionId}/replies`,
    reply
  );
  return data;
};
export const updateReply = async (
  discussionId: string,
  replyId: string,
  updates: any
) => {
  const { data } = await axiosWithCredentials.put(
    `${PAZZA_API}/discussions/${discussionId}/replies/${replyId}`,
    updates
  );
  return data;
};
export const deleteReply = async (discussionId: string, replyId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${PAZZA_API}/discussions/${discussionId}/replies/${replyId}`
  );
  return data;
};

// Folders
export const findFoldersForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/pazza/folders`
  );
  return data;
};
export const createFolder = async (courseId: string, folder: any) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/pazza/folders`,
    folder
  );
  return data;
};
export const updateFolder = async (folderId: string, updates: any) => {
  const { data } = await axiosWithCredentials.put(
    `${PAZZA_API}/folders/${folderId}`,
    updates
  );
  return data;
};
export const deleteFolder = async (folderId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${PAZZA_API}/folders/${folderId}`
  );
  return data;
};

// Users for course (reuse existing)
export const findUsersForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/users`
  );
  return data;
};
