import { FaTrash } from "react-icons/fa";

export default function AssignmentControlButtons({
  assignmentId,
  deleteAssignment,
}: {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
}) {
  return (
    <div className="float-end">
      <FaTrash
        className="text-danger me-2"
        onClick={() => deleteAssignment(assignmentId)}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
