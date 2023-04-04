import React from "react";
import { Link } from "react-router-dom";
import { getPoster } from "../../utils/helper";
import GridContainer from "../GridContainer";
import RatingStar from "../RatingStar";

// To shorten the long name
const trimTitle = (text = "") => {
  if (text.length <= 20) return text;
  return text.substring(0, 20) + "..";
};

export default function CourseList({ title, courses = [] }) {
  if (!courses.length) return null;
  return (
    <div>
  
      {title ? (
        <h1 className="text-2xl dark:text-white text-secondary font-semibold mb-5">
          {title}
        </h1>
      ) : null}
      <GridContainer>
        {courses.map((course) => {
          return <ListItem key={course.id} course={course} />;
        })}
      </GridContainer>
    </div>
  );
}

const ListItem = ({ course }) => {
  const { id, title, responsivePosters, poster, reviews } = course;
  return (
    <Link to={"/course/" + id}>
      <img
        className="aspect-video object-cover w-full"
        src={getPoster(responsivePosters) || poster}
        alt={title}
      />
      <h1
        className="text-lg dark:text-white text-secondary font-semibold"
        title={title}
      >
        {trimTitle(title)}
      </h1>
      <RatingStar rating={reviews.ratingAvg} />
    </Link>
  );
};
