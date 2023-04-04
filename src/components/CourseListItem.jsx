import React, { useState } from "react";
import { BsTrash, BsPencilSquare, BsBoxArrowUpRight } from "react-icons/bs";
import { deleteCourse } from "../api/course";
import { useNotification } from "../hooks";
import { getPoster } from "../utils/helper";
import ConfirmModal from "./modals/ConfirmModal";
import UpdateCourse from "./modals/UpdateCourse";

const CourseListItem = ({ course, afterDelete, afterUpdate }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const { updateNotification } = useNotification();

  const handleOnDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteCourse(course.id);
    setBusy(false);

    if (error) return updateNotification("error", error);

    hideConfirmModal();
    updateNotification("success", message);
    afterDelete(course);
  };

  const handleOnEditClick = () => {
    setShowUpdateModal(true);
    setSelectedCourseId(course.id);
  };

  const handleOnUpdate = (course) => {
    afterUpdate(course);
    setShowUpdateModal(false);
    setSelectedCourseId(null);
  };

  const displayConfirmModal = () => setShowConfirmModal(true);
  const hideConfirmModal = () => setShowConfirmModal(false);

  return (
    <>
      <CourseCard
        course={course}
        onDeleteClick={displayConfirmModal}
        onEditClick={handleOnEditClick}
      />
      <div className="p-0">
        <ConfirmModal
          visible={showConfirmModal}
          onConfirm={handleOnDeleteConfirm}
          onCancel={hideConfirmModal}
          title="Are you sure?"
          subtitle="This action will remove this course permanently!"
          busy={busy}
        />
        <UpdateCourse
          courseId={selectedCourseId}
          visible={showUpdateModal}
          onSuccess={handleOnUpdate}
        />
      </div>
    </>
  );
};

const CourseCard = ({ course, onDeleteClick, onEditClick, onOpenClick }) => {
  const { poster, title, responsivePosters, genres = [], status } = course;
  return (
    <table className="w-full border-b ">
      <tbody >
        <tr>
          <td>
            <div className="w-24">
              <img
                className="w-full aspect-video"
                src={getPoster(responsivePosters) || poster}
                alt={title}
              />
            </div>
          </td>

          <td className="w-full pl-5">
            <div>
              <h1 className="text-lg font-semibold text-primary dark:text-white my-4">
                {title}
              </h1>
              <div className="space-x-1 mb-5">
                {genres.map((g, index) => {
                  return (
                    <span
                      key={g + index}
                      className=" text-primary dark:text-white text-xs"
                    >
                      {g}
                    </span>
                  );
                })}
              </div>
            </div>
          </td>

          <td className="px-5 ">
            <p className="text-primary dark:text-white">{status}</p>
          </td>

          <td>
            <div className="flex items-center space-x-3 text-primary dark:text-white text-lg">
              <button onClick={onDeleteClick} type="button">
                <BsTrash />
              </button>
              <button onClick={onEditClick} type="button">
                <BsPencilSquare />
              </button>
              <button onClick={onOpenClick} type="button">
                <BsBoxArrowUpRight />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CourseListItem;
