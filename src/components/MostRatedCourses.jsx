/* eslint-disable */
import React, { useEffect, useState } from "react";
import { getMostRatedCourses } from "../api/admin";
import { useNotification } from "../hooks";
import { convertReviewCount } from "../utils/helper";
import RatingStar from "./RatingStar";

export default function MostRatedCourses() {
  const [courses, setCourses] = useState([]);

  const { updateNotification } = useNotification();
  const fetchMostRatedCourses = async () => {
    const { error, courses } = await getMostRatedCourses();
    if (error) return updateNotification("error", error);

    setCourses([...courses]);
  };

  useEffect(() => {
    fetchMostRatedCourses();
  }, []);
  return (
    <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 rounded">
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        Most Rated Courses
      </h1>
      <ul className="space-y-3">
        {courses.map((course) => {
          return (
            <li key={course.id}>
              <h1 className="dark:text-white text-secondary font-semibold">
                {course.title}
              </h1>
              <div className="flex space-x-2">
                <RatingStar rating={course.reviews?.ratingAvg} />
                <p className="text-light-subtle dark:text-dark-subtle">
                  {convertReviewCount(course.reviews?.reviewCount)} Reviews
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
