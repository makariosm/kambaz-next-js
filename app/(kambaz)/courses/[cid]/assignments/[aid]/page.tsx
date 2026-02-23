"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Col,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { assignments } from "../../../../database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = assignments.find((a) => a._id === aid);

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  return (
    <div id="wd-assignments-editor">
      <div className="mb-3">
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl id="wd-name" defaultValue={assignment.title} />
      </div>

      <div className="mb-3">
        <FormControl
          as="textarea"
          id="wd-description"
          rows={6}
          defaultValue={assignment.description}
        />
      </div>

      <Row className="mb-3">
        <FormLabel column sm={3} className="text-end">
          Points
        </FormLabel>
        <Col sm={9}>
          <FormControl type="number" id="wd-points" defaultValue={assignment.points} />
        </Col>
      </Row>

      <Row className="mb-3">
        <FormLabel column sm={3} className="text-end">
          Assignment Group
        </FormLabel>
        <Col sm={9}>
          <FormSelect id="wd-group">
            <option value="assignments">ASSIGNMENTS</option>
            <option value="quizzes">QUIZZES</option>
            <option value="exams">EXAMS</option>
            <option value="projects">PROJECTS</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3">
        <FormLabel column sm={3} className="text-end">
          Display Grade as
        </FormLabel>
        <Col sm={9}>
          <FormSelect id="wd-display-grade-as">
            <option value="percentage">Percentage</option>
            <option value="points">Points</option>
            <option value="letter">Letter</option>
            <option value="gpa">GPA</option>
            <option value="complete">Complete/Incomplete</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3">
        <FormLabel column sm={3} className="text-end">
          Submission Type
        </FormLabel>
        <Col sm={9}>
          <div className="border rounded p-3">
            <FormSelect id="wd-submission-type" className="mb-3">
              <option value="online">Online</option>
              <option value="on-paper">On Paper</option>
              <option value="external-tool">External Tool</option>
              <option value="no-submission">No Submission</option>
            </FormSelect>

            <FormLabel className="fw-bold">Online Entry Options</FormLabel>
            <FormCheck type="checkbox" id="wd-text-entry" label="Text Entry" />
            <FormCheck
              type="checkbox"
              id="wd-website-url"
              label="Website URL"
            />
            <FormCheck
              type="checkbox"
              id="wd-media-recordings"
              label="Media Recordings"
            />
            <FormCheck
              type="checkbox"
              id="wd-student-annotation"
              label="Student Annotation"
            />
            <FormCheck
              type="checkbox"
              id="wd-file-upload"
              label="File Uploads"
            />
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <FormLabel column sm={3} className="text-end">
          Assign
        </FormLabel>
        <Col sm={9}>
          <div className="border rounded p-3">
            <FormLabel className="fw-bold">Assign to</FormLabel>
            <FormControl
              id="wd-assign-to"
              defaultValue="Everyone"
              className="mb-3"
            />

            <FormLabel className="fw-bold">Due</FormLabel>
            <FormControl
              type="datetime-local"
              id="wd-due-date"
              defaultValue={assignment.dueDate}
              className="mb-3"
            />

            <Row>
              <Col sm={6}>
                <FormLabel className="fw-bold">Available from</FormLabel>
                <FormControl
                  type="datetime-local"
                  id="wd-available-from"
                  defaultValue={assignment.availableFrom}
                />
              </Col>
              <Col sm={6}>
                <FormLabel className="fw-bold">Until</FormLabel>
                <FormControl
                  type="datetime-local"
                  id="wd-available-until"
                  defaultValue={assignment.availableUntil}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <hr />

      <div className="d-flex justify-content-end">
        <Link href={`/courses/${cid}/assignments`}>
          <Button variant="secondary" size="lg" className="me-2">
            Cancel
          </Button>
        </Link>
        <Link href={`/courses/${cid}/assignments`}>
          <Button variant="danger" size="lg">
            Save
          </Button>
        </Link>
      </div>
    </div>
  );
}
