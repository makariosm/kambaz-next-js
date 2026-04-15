"use client";
import { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormCheck,
  FormSelect,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { addPost, setSelectedPost } from "./postsReducer";
import * as client from "./client";

export default function NewPostScreen({
  courseId,
  folders,
  onPostCreated,
  onCancel,
}: {
  courseId: string;
  folders: any[];
  onPostCreated: () => void;
  onCancel: () => void;
}) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const [postType, setPostType] = useState("question");
  const [postTo, setPostTo] = useState("entireClass");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [courseUsers, setCourseUsers] = useState<any[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await client.findUsersForCourse(courseId);
        setCourseUsers(users);
      } catch (e) {
        console.error(e);
      }
    };
    fetchUsers();
  }, [courseId]);

  const toggleFolder = (folderName: string) => {
    if (selectedFolders.includes(folderName)) {
      setSelectedFolders(selectedFolders.filter((f) => f !== folderName));
    } else {
      setSelectedFolders([...selectedFolders, folderName]);
    }
  };

  const toggleUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (selectedFolders.length === 0) errs.folders = "At least one folder is required";
    if (!summary.trim()) errs.summary = "Summary is required";
    if (summary.length > 100) errs.summary = "Summary must be 100 characters or less";
    if (!details.trim()) errs.details = "Details are required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      const newPost = await client.createPost(courseId, {
        type: postType,
        postTo,
        selectedUsers: postTo === "individual" ? selectedUsers : [],
        folders: selectedFolders,
        summary,
        details,
      });
      dispatch(addPost(newPost));
      dispatch(setSelectedPost(newPost));
      onPostCreated();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h4>New Post</h4>
      <hr />

      <div className="mb-3">
        <label className="fw-bold me-3">Post Type*</label>
        <FormCheck
          inline
          type="radio"
          label="Question"
          name="postType"
          checked={postType === "question"}
          onChange={() => setPostType("question")}
        />
        <FormCheck
          inline
          type="radio"
          label="Note"
          name="postType"
          checked={postType === "note"}
          onChange={() => setPostType("note")}
        />
      </div>

      <div className="mb-3">
        <label className="fw-bold me-3">Post To*</label>
        <FormCheck
          inline
          type="radio"
          label="Entire Class"
          name="postTo"
          checked={postTo === "entireClass"}
          onChange={() => setPostTo("entireClass")}
        />
        <FormCheck
          inline
          type="radio"
          label="Individual Student(s) / Instructor(s)"
          name="postTo"
          checked={postTo === "individual"}
          onChange={() => setPostTo("individual")}
        />
      </div>

      {postTo === "individual" && (
        <div className="mb-3">
          <label className="fw-bold">Select Users</label>
          <div
            className="overflow-auto"
            style={{
              maxHeight: "150px",
              border: "1px solid #ddd",
              padding: "8px",
              borderRadius: "4px",
            }}
          >
            {courseUsers.map((user: any) => (
              <FormCheck
                key={user._id}
                type="checkbox"
                label={`${user.firstName} ${user.lastName} (${user.role})`}
                checked={selectedUsers.includes(user._id)}
                onChange={() => toggleUser(user._id)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mb-3">
        <label className="fw-bold">Select Folder(s)*</label>
        <div className="overflow-auto text-nowrap">
          {folders.map((folder: any) => (
            <Button
              key={folder._id}
              size="sm"
              variant={
                selectedFolders.includes(folder.name)
                  ? "primary"
                  : "outline-secondary"
              }
              className="me-1 mb-1"
              onClick={() => toggleFolder(folder.name)}
            >
              {folder.name}
            </Button>
          ))}
        </div>
        {errors.folders && (
          <div className="text-danger" style={{ fontSize: "0.85rem" }}>
            {errors.folders}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label className="fw-bold">Summary*</label>
        <FormControl
          placeholder="Enter a one line summary, 100 characters or less"
          maxLength={100}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        {errors.summary && (
          <div className="text-danger" style={{ fontSize: "0.85rem" }}>
            {errors.summary}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label className="fw-bold">Details*</label>
        <FormControl
          as="textarea"
          rows={6}
          placeholder="Enter the details of your post..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        {errors.details && (
          <div className="text-danger" style={{ fontSize: "0.85rem" }}>
            {errors.details}
          </div>
        )}
      </div>

      <div className="d-flex">
        <Button variant="primary" onClick={handleSubmit} className="me-2">
          {postType === "question" ? "Post My Question" : "Post My Note"}
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
