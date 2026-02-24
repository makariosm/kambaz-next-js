"use client";
import { ReactNode, useMemo, useState } from "react";
import CourseNavigation from "./navigation";
import { useSelector } from "react-redux";
import { redirect, useParams } from "next/navigation";
import { RootState } from "../../store";
import { FaAlignJustify } from "react-icons/fa6";
import Breadcrumb from "./Breadcrumb";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer,
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const course = courses.find((course: any) => course._id === cid);
  const [showNav, setShowNav] = useState<boolean>(true);

  const isEnrolled = useMemo(() => {
    if (!currentUser || !cid) {
      return false;
    }
    return enrollments.some(
      (enrollment) =>
        enrollment.user === currentUser._id && enrollment.course === cid,
    );
  }, [cid, currentUser, enrollments]);

  if (!currentUser || !isEnrolled) {
    redirect("/dashboard");
  }

  return (
    <div id="wd-courses">
      <h2>
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => setShowNav(!showNav)}
        />
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        <div>{showNav && <CourseNavigation />}</div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
