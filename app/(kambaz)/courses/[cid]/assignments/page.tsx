"use client";
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

function AssignmentControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

export default function Assignments() {
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
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <LiaBookSolid className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link
                  href="/courses/1234/assignments/123"
                  className="wd-assignment-link text-decoration-none text-dark fw-bold"
                >
                  A1 - ENV + HTML
                </Link>
                <br />
                <span className="text-secondary small">
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May
                  13 at 11:59pm | 100 pts
                </span>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <LiaBookSolid className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link
                  href="/courses/1234/assignments/124"
                  className="wd-assignment-link text-decoration-none text-dark fw-bold"
                >
                  A2 - CSS + BOOTSTRAP
                </Link>
                <br />
                <span className="text-secondary small">
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <b>Not available until</b> May 13 at 12:00am | <b>Due</b> May
                  20 at 11:59pm | 100 pts
                </span>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <LiaBookSolid className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link
                  href="/courses/1234/assignments/125"
                  className="wd-assignment-link text-decoration-none text-dark fw-bold"
                >
                  A3 - JAVASCRIPT + REACT
                </Link>
                <br />
                <span className="text-secondary small">
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <b>Not available until</b> May 20 at 12:00am | <b>Due</b> May
                  27 at 11:59pm | 100 pts
                </span>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
