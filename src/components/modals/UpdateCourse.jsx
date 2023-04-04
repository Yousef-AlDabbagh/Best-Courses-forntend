import React, { useState ,useEffect } from "react";
import {getCourseForUpdate, updateCourse } from "../../api/course";
import { useNotification } from "../../hooks";
import CourseForm from "../admin/CourseForm";
import ModalContainer from "./ModalContainer";

export default function UpdateCourse({
  visible,
  courseId,  
  onSuccess,
}) {
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, course, message } = await updateCourse(courseId, data);
    setBusy(false);
    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    onSuccess(course);
  };



  const fetchCourseToUpdate = async () => {
    const { course, error } = await getCourseForUpdate(courseId);
    if (error) return updateNotification("error", error);
    setSelectedCourse(course);
    setReady(true);
  };

  useEffect(() => {
    if (courseId) fetchCourseToUpdate();
  }, [courseId]);



  return (
    <ModalContainer visible={visible} >
     {ready ?  (
        <CourseForm
          initialState={selectedCourse}
          btnTitle="Update"
          onSubmit={!busy ? handleSubmit : null}
          busy={busy}
        />
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-light-subtle dark:text-dark-subtle animate-pulse text-xl">
            Please wait...
          </p>
        </div>
      )}
    </ModalContainer>
  );
}
