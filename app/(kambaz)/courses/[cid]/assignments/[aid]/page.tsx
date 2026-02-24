"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  Button,
  Col,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../../../assignments/reducer";
import { RootState } from "../../../../store";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer,
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const assignment = assignments.find((a: any) => a._id === aid);
  const isFaculty = currentUser && currentUser?.role != "STUDENT";

  const isNew = aid == "new";

  const [formData, setFormData] = useState(
    assignment
      ? {
          title: assignment.title,
          description: assignment.description,
          points: assignment.points,
          dueDate: assignment.dueDate,
          availableFrom: assignment.availableFrom,
          availableUntil: assignment.availableUntil,
        }
      : {
          title: "",
          description: "",
          points: 0,
          dueDate: "",
          availableFrom: "",
          availableUntil: "",
        },
  );

  const handleSave = () => {
    if (isNew) {
      dispatch(
        addAssignment({
          ...formData,
          course: cid,
        }),
      );
    } else {
      dispatch(
        updateAssignment({
          _id: aid,
          ...formData,
          course: cid,
        }),
      );
    }
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      <div className="mb-3">
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl
          id="wd-name"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          disabled={!isFaculty}
        />
      </div>

      <div className="mb-3">
        <FormControl
          as="textarea"
          id="wd-description"
          rows={6}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          disabled={!isFaculty}
        />
      </div>

      <Row className="mb-3">
        <FormLabel column sm={3} className="text-end">
          Points
        </FormLabel>
        <Col sm={9}>
          <FormControl
            type="number"
            id="wd-points"
            value={formData.points}
            onChange={(e) =>
              setFormData({
                ...formData,
                points: parseInt(e.target.value) || 0,
              })
            }
            disabled={!isFaculty}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <FormLabel column sm={3} className="text-end">
          Assignment Group
        </FormLabel>
        <Col sm={9}>
          <FormSelect id="wd-group" disabled={!isFaculty}>
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
          <FormSelect id="wd-display-grade-as" disabled={!isFaculty}>
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
            <FormSelect
              id="wd-submission-type"
              className="mb-3"
              disabled={!isFaculty}
            >
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
              disabled={!isFaculty}
            />

            <FormLabel className="fw-bold">Due</FormLabel>
            <FormControl
              type="datetime-local"
              id="wd-due-date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              className="mb-3"
              disabled={!isFaculty}
            />

            <Row>
              <Col sm={6}>
                <FormLabel className="fw-bold">Available from</FormLabel>
                <FormControl
                  type="datetime-local"
                  id="wd-available-from"
                  value={formData.availableFrom}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      availableFrom: e.target.value,
                    })
                  }
                  disabled={!isFaculty}
                />
              </Col>
              <Col sm={6}>
                <FormLabel className="fw-bold">Until</FormLabel>
                <FormControl
                  type="datetime-local"
                  id="wd-available-until"
                  value={formData.availableUntil}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      availableUntil: e.target.value,
                    })
                  }
                  disabled={!isFaculty}
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
        {isFaculty && (
          <Button variant="danger" size="lg" onClick={handleSave}>
            Save
          </Button>
        )}
      </div>
    </div>
  );
}
