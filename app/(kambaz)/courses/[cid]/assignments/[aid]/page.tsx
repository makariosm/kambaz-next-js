import {
  Button,
  Col,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <div className="mb-3">
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl id="wd-name" defaultValue="A1 - ENV + HTML" />
      </div>

      <div className="mb-3">
        <FormControl
          as="textarea"
          id="wd-description"
          rows={6}
          defaultValue="The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page."
        />
      </div>

      <Row className="mb-3">
        <FormLabel column sm={3} className="text-end">
          Points
        </FormLabel>
        <Col sm={9}>
          <FormControl type="number" id="wd-points" defaultValue={100} />
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
              defaultValue="2024-05-13T23:59"
              className="mb-3"
            />

            <Row>
              <Col sm={6}>
                <FormLabel className="fw-bold">Available from</FormLabel>
                <FormControl
                  type="datetime-local"
                  id="wd-available-from"
                  defaultValue="2024-05-06T00:00"
                />
              </Col>
              <Col sm={6}>
                <FormLabel className="fw-bold">Until</FormLabel>
                <FormControl
                  type="datetime-local"
                  id="wd-available-until"
                  defaultValue="2024-05-20T23:59"
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <hr />

      <div className="d-flex justify-content-end">
        <Button variant="secondary" size="lg" className="me-2">
          Cancel
        </Button>
        <Button variant="danger" size="lg">
          Save
        </Button>
      </div>
    </div>
  );
}
