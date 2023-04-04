import React, { useEffect } from "react";
import { useCourses } from "../hooks";

import CourseListItem from "./CourseListItem";




export default function LatestUploads() {
 
const { fetchLatestUploads, latestUploads } = useCourses();


const handleUIUpdate = () => fetchLatestUploads();

  useEffect(() => {
    fetchLatestUploads();
  }, []);

  return (
    <>
      <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 rounded col-span-2">
        <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
          Recent Uploads
        </h1>
        <div className="space-y-3">
          {latestUploads.map((course) => {
            return (
              <CourseListItem
                course={course}
                key={course.id}
                afterDelete={handleUIUpdate}
                afterUpdate={handleUIUpdate}

              />
            );
          })}
        </div>
      </div>
     
    </>
  );
}

