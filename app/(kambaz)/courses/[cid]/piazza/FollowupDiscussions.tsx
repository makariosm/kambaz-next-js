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
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as client from "./client";

export default function FollowupDiscussions({ postId }: { postId: string }) {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [discussions, setDiscussions] = useState<any[]>([]);
  const [newDiscussionText, setNewDiscussionText] = useState("");
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});
  const [editingDiscussionId, setEditingDiscussionId] = useState<string | null>(null);
  const [editingDiscussionText, setEditingDiscussionText] = useState("");
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editingReplyText, setEditingReplyText] = useState("");

  const fetchDiscussions = async () => {
    try {
      const data = await client.findDiscussionsForPost(postId);
      setDiscussions(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, [postId]);

  const handleCreateDiscussion = async () => {
    if (!newDiscussionText.trim()) return;
    await client.createDiscussion(postId, { text: newDiscussionText });
    setNewDiscussionText("");
    fetchDiscussions();
  };

  const handleToggleResolved = async (discussion: any) => {
    await client.updateDiscussion(discussion._id, {
      resolved: !discussion.resolved,
    });
    fetchDiscussions();
  };

  const handleEditDiscussion = async (discussionId: string) => {
    if (!editingDiscussionText.trim()) return;
    await client.updateDiscussion(discussionId, {
      text: editingDiscussionText,
    });
    setEditingDiscussionId(null);
    fetchDiscussions();
  };

  const handleDeleteDiscussion = async (discussionId: string) => {
    await client.deleteDiscussion(discussionId);
    fetchDiscussions();
  };

  const handleAddReply = async (discussionId: string) => {
    const text = replyTexts[discussionId];
    if (!text || !text.trim()) return;
    await client.addReply(discussionId, { text });
    setReplyTexts((prev) => ({ ...prev, [discussionId]: "" }));
    fetchDiscussions();
  };

  const handleEditReply = async (discussionId: string, replyId: string) => {
    if (!editingReplyText.trim()) return;
    await client.updateReply(discussionId, replyId, {
      text: editingReplyText,
    });
    setEditingReplyId(null);
    fetchDiscussions();
  };

  const handleDeleteReply = async (discussionId: string, replyId: string) => {
    await client.deleteReply(discussionId, replyId);
    fetchDiscussions();
  };

  return (
    <div>
      <h5>Followup Discussions</h5>

      {discussions.map((discussion: any) => (
        <div
          key={discussion._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "12px",
            marginBottom: "12px",
          }}
        >
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <Button
                variant={discussion.resolved ? "success" : "warning"}
                size="sm"
                className="me-2"
                onClick={() => handleToggleResolved(discussion)}
              >
                {discussion.resolved ? "Resolved" : "Unresolved"}
              </Button>
              <span style={{ fontSize: "0.85rem", fontWeight: "bold" }}>
                {discussion.authorName}
              </span>
              <span style={{ fontSize: "0.75rem", color: "#888", marginLeft: "8px" }}>
                {new Date(discussion.createdAt).toLocaleString()}
              </span>
            </div>
            {(isFaculty || currentUser?._id === discussion.author) && (
              <Dropdown>
                <DropdownToggle variant="outline-secondary" size="sm">
                  Actions
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      setEditingDiscussionId(discussion._id);
                      setEditingDiscussionText(discussion.text);
                    }}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleDeleteDiscussion(discussion._id)}
                    className="text-danger"
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>

          {editingDiscussionId === discussion._id ? (
            <div className="mb-2">
              <FormControl
                as="textarea"
                rows={2}
                value={editingDiscussionText}
                onChange={(e) => setEditingDiscussionText(e.target.value)}
                className="mb-2"
              />
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleEditDiscussion(discussion._id)}
                className="me-2"
              >
                Save
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditingDiscussionId(null)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div style={{ whiteSpace: "pre-wrap", marginBottom: "8px" }}>
              {discussion.text}
            </div>
          )}

          {/* Replies */}
          {discussion.replies &&
            discussion.replies.map((reply: any) => (
              <div
                key={reply._id}
                style={{
                  marginLeft: "24px",
                  padding: "8px",
                  borderLeft: "3px solid #3e7cb1",
                  marginBottom: "8px",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <div className="d-flex justify-content-between">
                  <div>
                    <span
                      style={{ fontSize: "0.85rem", fontWeight: "bold" }}
                    >
                      {reply.authorName}
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#888",
                        marginLeft: "8px",
                      }}
                    >
                      {new Date(reply.createdAt).toLocaleString()}
                    </span>
                  </div>
                  {(isFaculty || currentUser?._id === reply.author) && (
                    <Dropdown>
                      <DropdownToggle variant="outline-secondary" size="sm">
                        Actions
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() => {
                            setEditingReplyId(reply._id);
                            setEditingReplyText(reply.text);
                          }}
                        >
                          Edit
                        </DropdownItem>
                        <DropdownItem
                          onClick={() =>
                            handleDeleteReply(discussion._id, reply._id)
                          }
                          className="text-danger"
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  )}
                </div>
                {editingReplyId === reply._id ? (
                  <div className="mt-2">
                    <FormControl
                      as="textarea"
                      rows={2}
                      value={editingReplyText}
                      onChange={(e) => setEditingReplyText(e.target.value)}
                      className="mb-2"
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        handleEditReply(discussion._id, reply._id)
                      }
                      className="me-2"
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditingReplyId(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div style={{ whiteSpace: "pre-wrap", marginTop: "4px" }}>
                    {reply.text}
                  </div>
                )}
              </div>
            ))}

          {/* Reply input */}
          <div style={{ marginLeft: "24px", marginTop: "8px" }}>
            <FormControl
              size="sm"
              placeholder="Reply to this followup discussion"
              value={replyTexts[discussion._id] || ""}
              onChange={(e) =>
                setReplyTexts((prev) => ({
                  ...prev,
                  [discussion._id]: e.target.value,
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddReply(discussion._id);
                }
              }}
            />
          </div>
        </div>
      ))}

      {/* New discussion */}
      <div className="mt-3">
        <label className="fw-bold" style={{ fontSize: "0.9rem" }}>
          Start a new followup discussion
        </label>
        <FormControl
          as="textarea"
          rows={2}
          placeholder="Compose a new followup discussion"
          value={newDiscussionText}
          onChange={(e) => setNewDiscussionText(e.target.value)}
          className="mb-2"
        />
        <Button variant="primary" size="sm" onClick={handleCreateDiscussion}>
          Post Discussion
        </Button>
      </div>
    </div>
  );
}
