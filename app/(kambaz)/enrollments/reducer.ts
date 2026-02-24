import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../database";
import { v4 as uuidv4 } from "uuid";

type Enrollment = {
  _id: string;
  user: string;
  course: string;
};

type EnrollmentState = {
  enrollments: Enrollment[];
};

const initialState: EnrollmentState = {
  enrollments: enrollments as Enrollment[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollCourse: (state, { payload }) => {
      const { userId, courseId } = payload;
      const alreadyEnrolled = state.enrollments.some(
        (enrollment) =>
          enrollment.user === userId && enrollment.course === courseId,
      );
      if (alreadyEnrolled) {
        return;
      }
      state.enrollments = [
        ...state.enrollments,
        { _id: uuidv4(), user: userId, course: courseId },
      ];
    },
    unenrollCourse: (state, { payload }) => {
      const { userId, courseId } = payload;
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          !(enrollment.user === userId && enrollment.course === courseId),
      );
    },
  },
});

export const { enrollCourse, unenrollCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
