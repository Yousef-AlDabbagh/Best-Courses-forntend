import React, { useState, useEffect } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import {
  getInstructors,
  deleteInstructor,
  searchInstructor,
} from "../../api/instructor";
import { useNotification, useSearch } from "../../hooks";
import NextAndPrevButton from "../NextAndPrevButton";
import AppSearchForm from "../form/AppSearchForm";
import ConfirmModal from "../modals/ConfirmModal";
import UpdateInstructor from "../modals/UpdateInstructor";
import NotFoundText from "../NotFoundText";

let currentPageNo = 0;
const limit =5 ;

export default function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const [results, setResults] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [busy, setBusy] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const { updateNotification } = useNotification();

  const { handleSearch, resetSearch, resultNotFound } = useSearch();
  const fetchInstructors = async (pageNo) => {
    const { profiles, error } = await getInstructors(pageNo, limit);
    if (error) return updateNotification("error", error);

    if (!profiles.length) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }

    setInstructors([...profiles]);
  };

  const handleOnNextClick = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchInstructors(currentPageNo);
  };

  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);

    currentPageNo -= 1;
    fetchInstructors(currentPageNo);
  };

  const handleOnEditClick = (profile) => {
    setShowUpdateModal(true);
    setSelectedProfile(profile);
  };

  const hideUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleOnSearchSubmit = (value) => {
    handleSearch(searchInstructor, value, setResults);
  };

  const handleSearchFormReset = () => {
    resetSearch();
    setResults([]);
  };

  const handleOnInstructorUpdate = (profile) => {
    const updatedInstructors = instructors.map((instructor) => {
      if (profile.id === instructor.id) {
        return profile;
      }

      return instructor;
    });

    setInstructors([...updatedInstructors]);
  };

  const handleOnDeleteClick = (profile) => {
    setSelectedProfile(profile);
    setShowConfirmModal(true);
  };

  const handleOnDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteInstructor(selectedProfile.id);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    hideConfirmModal();
    fetchInstructors(currentPageNo);
  };

  const hideConfirmModal = () => setShowConfirmModal(false);

  useEffect(() => {
    fetchInstructors(currentPageNo);
  }, []);

  return (
    <>
      <div className="p-5">
        <div className="flex justify-end mb-5">
          <AppSearchForm
            onReset={handleSearchFormReset}
            onSubmit={handleOnSearchSubmit}
            placeholder="Search Instructors.."
            showResetIcon={results.length || resultNotFound}
          />
        </div>
        <NotFoundText text="Record not found" visible={resultNotFound} />

        <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 p-5">
          {results.length || resultNotFound
            ? results.map((instructor) => (
                <InstructorProfile
                  profile={instructor}
                  key={instructor.id}
                  onEditClick={() => handleOnEditClick(instructor)}
                  onDeleteClick={() => handleOnDeleteClick(instructor)}
                />
              ))
            : instructors.map((instructor) => (
                <InstructorProfile
                  profile={instructor}
                  key={instructor.id}
                  onEditClick={() => handleOnEditClick(instructor)}
                  onDeleteClick={() => handleOnDeleteClick(instructor)}
                />
              ))}
        </div>

        {!results.length && !resultNotFound ? (
          <NextAndPrevButton
            className="mt-5"
            onNextClick={handleOnNextClick}
            onPrevClick={handleOnPrevClick}
          />
        ) : null}
      </div>

      <ConfirmModal
        title="Are you sure?"
        subtitle="This action will remove this profile permanently!"
        visible={showConfirmModal}
        busy={busy}
        onConfirm={handleOnDeleteConfirm}
        onCancel={hideConfirmModal}
      />

      <UpdateInstructor
        visible={showUpdateModal}
        onClose={hideUpdateModal} 
        initialState={selectedProfile}
        onSuccess={handleOnInstructorUpdate}
      />
    </>
  );
}

const InstructorProfile = ({ profile, onEditClick, onDeleteClick }) => {
  const [showOptions, setShowOptions] = useState(false);
  const acceptedNameLength = 15;
  const handleOnMouseEnter = () => {
    setShowOptions(true);
  };

  const handleOnMouseLeave = () => {
    setShowOptions(false);
  };

  if (!profile) return null;

  const getName = (name) => {
    if (name.length <= acceptedNameLength) return name;

    return name.substring(0, acceptedNameLength) + "..";
  };

  const { name, avatar, about = "" } = profile;

  return (
    <div className="bg-white shadow dark:shadow dark:bg-secondary rounded h-20 overflow-hidden">
      <div
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className="flex cursor-pointer relative"
      >
        <img
          src={avatar}
          alt={name}
          className="w-20 aspect-square object-cover"
        />

        <div className="px-2">
          <h1
            className="text-xl text-primary dark:text-white font-semibold
         whitespace-nowrap "
          >
            {getName(name)}
          </h1>
          <p className="text-primary dark:text-white opacity-70">
            {about.substring(0, 50)}
          </p>
        </div>

        <Options
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          visible={showOptions}
        />
      </div>
    </div>
  );
};

const Options = ({ visible, onDeleteClick, onEditClick }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm flex justify-center items-center space-x-5">
      <button
        onClick={onDeleteClick}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsTrash />
      </button>
      <button
        onClick={onEditClick}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsPencilSquare />
      </button>
    </div>
  );
};
