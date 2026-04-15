"use client";
import { useEffect, useState } from "react";
import * as client from "./client";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function ClassAtAGlance({ courseId }: { courseId: string }) {
  const [stats, setStats] = useState<any>(null);
  const { courses } = useSelector(
    (state: RootState) => state.coursesReducer
  );

  const fetchStats = async () => {
    try {
      const data = await client.getStats(courseId);
      const users = await client.findUsersForCourse(courseId);
      setStats({ ...data, studentsEnrolled: users.length });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [courseId]);

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Class at a Glance</h3>
      <hr />
      <table className="table">
        <tbody>
          <tr>
            <td>
              {stats.unreadPosts === 0 ? (
                <FaCheckCircle className="text-success me-2" />
              ) : (
                <FaTimesCircle className="text-danger me-2" />
              )}
              {stats.unreadPosts === 0
                ? "no unread posts"
                : `${stats.unreadPosts} unread posts`}
            </td>
            <td>
              <strong>{stats.totalPosts}</strong> total posts
            </td>
          </tr>
          <tr>
            <td>
              {stats.unansweredQuestions === 0 ? (
                <FaCheckCircle className="text-success me-2" />
              ) : (
                <FaTimesCircle className="text-danger me-2" />
              )}
              {stats.unansweredQuestions === 0
                ? "no unanswered questions"
                : `${stats.unansweredQuestions} unanswered questions`}
            </td>
            <td>
              <strong>{stats.instructorResponses}</strong> instructors&apos;
              responses
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <strong>{stats.studentResponses}</strong> students&apos; responses
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <strong>{stats.studentsEnrolled}</strong> students enrolled
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
