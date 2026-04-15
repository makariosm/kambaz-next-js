"use client";
import { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import {
  FaCaretLeft,
  FaCaretRight,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

function getDateCategory(dateStr: string): string {
  const postDate = new Date(dateStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);

  if (postDate >= today) return "TODAY";
  if (postDate >= yesterday) return "YESTERDAY";
  if (postDate >= lastWeekStart) return "LAST WEEK";

  const day = postDate.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(postDate);
  monday.setDate(postDate.getDate() + mondayOffset);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return `${monday.getMonth() + 1}/${monday.getDate()} - ${sunday.getMonth() + 1}/${sunday.getDate()}`;
}

function groupPostsByCategory(posts: any[]) {
  const groups: { [key: string]: any[] } = {};
  const order: string[] = [];
  for (const post of posts) {
    const cat = getDateCategory(post.createdAt);
    if (!groups[cat]) {
      groups[cat] = [];
      order.push(cat);
    }
    groups[cat].push(post);
  }
  return { groups, order };
}

export default function ListOfPosts({
  posts,
  selectedPost,
  onSelectPost,
  onNewPost,
  searchText,
  onSearchChange,
  selectedFolder,
  showSidebar,
  onToggleSidebar,
}: {
  posts: any[];
  selectedPost: any;
  onSelectPost: (post: any) => void;
  onNewPost: () => void;
  searchText: string;
  onSearchChange: (text: string) => void;
  selectedFolder: string | null;
  showSidebar: boolean;
  onToggleSidebar: () => void;
}) {
  const [collapsedCategories, setCollapsedCategories] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleCategory = (cat: string) => {
    setCollapsedCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  let filteredPosts = posts;
  if (selectedFolder) {
    filteredPosts = filteredPosts.filter(
      (p: any) => p.folders && p.folders.includes(selectedFolder)
    );
  }
  if (searchText.trim()) {
    const lower = searchText.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (p: any) =>
        (p.summary && p.summary.toLowerCase().includes(lower)) ||
        (p.details && p.details.toLowerCase().includes(lower))
    );
  }

  const { groups, order } = groupPostsByCategory(filteredPosts);

  if (!showSidebar) {
    return (
      <div
        className="d-flex align-items-start"
        style={{
          borderRight: "1px solid #ddd",
          padding: "8px",
        }}
      >
        <FaCaretRight
          onClick={onToggleSidebar}
          style={{ cursor: "pointer", fontSize: "1.2rem", marginTop: "4px" }}
        />
      </div>
    );
  }

  return (
    <div
      className="overflow-auto"
      style={{
        width: "320px",
        minWidth: "320px",
        borderRight: "1px solid #ddd",
        backgroundColor: "#fafafa",
      }}
    >
      <div style={{ padding: "8px" }}>
        <div className="d-flex align-items-center mb-2">
          <FaCaretLeft
            onClick={onToggleSidebar}
            style={{ cursor: "pointer", fontSize: "1.2rem", marginRight: "8px" }}
          />
          <span style={{ fontSize: "0.8rem", color: "#888" }}>
            Unread &nbsp; Updated &nbsp; Unresolved &nbsp; Following
          </span>
        </div>
        <div className="d-flex mb-2">
          <Button
            variant="primary"
            size="sm"
            onClick={onNewPost}
            className="me-2"
          >
            New Post
          </Button>
          <FormControl
            size="sm"
            placeholder="Search or add a post..."
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {order.map((category) => (
        <div key={category}>
          <div
            onClick={() => toggleCategory(category)}
            className="d-flex align-items-center fw-bold"
            style={{
              padding: "6px 12px",
              backgroundColor: "#e8e8e8",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            {collapsedCategories[category] ? (
              <FaChevronRight className="me-2" style={{ fontSize: "0.65rem" }} />
            ) : (
              <FaChevronDown className="me-2" style={{ fontSize: "0.65rem" }} />
            )}
            {category}
          </div>
          {!collapsedCategories[category] &&
            groups[category].map((post: any) => (
              <div
                key={post._id}
                onClick={() => onSelectPost(post)}
                style={{
                  padding: "8px 12px",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                  backgroundColor:
                    selectedPost && selectedPost._id === post._id
                      ? "#d4e6f1"
                      : "white",
                }}
              >
                <div className="d-flex justify-content-between">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="d-flex align-items-center mb-1">

                      {post.authorRole === "FACULTY" && (
                        <span
                          style={{
                            backgroundColor: "#ffc107",
                            color: "#333",
                            fontSize: "0.65rem",
                            padding: "1px 4px",
                            borderRadius: "2px",
                            marginRight: "5px",
                            fontWeight: "bold",
                          }}
                        >
                          Instr
                        </span>
                      )}
                      <strong
                        style={{
                          fontSize: "0.85rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {post.summary}
                      </strong>
                    </div>
                    <div
                      className="text-nowrap overflow-hidden"
                      style={{
                        fontSize: "0.75rem",
                        color: "#666",
                        textOverflow: "ellipsis",
                        maxHeight: "2.6em",
                      }}
                    >
                      {post.details
                        ? post.details.substring(0, 120)
                        : ""}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "#999",
                      marginLeft: "8px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {new Date(post.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
        </div>
      ))}

      {filteredPosts.length === 0 && (
        <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>
          No posts found.
        </div>
      )}
    </div>
  );
}
