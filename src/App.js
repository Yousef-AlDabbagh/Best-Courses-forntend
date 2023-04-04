import React from "react";
import NotFound from "./components/user/NotFound";
import { Route, Routes } from "react-router-dom";
import ConfirmPassword from "./components/auth/ConfirmPassword";
import EmailVerification from "./components/auth/EmailVerification";
import ForgetPassword from "./components/auth/ForgetPassword";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Navbar from "./components/user/Navbar";
import AdminNavigator from "./navigator/AdminNavigator";
import { useAuth } from "./hooks";
import SingleCourse from "./components/user/SingleCourse";
import CourseReviews from "./components/user/CourseReviews";
import SearchCourses from "./components/user/SearchCourses";

export default function App() {
  
  // difeferent Navigator for admin
  const { authInfo } = useAuth();
  const isAdmin = authInfo.profile?.role === "admin";

  if (isAdmin) return <AdminNavigator />;
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/verification" element={<EmailVerification />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/reset-password" element={<ConfirmPassword />} />
        <Route path="/course/:courseId" element={<SingleCourse />} />
        <Route path="/course/reviews/:courseId" element={<CourseReviews />} />
        <Route path="/course/search" element={<SearchCourses />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
