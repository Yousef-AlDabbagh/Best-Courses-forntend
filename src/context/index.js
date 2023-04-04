import React from "react";
import AuthProvider from "./AuthProvider";
import NotificationProvider from "./NotificationProvider";
import SearchProvider from "./SearchProvider";
import ThemeProvider from "./ThemeProvider";
import CoursesProvider from "./CoursesProvider";

// Context provides a way to pass data through the component tree without having to pass props down manually at every level.



export default function ContextProviders({ children }) {
  return (
    <NotificationProvider>
      <SearchProvider>
        <CoursesProvider>
          <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthProvider>
        </CoursesProvider>
      </SearchProvider>
    </NotificationProvider>
  );
}
