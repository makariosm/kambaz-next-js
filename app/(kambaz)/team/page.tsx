"use client";

export default function TeamPage() {
  return (
    <div>
      <h1>Team Information</h1>
      <hr />

      <h3>Team Members</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Section</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Makarios Mansour</td>
            <td>02</td>
          </tr>
        </tbody>
      </table>

      <h3 className="mt-4">GitHub Repositories</h3>
      <ul>
        <li>
          <strong>Front End Project: </strong>
          <a
            href="https://github.com/makariosm/kambaz-next-js"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/makariosm/kambaz-next-js
          </a>
        </li>
        <li>
          <strong>Server Project: </strong>
          <a
            href="https://github.com/makariosm/kambaz-node-server-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/makariosm/kambaz-node-server-app
          </a>
        </li>
      </ul>
    </div>
  );
}
