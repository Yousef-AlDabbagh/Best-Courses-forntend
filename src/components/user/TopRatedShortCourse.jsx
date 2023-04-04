import React, { useEffect, useState } from "react";
import { getTopRatedCourses } from "../../api/course";
import { useNotification } from "../../hooks";
import CourseList from "./CourseList";

export default function TopRatedShortCourse() {
  const [courses, setCourses] = useState([]);
  const { updateNotification } = useNotification();

  const fetchCourses = async (signal) => {
    const { error, courses } = await getTopRatedCourses("Short Course",signal);
    if (error) return updateNotification("error", error);

    setCourses([...courses]);
  };

  useEffect(() => {
    const ac = new AbortController()
    fetchCourses(ac.signal);
    return ()=>{
      ac.abort()
    }
  }, []);

  return <CourseList courses={courses} title="Short Courses" />;
}
