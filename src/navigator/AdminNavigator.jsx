import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Instructors from "../components/admin/Instructors";
import Dashboard from "../components/admin/Dashboard";
import Header from "../components/admin/Header";
import Courses from "../components/admin/Courses";
import CourseUpload from "../components/admin/CourseUpload";
import InstructorUpload from "../components/modals/InstructorUpload";
import NotFound from "../components/user/NotFound";
import AdminNavbar from "../components/admin/AdminNavbar";
import SearchCourses from "../components/admin/SearchCourses";

export default function AdminNavigator() {
  const [showCourseUploadModal, setShowCourseUploadModal] = useState(false);
  const [showInstructorUploadModal, setShowInstructorUploadModal] =
    useState(false);

  const displayCourseUploadModal = () => {
    setShowCourseUploadModal(true);
  };

  const hideCourseUploadModal = () => {
    setShowCourseUploadModal(false);
  };

  const displayInstructorUploadModal = () => {
    setShowInstructorUploadModal(true);
  };

  const hideInstructorUploadModal = () => {
    setShowInstructorUploadModal(false);
  };

  return (
    <>
      <div className="flex dark:bg-primary bg-white">
        <AdminNavbar />
        <div className="flex-1 p-2 max-w-screen-xl">
          <Header
            onAddCourseClick={displayCourseUploadModal}
            onAddInstructorClick={displayInstructorUploadModal}
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/instructors" element={<Instructors />} />
            <Route path="/search" element={<SearchCourses />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <CourseUpload
        visible={showCourseUploadModal}
        onClose={hideCourseUploadModal}
      />
      <InstructorUpload
        visible={showInstructorUploadModal}
        onClose={hideInstructorUploadModal}
      />
    </>
  );
}
