import Link from "next/link";
import { FormControl, FormSelect } from "react-bootstrap";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      {" "}
      <h1>Profile</h1>
      <FormControl
        id="wd-username"
        defaultValue="alice"
        placeholder="username"
        type="username"
        className="mb-2"
      />
      <FormControl
        id="wd-password"
        defaultValue="123"
        placeholder="password"
        type="password"
        className="mb-2"
      />
      <FormControl
        id="wd-firstname"
        defaultValue="Alice"
        placeholder="First Name"
        type="firstname"
        className="mb-2"
      />
      <FormControl
        id="wd-lastname"
        defaultValue="Wonderland"
        placeholder="Last Name"
        type="lastname"
        className="mb-2"
      />
      <FormControl
        id="wd-dob"
        defaultValue="2000-01-01"
        type="date"
        className="mb-2"
      />
      <FormControl
        id="wd-email"
        defaultValue="alice@wonderland"
        type="email"
        className="mb-2"
      />
      <FormSelect id="wd-submission-type" className="mb-3">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormSelect>
      <Link
        id="wd-signout-btn"
        href="signin"
        className="btn btn-danger w-100 mb-2"
      >
        Sign out
      </Link>
    </div>
  );
}
