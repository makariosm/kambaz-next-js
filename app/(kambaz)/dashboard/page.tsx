"use client";
import * as client from "../courses/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Button,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../courses/reducer";
import { setEnrollments } from "../enrollments/reducer";
import { RootState } from "../store";
import * as enrollmentsClient from "../enrollments/client";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer,
  );
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });
  const fetchCourses = async () => {
    try {
      const courses = showAllCourses
        ? await client.fetchAllCourses()
        : await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const enrollments = await enrollmentsClient.findMyEnrollments();
      dispatch(setEnrollments(enrollments));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    fetchCourses();
    fetchEnrollments();
  }, [currentUser, showAllCourses]);

  const isFaculty = currentUser?.role != "STUDENT";
  const userId = currentUser?._id;

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (enrollment) =>
        enrollment.user === userId && enrollment.course === courseId,
    );

  const visibleCourses = (() => {
    if (!currentUser) {
      return [];
    }
    if (showAllCourses) {
      return courses;
    }
    return courses.filter((course) => course && isEnrolled(course._id));
  })();
  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };
  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
  };

  const onEnroll = async (courseId: string) => {
    await client.enrollIntoCourse("current", courseId);
    await fetchEnrollments();
    if (!showAllCourses) {
      await fetchCourses();
    }
  };

  const onUnenroll = async (courseId: string) => {
    await client.unenrollFromCourse("current", courseId);
    await fetchEnrollments();
    if (!showAllCourses) {
      await fetchCourses();
    }
  };
  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        }),
      ),
    );
  };

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button
          variant="primary"
          className="btn btn-primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          Enrollments
        </Button>
      </div>
      <hr />
      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              {" "}
              Add{" "}
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={onUpdateCourse}
              id="wd-update-course-click"
            >
              Update{" "}
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">
        Published Courses ({visibleCourses.length})
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {currentUser &&
            visibleCourses.map((course, index) => (
              <Col
                key={index}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    href={`/courses/${course._id}/home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      src="/images/reactjs.jpg"
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <CardBody className="card-body">
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}{" "}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}{" "}
                      </CardText>
                      <Button variant="primary"> Go </Button>
                      {userId &&
                        (isEnrolled(course._id) ? (
                          <button
                            onClick={async (event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              await onUnenroll(course._id);
                            }}
                            className="btn btn-danger float-end"
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            onClick={async (event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              await onEnroll(course._id);
                            }}
                            className="btn btn-success float-end"
                          >
                            Enroll
                          </button>
                        ))}
                      {isFaculty && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              onDeleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end me-2"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}
