/* eslint-disable */

import React, { useEffect, useState } from "react";
import { getTopRatedCourses } from "../../api/course";
import { useNotification } from "../../hooks";
import CourseList from "./CourseList";

export default function Morethanfiftyhours() {
  const [courses, setCourses] = useState([]);
  const { updateNotification } = useNotification();

  const fetchCourses = async (signal) => {
    const { error, courses } = await getTopRatedCourses(
      "More then fifty hours",
      signal
    );
    if (error) return updateNotification("error", error);

    setCourses([...courses]);
  };

  useEffect(() => {
    const ac = new AbortController();
    fetchCourses(ac.signal);
    return () => {
      ac.abort();
    };
  }, []);

  return (
    <CourseList courses={courses} title=" More than 50 hours Courses" />
  );
}
