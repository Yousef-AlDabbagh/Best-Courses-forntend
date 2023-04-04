import React, { useState, createContext } from "react";
import { getCourses } from "../api/course";
import { useNotification } from "../hooks";

// courses provider is used to fetch courses 

export const CourseContext = createContext(); 

const limit = 5;
let currentPageNo = 0;
const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [latestUploads, setLatestUploads] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);

  const { updateNotification } = useNotification();

  const fetchLatestUploads = async (qty = 5) => {
    const { error, courses } = await getCourses(0, qty);
    if (error) return updateNotification("error", error); 

    setLatestUploads([...courses]);
  };

  const fetchCourses = async (pageNo = currentPageNo) => {
    const { error, courses } = await getCourses(pageNo, limit);
    if (error) updateNotification("error", error);

    if (!courses.length) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }

    setCourses([...courses]);
  };

  const fetchNextPage = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchCourses(currentPageNo);
  };

  const fetchPrevPage = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);

    currentPageNo -= 1;
    fetchCourses(currentPageNo);
  };
 
  return (
    <CourseContext.Provider
      value={{
        courses,
        latestUploads,
        fetchLatestUploads,
        fetchCourses,
        fetchNextPage,
        fetchPrevPage,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CoursesProvider;
