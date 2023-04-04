import React, { useEffect, useState } from "react";
import { getAppInfo } from "../../api/admin";
import { useNotification } from "../../hooks";
import AppInfoBox from "../AppInfoBox";
import LatestUploads from "../LatestUploads";
import MostRatedCourses from "../MostRatedCourses";

export default function Dashboard() {
  const [appInfo, setAppInfo] = useState({
    courseCount: 0,
    reviewCount: 0,
    userCount: 0,
  });

  const { updateNotification } = useNotification();

  const fetchAppInfo = async () => {
    const { appInfo, error } = await getAppInfo();
    if (error) return updateNotification("erroe", error);

    setAppInfo({ ...appInfo });
  };

  useEffect(() => {
    fetchAppInfo();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-5 my-5">
      <AppInfoBox
        title="Total Uploads"
        subTitle={appInfo.courseCount.toLocaleString()}
      />
      <AppInfoBox
        title="Total Reviews"
        subTitle={appInfo.reviewCount.toLocaleString()}
      />
      <AppInfoBox
        title="Total Users"
        subTitle={appInfo.userCount.toLocaleString()}
      />

      <LatestUploads />
      <MostRatedCourses />
    </div>
  );
}
