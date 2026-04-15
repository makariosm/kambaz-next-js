"use client";
import { FaFolder } from "react-icons/fa";

export default function FolderFilters({
  folders,
  selectedFolder,
  onSelectFolder,
}: {
  folders: any[];
  selectedFolder: string | null;
  onSelectFolder: (folder: string | null) => void;
}) {
  return (
    <div
      className="overflow-auto text-nowrap"
      style={{
        backgroundColor: "#f0f0f0",
        padding: "6px 16px",
        borderBottom: "1px solid #ddd",
      }}
    >
      {folders.map((folder: any) => (
        <span
          key={folder._id}
          onClick={() =>
            onSelectFolder(
              selectedFolder === folder.name ? null : folder.name
            )
          }
          className="d-inline-flex align-items-center me-1"
          style={{
            padding: "4px 10px",
            cursor: "pointer",
            backgroundColor:
              selectedFolder === folder.name ? "#3e7cb1" : "transparent",
            color: selectedFolder === folder.name ? "white" : "#333",
            borderRadius: "4px",
            fontSize: "0.85rem",
          }}
        >
          <FaFolder className="me-1" style={{ fontSize: "0.75rem" }} />
          {folder.name}
        </span>
      ))}
    </div>
  );
}
