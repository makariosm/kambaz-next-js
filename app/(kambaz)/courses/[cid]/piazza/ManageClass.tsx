"use client";
import { useState } from "react";
import { Button, FormControl, FormCheck } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import {
  setFolders,
  addFolder,
  removeFolder,
  updateFolderInList,
} from "./foldersReducer";
import * as client from "./client";

export default function ManageClass({ courseId }: { courseId: string }) {
  const dispatch = useDispatch();
  const { folders } = useSelector(
    (state: RootState) => state.pazzaFoldersReducer
  );

  const [newFolderName, setNewFolderName] = useState("");
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editingFolderName, setEditingFolderName] = useState("");
  const [selectedForDelete, setSelectedForDelete] = useState<string[]>([]);

  const handleAddFolder = async () => {
    if (!newFolderName.trim()) return;
    const folder = await client.createFolder(courseId, {
      name: newFolderName.trim(),
    });
    dispatch(addFolder(folder));
    setNewFolderName("");
  };

  const handleSaveEdit = async (folderId: string) => {
    if (!editingFolderName.trim()) return;
    const updated = await client.updateFolder(folderId, {
      name: editingFolderName.trim(),
    });
    dispatch(updateFolderInList(updated));
    setEditingFolderId(null);
    setEditingFolderName("");
  };

  const handleCancelEdit = () => {
    setEditingFolderId(null);
    setEditingFolderName("");
  };

  const handleDeleteSelected = async () => {
    for (const folderId of selectedForDelete) {
      await client.deleteFolder(folderId);
      dispatch(removeFolder(folderId));
    }
    setSelectedForDelete([]);
  };

  const toggleSelectForDelete = (folderId: string) => {
    if (selectedForDelete.includes(folderId)) {
      setSelectedForDelete(selectedForDelete.filter((id) => id !== folderId));
    } else {
      setSelectedForDelete([...selectedForDelete, folderId]);
    }
  };

  return (
    <div>
      <h4>Manage Class</h4>
      <hr />

      <h5>Configure Class Folders</h5>
      <p style={{ fontSize: "0.9rem", color: "#666" }}>
        Folders allow you to keep class content organized. When students and
        instructors add a new post, they will be required to specify at least
        one folder for their post.
      </p>

      <div className="mb-4">
        <label className="fw-bold">Create new folder:</label>
        <div className="d-flex mt-2">
          <FormControl
            placeholder="Add a folder"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddFolder();
            }}
            className="me-2"
          />
          <Button variant="primary" onClick={handleAddFolder}>
            Add Folder
          </Button>
        </div>
      </div>

      <div className="mb-3">
        <label className="fw-bold">Manage folders:</label>
        {selectedForDelete.length > 0 && (
          <Button
            variant="danger"
            size="sm"
            className="ms-3"
            onClick={handleDeleteSelected}
          >
            Delete selected folders ({selectedForDelete.length})
          </Button>
        )}
      </div>

      <div>
        {folders.map((folder: any) => (
          <div
            key={folder._id}
            className="d-flex align-items-center mb-2"
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <FormCheck
              type="checkbox"
              checked={selectedForDelete.includes(folder._id)}
              onChange={() => toggleSelectForDelete(folder._id)}
              className="me-3"
            />

            {editingFolderId === folder._id ? (
              <>
                <FormControl
                  value={editingFolderName}
                  onChange={(e) => setEditingFolderName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveEdit(folder._id);
                  }}
                  className="me-2"
                  style={{ maxWidth: "300px" }}
                />
                <Button
                  variant="success"
                  size="sm"
                  className="me-2"
                  onClick={() => handleSaveEdit(folder._id)}
                >
                  Save
                </Button>
                <Button variant="secondary" size="sm" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <span
                  style={{
                    flex: 1,
                    backgroundColor: "#3e7cb1",
                    color: "white",
                    padding: "2px 10px",
                    borderRadius: "4px",
                    maxWidth: "300px",
                  }}
                >
                  {folder.name}
                </span>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="ms-3"
                  onClick={() => {
                    setEditingFolderId(folder._id);
                    setEditingFolderName(folder.name);
                  }}
                >
                  Edit
                </Button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
