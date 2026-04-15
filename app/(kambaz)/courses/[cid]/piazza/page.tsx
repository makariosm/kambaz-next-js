"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setPosts, setSelectedPost } from "./postsReducer";
import { setFolders } from "./foldersReducer";
import * as client from "./client";
import PazzaNavBar from "./PazzaNavBar";
import FolderFilters from "./FolderFilters";
import ListOfPosts from "./ListOfPosts";
import ClassAtAGlance from "./ClassAtAGlance";
import NewPostScreen from "./NewPostScreen";
import ViewPost from "./ViewPost";
import ManageClass from "./ManageClass";
import Link from "next/link";

export default function PazzaPage() {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : (cid as string);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { posts, selectedPost } = useSelector(
    (state: RootState) => state.pazzaPostsReducer
  );
  const { folders } = useSelector(
    (state: RootState) => state.pazzaFoldersReducer
  );
  const { courses } = useSelector(
    (state: RootState) => state.coursesReducer
  );

  const course = courses.find((c: any) => c._id === courseId);

  const [activeTab, setActiveTab] = useState("qa");
  const [showNewPost, setShowNewPost] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  const fetchPosts = async () => {
    if (!courseId) return;
    const data = await client.findPostsForCourse(courseId);
    dispatch(setPosts(data));
  };

  const fetchFolders = async () => {
    if (!courseId) return;
    const data = await client.findFoldersForCourse(courseId);
    dispatch(setFolders(data));
  };

  useEffect(() => {
    fetchPosts();
    fetchFolders();
    dispatch(setSelectedPost(null));
  }, [courseId]);

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const handleSelectPost = async (post: any) => {
    dispatch(setSelectedPost(post));
    setShowNewPost(false);
    await client.addView(post._id);
  };

  const handleNewPost = () => {
    setShowNewPost(true);
    dispatch(setSelectedPost(null));
  };

  const handlePostCreated = () => {
    setShowNewPost(false);
    fetchPosts();
  };

  const handleCancelNewPost = () => {
    setShowNewPost(false);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "qa") {
      dispatch(setSelectedPost(null));
      setShowNewPost(false);
    }
  };

  const renderPostScreen = () => {
    if (activeTab === "manageClass") {
      return <ManageClass courseId={courseId} />;
    }
    if (showNewPost) {
      return (
        <NewPostScreen
          courseId={courseId}
          folders={folders}
          onPostCreated={handlePostCreated}
          onCancel={handleCancelNewPost}
        />
      );
    }
    if (selectedPost) {
      return (
        <ViewPost
          post={selectedPost}
          courseId={courseId}
          onPostUpdated={fetchPosts}
        />
      );
    }
    return <ClassAtAGlance courseId={courseId} />;
  };

  return (
    <div className="d-flex flex-column" style={{ height: "100%" }}>
      <PazzaNavBar
        courseName={course?.number || course?.name || courseId}
        currentUser={currentUser}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isFaculty={isFaculty}
      />
      {activeTab === "qa" && (
        <FolderFilters
          folders={folders}
          selectedFolder={selectedFolder}
          onSelectFolder={(f: string | null) => setSelectedFolder(f)}
        />
      )}
      <div className="d-flex flex-fill">
        {activeTab === "qa" && (
          <ListOfPosts
            posts={posts}
            selectedPost={selectedPost}
            onSelectPost={handleSelectPost}
            onNewPost={handleNewPost}
            searchText={searchText}
            onSearchChange={setSearchText}
            selectedFolder={selectedFolder}
            showSidebar={showSidebar}
            onToggleSidebar={() => setShowSidebar(!showSidebar)}
          />
        )}
        <div className="flex-fill overflow-auto p-3">
          {renderPostScreen()}
        </div>
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#e8e8e8",
          padding: "8px 16px",
          borderTop: "1px solid #ddd",
          fontSize: "0.85rem",
        }}
      >
        <Link href="/team" className="text-decoration-none">
          Team Info
        </Link>
      </div>
    </div>
  );
}
