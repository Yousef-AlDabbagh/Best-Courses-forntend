// we will have two section for the course form
import React, { useState, useEffect } from "react";
import { useNotification } from "../../hooks";
import { commonInputClasses } from "../../utils/theme";
import Submit from "../form/Submit";
import TagsInput from "../TagsInput";
import TeamForm from "../form/TeamForm";
import TeamModal from "../modals/TeamModal";
import PosterSelector from "../PosterSelector";
import GenresSelector from "../GenresSelector";
import GenresModal from "../modals/GenresModal";
import Selector from "../Selector";
import {
  languageOptions,
  statusOptions,
  typeOptions,
} from "../../utils/options";
import Label from "../Label";
import DonorSelector from "../DonorSelector";
import ViewAllBtn from "../ViewAllButton";
import LabelWithBadge from "../LabelWithBadge";
import { validateCourse } from "../../utils/validator";


const defaultCourseInfo = {
  title: "",
  overView: "",
  donor: "",
  releseDate: "",
  status: "",
  type: "",
  tags: [],
  team: [],
  poster: null,
  genres: [],
  language: "",
};

export default function CourseForm({ onSubmit, btnTitle, initialState, busy }) {
  const [courseInfo, setCourseInfo] = useState({ ...defaultCourseInfo });
  const [showTeamModal, setshowTeamModal] = useState(false);
  const [showGenresModal, setShowGenresModal] = useState(false);
  const [selectedPosterForUI, setSelectedPosterForUI] = useState("");

  const { updateNotification } = useNotification();

  /**************************************************************************************/
  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateCourse(courseInfo);
    if (error) return updateNotification("error", error);
    const { tags, genres, team, donor, poster } = courseInfo;

    const formData = new FormData();
    const finalCourseInfo = {
      ...courseInfo,
    };

    finalCourseInfo.tags = JSON.stringify(tags);
    finalCourseInfo.genres = JSON.stringify(genres);

    const finalTeam = team.map((t) => ({
      instructor: t.profile.id,
      leadInstructor: t.leadInstructor,
    }));
    finalCourseInfo.team = JSON.stringify(finalTeam);

    if (donor.id) finalCourseInfo.donor = donor.id;
    if (poster) finalCourseInfo.poster = poster;

    for (let key in finalCourseInfo) {
      formData.append(key, finalCourseInfo[key]);
    }

    onSubmit(formData);
  };

  /**************************************************************************************/

  const updatePosterForUI = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedPosterForUI(url);
  };

  /**************************************************************************************/

  const handleChange = ({ target }) => {
    const { value, name, files } = target;
    if (name === "poster") {
      const poster = files[0];
      updatePosterForUI(poster);
      return setCourseInfo({ ...courseInfo, poster });
    }
    setCourseInfo({ ...courseInfo, [name]: value });
  };

  /**************************************************************************************/
  const updateTags = (tags) => {
    setCourseInfo({ ...courseInfo, tags });
  };

  /**************************************************************************************/

  const updateDonor = (profile) => {
    setCourseInfo({ ...courseInfo, donor: profile });
  };
     /**************************************************************************************/

  const updateTeam = (teamInfo) => {
    const { team } = courseInfo;
    setCourseInfo({ ...courseInfo, team: [...team, teamInfo] });
  };

  /**************************************************************************************/

  const updateGenres = (genres) => {
    setCourseInfo({ ...courseInfo, genres });
  };

   /**************************************************************************************/

  const hideTeamModal = () => {
    setshowTeamModal(false);
  };

  /**************************************************************************************/

  const displayTeamModal = () => {
    setshowTeamModal(true);
  };

  /**************************************************************************************/

  const hideGenresModal = () => {
    setShowGenresModal(false);
  };

  /**************************************************************************************/

  const displayGenresModal = () => {
    setShowGenresModal(true);
  };

    /**************************************************************************************/

  const handleTeamRemove = (profileId) => {
    const { team } = courseInfo;
    const newTeam = team.filter(({ profile }) => profile.id !== profileId);
    if (!newTeam.length) hideTeamModal();
    setCourseInfo({ ...courseInfo, team: [...newTeam] });
  };

  useEffect(() => {
    if (initialState) {
      setCourseInfo({
        ...initialState,
        releseDate: initialState.releseDate.split("T")[0],
        poster: null,
      });
      setSelectedPosterForUI(initialState.poster);
    }
  }, [initialState]);

  const {
    title,
    overView,
    team,
    tags,
    genres,
    type,
    language,
    status,
    releseDate,
  } = courseInfo;

  
  /**************************************************************************************/
  /**************************************************************************************/

  return (
    <>
      <div className="flex space-x-3">
        <div className="w-[70%] space-y-5">
          <div>
            <Label htmlFor="title">Title</Label>
            <input
              value={title}
              onChange={handleChange}
              name="title"
              id="title"
              type="text"
              className={
                commonInputClasses + "border-b-2 font-semibold text-xl"
              }
              placeholder="Course Name"
            />
          </div>

          <div>
            <Label htmlFor="overView">Over View</Label>
            <textarea
              value={overView}
              onChange={handleChange}
              name="overView"
              id="overView"
              className={commonInputClasses + " border-b-2 resize-none h-16"}
              placeholder="Course Overview..."
            ></textarea>
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <TagsInput value={tags} name="tags" onChange={updateTags} />
          </div>

          <DonorSelector onSelect={updateDonor} />

          <div>
            <div className="flex justify-between">
              <LabelWithBadge badge={team.length}>Add Team</LabelWithBadge>

              <ViewAllBtn onClick={displayTeamModal} visible={team.length}>
                
                View All
              </ViewAllBtn>
            </div>

            <TeamForm onSubmit={updateTeam} />
          </div>

          <input
            type="date"
            className={commonInputClasses + " border-2 rounded p-1 w-auto"}
            onChange={handleChange}
            name="releseDate"
            value={releseDate}
          />

          <Submit
            busy={busy}
            value={btnTitle}
            onClick={handleSubmit}
            type="button"
          />
        </div>
        <div className="w-[30%] space-y-5">
          <PosterSelector
            name="poster"
            onChange={handleChange}
            selectedPoster={selectedPosterForUI}
            accept="image/jpg, image/jpeg, image/png"
            lable="Select Poster "
          />
          <GenresSelector badge={genres.length} onClick={displayGenresModal} />

          <Selector
            onChange={handleChange}
            name="type"
            value={type}
            options={typeOptions}
            label="Type"
          />
          <Selector
            onChange={handleChange}
            name="language"
            value={language}
            options={languageOptions}
            label="Language"
          />
          <Selector
            onChange={handleChange}
            name="status"
            value={status}
            options={statusOptions}
            label="Status"
          />
        </div>
      </div>

      <TeamModal
        onClose={hideTeamModal}
        teams={team}
        visible={showTeamModal}
        onRemoveClick={handleTeamRemove}
      />
      <GenresModal
        onSubmit={updateGenres}
        visible={showGenresModal}
        onClose={hideGenresModal}
        previousSelection={genres}
      />
    </>
  );
}
