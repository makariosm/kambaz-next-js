export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
        your Web application running on Netlify. The landing page should include
        the following: Your full name and section Links to each of the lab
        assignments Link to the Kanbas application Links to all relevant source
        code repositories The Kanbas application should include a link to
        navigate back to the landing page.
      </textarea>
      <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option value="assignments">ASSIGNMENTS</option>
                <option value="quizzes">QUIZZES</option>
                <option value="exams">EXAMS</option>
                <option value="projects">PROJECTS</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option value="percentage">Percentage</option>
                <option value="points">Points</option>
                <option value="letter">Letter</option>
                <option value="gpa">GPA</option>
                <option value="complete">Complete/Incomplete</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option value="online">Online</option>
                <option value="on-paper">On Paper</option>
                <option value="external-tool">External Tool</option>
                <option value="no-submission">No Submission</option>
              </select>

              <br />
              <br />
              <label>
                <b>Online Entry Options</b>
              </label>
              <br />
              <input type="checkbox" id="wd-text-entry" />
              <label htmlFor="wd-text-entry">Text Entry</label>
              <br />
              <input type="checkbox" id="wd-website-url" />
              <label htmlFor="wd-website-url">Website URL</label>
              <br />
              <input type="checkbox" id="wd-media-recordings" />
              <label htmlFor="wd-media-recordings">Media Recordings</label>
              <br />
              <input type="checkbox" id="wd-student-annotation" />
              <label htmlFor="wd-student-annotation">Student Annotation</label>
              <br />
              <input type="checkbox" id="wd-file-upload" />
              <label htmlFor="wd-file-upload">File Uploads</label>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label>Assign</label>
            </td>
            <td>
              <label htmlFor="wd-assign-to">
                <b>Assign to</b>
              </label>
              <br />
              <input id="wd-assign-to" defaultValue="Everyone" />
              <br />
              <br />

              <label htmlFor="wd-due-date">
                <b>Due</b>
              </label>
              <br />
              <input type="date" id="wd-due-date" defaultValue="2024-05-13" />
              <br />
              <br />

              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="wd-available-from">
                        <b>Available from</b>
                      </label>
                      <br />
                      <input
                        type="date"
                        id="wd-available-from"
                        defaultValue="2024-05-06"
                      />
                    </td>
                    <td>
                      <label htmlFor="wd-available-until">
                        <b>Until</b>
                      </label>
                      <br />
                      <input
                        type="date"
                        id="wd-available-until"
                        defaultValue="2024-05-20"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <button>Cancel</button>
      <button>Save</button>
    </div>
  );
}
