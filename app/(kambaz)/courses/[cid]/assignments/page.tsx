"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Button,
  FormControl,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaPlus } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { LiaBookSolid } from "react-icons/lia";
import GreenCheckmark from "../modules/GreenCheckmark";
import { assignments } from "../../../database";

function AssignmentControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

export default function Assignments() {
  const { cid } = useParams();
  const courseAssignments = assignments.filter((a) => a.course === cid);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dateStr = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${dateStr} at ${timeStr}`;
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup className="w-50">
          <InputGroupText className="bg-white">
            <FaSearch />
          </InputGroupText>
          <FormControl
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
        </InputGroup>
        <div className="text-nowrap">
          <Button
            variant="secondary"
            size="lg"
            className="me-2"
            id="wd-add-assignment-group"
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Group
          </Button>
          <Button variant="danger" size="lg" id="wd-add-assignment">
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Assignment
          </Button>
        </div>
      </div>

      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-assignments-list">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS
            <AssignmentControlButtons />
            <FaPlus
              className="float-end me-3 fs-5 position-relative"
              style={{ top: "3px" }}
            />
            <span className="float-end me-2">40% of Total</span>
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {courseAssignments.map((assignment) => (
              <ListGroupItem
                key={assignment._id}
                className="wd-lesson p-3 ps-1 d-flex align-items-center"
              >
                <BsGripVertical className="me-2 fs-3" />
                <LiaBookSolid className="me-3 fs-3 text-success" />
                <div className="flex-grow-1">
                  <Link
                    href={`/courses/${cid}/assignments/${assignment._id}`}
                    className="wd-assignment-link text-decoration-none text-dark fw-bold"
                  >
                    {assignment.title}
                  </Link>
                  <br />
                  <span className="text-secondary small">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <b>Not available until</b>{" "}
                    {formatDate(assignment.availableFrom)} | <b>Due</b>{" "}
                    {formatDate(assignment.dueDate)} | {assignment.points} pts
                  </span>
                </div>
                <AssignmentControlButtons />
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
