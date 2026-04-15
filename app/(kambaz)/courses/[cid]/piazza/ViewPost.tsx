"use client";
import { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { removePost, updatePostInList, setSelectedPost } from "./postsReducer";
import * as client from "./client";
import FollowupDiscussions from "./FollowupDiscussions";

export default function ViewPost({
  post,
  courseId,
  onPostUpdated,
}: {
  post: any;
  courseId: string;
  onPostUpdated: () => void;
}) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const isAuthor = currentUser?._id === post.author;

  const [answers, setAnswers] = useState<any[]>([]);
  const [editingPost, setEditingPost] = useState(false);
  const [editSummary, setEditSummary] = useState(post.summary);
  const [editDetails, setEditDetails] = useState(post.details);

  // Student answer state
  const [studentAnswerText, setStudentAnswerText] = useState("");
  // Instructor answer state
  const [instructorAnswerText, setInstructorAnswerText] = useState("");
  // Editing answer state
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
  const [editingAnswerText, setEditingAnswerText] = useState("");

  const fetchAnswers = async () => {
    try {
      const data = await client.findAnswersForPost(post._id);
      setAnswers(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAnswers();
    setEditingPost(false);
    setEditSummary(post.summary);
    setEditDetails(post.details);
  }, [post._id]);

  const handleDeletePost = async () => {
    await client.deletePost(post._id);
    dispatch(removePost(post._id));
    dispatch(setSelectedPost(null));
    onPostUpdated();
  };

  const handleSaveEditPost = async () => {
    const updated = await client.updatePost(post._id, {
      summary: editSummary,
      details: editDetails,
    });
    dispatch(updatePostInList(updated));
    dispatch(setSelectedPost(updated));
    setEditingPost(false);
    onPostUpdated();
  };

  const handleSubmitAnswer = async (type: string) => {
    const content = type === "student" ? studentAnswerText : instructorAnswerText;
    if (!content.trim()) return;
    await client.createAnswer(post._id, { content });
    if (type === "student") setStudentAnswerText("");
    else setInstructorAnswerText("");
    fetchAnswers();
  };

  const handleEditAnswer = async (answerId: string) => {
    if (!editingAnswerText.trim()) return;
    await client.updateAnswer(answerId, { content: editingAnswerText });
    setEditingAnswerId(null);
    setEditingAnswerText("");
    fetchAnswers();
  };

  const handleDeleteAnswer = async (answerId: string) => {
    await client.deleteAnswer(answerId);
    fetchAnswers();
  };

  const studentAnswers = answers.filter((a: any) => a.type === "student");
  const instructorAnswers = answers.filter((a: any) => a.type === "instructor");
  const isStudent = currentUser?.role === "STUDENT";
  const hasStudentAnswer = studentAnswers.length > 0;
  const hasInstructorAnswer = instructorAnswers.length > 0;

  return (
    <div>
      {/* Post header */}
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <span
            style={{
              fontSize: "0.8rem",
              color: "#666",
            }}
          >
            {post.type} &bull; {post.views || 0} view{post.views !== 1 ? "s" : ""}
          </span>
        </div>
        {(isFaculty || isAuthor) && !editingPost && (
          <Dropdown>
            <DropdownToggle variant="outline-secondary" size="sm">
              Actions
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => setEditingPost(true)}>
                Edit
              </DropdownItem>
              <DropdownItem onClick={handleDeletePost} className="text-danger">
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>

      {/* Post content */}
      {editingPost ? (
        <div className="mb-3">
          <FormControl
            className="mb-2"
            value={editSummary}
            onChange={(e) => setEditSummary(e.target.value)}
          />
          <FormControl
            as="textarea"
            rows={4}
            value={editDetails}
            onChange={(e) => setEditDetails(e.target.value)}
            className="mb-2"
          />
          <Button
            variant="primary"
            size="sm"
            onClick={handleSaveEditPost}
            className="me-2"
          >
            Save
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setEditingPost(false);
              setEditSummary(post.summary);
              setEditDetails(post.details);
            }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div className="mb-3">
          <h3>{post.summary}</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {post.details || ""}
          </p>
          <div className="mt-2">
            {post.folders &&
              post.folders.map((f: string) => (
                <span
                  key={f}
                  className="badge bg-info me-1"
                  style={{ fontSize: "0.75rem" }}
                >
                  {f}
                </span>
              ))}
          </div>
          <div
            style={{ fontSize: "0.8rem", color: "#888", marginTop: "4px" }}
          >
            Posted by {post.authorName} &bull;{" "}
            {new Date(post.createdAt).toLocaleString()}
          </div>
          {(isFaculty || isAuthor) && (
            <Button
              variant="outline-primary"
              size="sm"
              className="mt-2"
              onClick={() => setEditingPost(true)}
            >
              Edit
            </Button>
          )}
        </div>
      )}

      <hr />

      {/* Answers section - only for questions */}
      {post.type === "question" && (
        <>
          {/* Student's Answers */}
          <div className="mb-4">
            <h5
              style={{
                backgroundColor: "#e8f4e8",
                padding: "8px 12px",
                borderRadius: "4px",
              }}
            >
              Student&apos;s Answer
            </h5>
            {studentAnswers.map((answer: any) => (
              <div key={answer._id} className="mb-3 ms-3">
                {editingAnswerId === answer._id ? (
                  <div>
                    <FormControl
                      as="textarea"
                      rows={3}
                      value={editingAnswerText}
                      onChange={(e) => setEditingAnswerText(e.target.value)}
                      className="mb-2"
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEditAnswer(answer._id)}
                      className="me-2"
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditingAnswerId(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div style={{ whiteSpace: "pre-wrap" }}>{answer.content}</div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "#888",
                        marginTop: "4px",
                      }}
                    >
                      {answer.authorName} &bull;{" "}
                      {new Date(answer.createdAt).toLocaleString()}
                    </div>
                    {(isFaculty || currentUser?._id === answer.author) && (
                      <div className="mt-1">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => {
                            setEditingAnswerId(answer._id);
                            setEditingAnswerText(answer.content);
                          }}
                        >
                          Edit
                        </Button>
                        <Dropdown className="d-inline">
                          <DropdownToggle variant="outline-secondary" size="sm">
                            Actions
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              onClick={() => {
                                setEditingAnswerId(answer._id);
                                setEditingAnswerText(answer.content);
                              }}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleDeleteAnswer(answer._id)}
                              className="text-danger"
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {!hasStudentAnswer && isStudent && (
              <div className="ms-3">
                <FormControl
                  as="textarea"
                  rows={3}
                  placeholder="Write your answer..."
                  value={studentAnswerText}
                  onChange={(e) => setStudentAnswerText(e.target.value)}
                  className="mb-2"
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleSubmitAnswer("student")}
                >
                  Submit
                </Button>
              </div>
            )}
            {!hasStudentAnswer && !isStudent && (
              <div className="ms-3 text-muted" style={{ fontSize: "0.85rem" }}>
                No student answers yet.
              </div>
            )}
          </div>

          {/* Instructor's Answers */}
          <div className="mb-4">
            <h5
              style={{
                backgroundColor: "#fff3cd",
                padding: "8px 12px",
                borderRadius: "4px",
              }}
            >
              Instructor&apos;s Answer
            </h5>
            {instructorAnswers.map((answer: any) => (
              <div key={answer._id} className="mb-3 ms-3">
                {editingAnswerId === answer._id ? (
                  <div>
                    <FormControl
                      as="textarea"
                      rows={3}
                      value={editingAnswerText}
                      onChange={(e) => setEditingAnswerText(e.target.value)}
                      className="mb-2"
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEditAnswer(answer._id)}
                      className="me-2"
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditingAnswerId(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div style={{ whiteSpace: "pre-wrap" }}>{answer.content}</div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "#888",
                        marginTop: "4px",
                      }}
                    >
                      {answer.authorName} &bull;{" "}
                      {new Date(answer.createdAt).toLocaleString()}
                    </div>
                    {isFaculty && (
                      <div className="mt-1">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => {
                            setEditingAnswerId(answer._id);
                            setEditingAnswerText(answer.content);
                          }}
                        >
                          Edit
                        </Button>
                        <Dropdown className="d-inline">
                          <DropdownToggle variant="outline-secondary" size="sm">
                            Actions
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              onClick={() => {
                                setEditingAnswerId(answer._id);
                                setEditingAnswerText(answer.content);
                              }}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleDeleteAnswer(answer._id)}
                              className="text-danger"
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {!hasInstructorAnswer && isFaculty && (
              <div className="ms-3">
                <FormControl
                  as="textarea"
                  rows={3}
                  placeholder="Write the instructor's answer..."
                  value={instructorAnswerText}
                  onChange={(e) => setInstructorAnswerText(e.target.value)}
                  className="mb-2"
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleSubmitAnswer("instructor")}
                >
                  Submit
                </Button>
              </div>
            )}
            {!hasInstructorAnswer && !isFaculty && (
              <div className="ms-3 text-muted" style={{ fontSize: "0.85rem" }}>
                No instructor answers yet.
              </div>
            )}
          </div>
        </>
      )}

      <hr />

      {/* Followup Discussions */}
      <FollowupDiscussions postId={post._id} />
    </div>
  );
}
