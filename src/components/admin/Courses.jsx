import React, {useEffect } from "react";
import { useCourses} from "../../hooks";
import CourseListItem from "../CourseListItem";
import NextAndPrevButton from "../NextAndPrevButton";

export default function Courses() {

  const {
    fetchCourses,
    fetchPrevPage,
    fetchNextPage,
    courses: newCourses,
  } = useCourses();

  const handleUIUpdate = () => fetchCourses();

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <div className="space-y-3 p-5">
        {newCourses.map((course) => {
          return (
            <CourseListItem
              key={course.id}
              course={course}
              afterDelete={handleUIUpdate}
              afterUpdate={handleUIUpdate}
            />
          );
        })}
        <NextAndPrevButton
          className="mt-5"
          onNextClick={fetchNextPage}
          onPrevClick={fetchPrevPage}
        />
      </div>
    </>
  );
}
