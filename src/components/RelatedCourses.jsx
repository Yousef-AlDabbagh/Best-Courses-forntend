import React, { useEffect, useState } from "react";
import { getRelatedCourses } from "../api/course";
import { useNotification } from "../hooks";
import CourseList from "./user/CourseList";

export default function RelatedCourses({ courseId }) {
  const [courses, setCourses] = useState([]);
  const { updateNotification } = useNotification();
  const fetchRelatedCourses = async () => {
    const { error, courses } = await getRelatedCourses(courseId);
    if (error) return updateNotification("error", error);

    setCourses([...courses]);
  };
  useEffect(() => {
    if (courseId) fetchRelatedCourses();
  }, [courseId]);
  return <CourseList title="Related Courses" courses={courses} />;
}
