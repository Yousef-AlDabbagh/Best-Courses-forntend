import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchPublicCourses } from "../../api/course";
import { useNotification } from "../../hooks";
import Container from "../Container";
import NotFoundText from "../NotFoundText";
import CourseList from "./CourseList";

export default function SearchCourses() {
  const [courses, setCourses] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("title");

  const { updateNotification } = useNotification();

  const searchCourses = async (val) => {
    const { error, results } = await searchPublicCourses(val);
    if (error) return updateNotification("error", error);

    if (!results.length) {
      setResultNotFound(true);
      return setCourses([]);
    }

    setResultNotFound(false);
    setCourses([...results]);
  };

  useEffect(() => {
    if (query.trim()) searchCourses(query);
  }, [query]);

  return (
    <div className="dark:bg-primary bg-white min-h-screen py-8">
      <Container className="px-2 xl:p-0">
        <NotFoundText text="Record not found!" visible={resultNotFound} />
        <CourseList courses={courses} />
      </Container>
    </div>
  );
}

