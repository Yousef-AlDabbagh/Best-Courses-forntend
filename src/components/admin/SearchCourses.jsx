import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchCourseForAdmin } from "../../api/course";
import { useNotification } from "../../hooks";
import CourseListItem from "../CourseListItem";
import NotFoundText from "../NotFoundText";


export default function SearchCourses() {
  const [courses, setCourses] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("title");

  const { updateNotification } = useNotification();

  const searchCourses = async (val) => {
    const { error, results } = await searchCourseForAdmin(val);
    if (error) return updateNotification("error", error);

    if (!results.length) {
      setResultNotFound(true);
      return setCourses([]);
    }

    setResultNotFound(false);
    setCourses([...results]);
  };

  const handleAfterDelete = (course) => {
    const updatedCourses = courses.filter((c) => c.id !== course.id);
    setCourses([...updatedCourses]);
  };

  const handleAfterUpdate = (course) => {
    const updatedCourses = courses.map((c) => {
      if (c.id === course.id) return course;
      return c;
    });
    setCourses([...updatedCourses]);
  };

  useEffect(() => {
    if (query.trim()) searchCourses(query);
  }, [query]);

  return (
    <div className="p-5 space-y-3">
      <NotFoundText text="Record not found!" visible={resultNotFound} />
      {!resultNotFound &&
        courses.map((course) => {
          return <CourseListItem
           course={course} 
           afterDelete={handleAfterDelete}
              afterUpdate={handleAfterUpdate}


          key={course.id} />;
        })}
    </div>
  );
}
