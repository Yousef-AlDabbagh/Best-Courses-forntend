/* eslint-disable */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleCourse } from "../../api/course";
import { useAuth, useNotification } from "../../hooks";
import { convertReviewCount } from "../../utils/helper";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import AddRatingModal from "../modals/AddRatingModal";
import ProfileModal from "../modals/ProfileModal";
import RatingStar from "../RatingStar";
import RelatedCourses from "../RelatedCourses";



const convertDate = (date = "") => {
  return date.split("T")[0];
};
export default function SingleCourse() {
  const [ready, setReady] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState({});
  const [course, setCourse] = useState({});

  const { courseId } = useParams();
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const navigate = useNavigate();

  const fechCourse = async () => {
    const { error, course } = await getSingleCourse(courseId);
    if (error) return updateNotification("error", error);

    setReady(true);
    setCourse(course);
  };
  
  // Check if user is logged in or not in order to be able to rate and comment
  const handleOnRateCourse = () => {
    if (!isLoggedIn) return navigate("/auth/signin");
    setShowRatingModal(true);
  };
  const hideRatingModal = () => {
    setShowRatingModal(false);
  };

  const handleOnRatingSuccess = (reviews) => {
    setCourse({ ...course, reviews: { ...reviews } });
  };

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
    setShowProfileModal(true);
  };

  const hideProfileModal = () => {
    setShowProfileModal(false);
  };
  
  useEffect(() => {
    if (courseId) fechCourse();
  }, [courseId]);

  if (!ready)
    return (
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
        <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
          Please wait...
        </p>
      </div>
    );

  const {
    id,
    trailer,
    poster,
    title,
    overView,
    language,
    releseDate,
    tags,
    donor = {},
    reviews = {},
    team = [],
    genres = [],
  } = course;
  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="xl:px-0 px-2">
        <video poster={poster} controls src={trailer}></video>
        <div className="flex justify-between">
          <h1 className="xl:text-4xl lg:text-3xl text-2xl text-highlight dark:text-highlight-dark font-semibold py-3">
            {title}
          </h1>
          <div className="flex flex-col items-end">
            <RatingStar rating={reviews.ratingAvg} />
            <CustomButtonLink
              label={convertReviewCount(reviews.reviewCount) + " Reviews"}
              onClick={() => navigate("/course/reviews/" + id)}
            />
            <CustomButtonLink
              label="Rate The Course"
              onClick={handleOnRateCourse}
            />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-light-subtle dark:text-dark-subtle">{overView}</p>

          <ListWithLabel label={"Donor:"}>
            <CustomButtonLink
              label={donor.name}
              onClick={() => handleProfileClick(donor)}
            />
          </ListWithLabel>

          <ListWithLabel label={"Lead Instructor:"}>
            {team.map(({ id, profile, leadInstructor }) => {
              return leadInstructor ? (
                <CustomButtonLink label={profile.name} key={id} />
              ) : null;
            })}
          </ListWithLabel>

          <ListWithLabel label={"Language:"}>
            <CustomButtonLink label={language} clickable={false} />
          </ListWithLabel>

          <ListWithLabel label={"Relese Date:"}>
            <CustomButtonLink
              label={convertDate(releseDate)}
              clickable={false}
            />
          </ListWithLabel>

          <ListWithLabel label={"Genres:"}>
            {genres.map((g) => (
              <CustomButtonLink label={g} key={g} clickable={false} />
            ))}
          </ListWithLabel>

          <ListWithLabel label={"Type:"}>
            <CustomButtonLink label={"More Than 50 hours"} clickable={false} />
          </ListWithLabel>

          <ListWithLabel label={"Tags:"}>
            <CustomButtonLink label={tags} clickable={false} />
          </ListWithLabel>

          <TeamProfiles team={team} />
          <RelatedCourses courseId={courseId} />
        </div>
      </Container>

      <ProfileModal
        visible={showProfileModal}
        onClose={hideProfileModal}
        profileId={selectedProfile.id}
      />
      <AddRatingModal
        visible={showRatingModal}
        onClose={hideRatingModal}
        onSuccess={handleOnRatingSuccess}
      />
    </div>
  );
}

const ListWithLabel = ({ children, label }) => {
  return (
    <div className="flex space-x-2">
      <p className="text-light-subtle dark:text-dark-subtle font-semibold">
        {label}
      </p>
      {children}
    </div>
  );
};

const TeamProfiles = ({ team }) => {
  return (
    <div className="">
      <h1 className="text-light-subtle dark:text-dark-subtle font-semibold text-2xl mb-2">
        Team:
      </h1>
      <div className="flex flex-wrap space-x-4">
        {team.map(({ id, profile }) => {
          return (
            <div
              key={id}
              className="basis-28 flex flex-col items-center text-center mb-4"
            >
              <img
                className="w-24 h-24 aspect-square object-cover rounded-full"
                src={profile.avatar}
                alt=""
              />
              <CustomButtonLink label={profile.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
