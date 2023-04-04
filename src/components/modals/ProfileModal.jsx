import React, { useEffect, useState } from "react";
import { getInstructorProfile } from "../../api/instructor";
import { useNotification } from "../../hooks";
import ModalContainer from "./ModalContainer";

export default function ProfileModal({ visible, profileId, onClose }) {
  const [profile, setProfile] = useState({});
  const { updateNotification } = useNotification();

  const fetchInstructorProfile = async () => {
    const { error, instructor } = await getInstructorProfile(profileId);
    if (error) return updateNotification("erroe", error);

    setProfile(instructor);
  };

  useEffect(() => {
    if (profileId) fetchInstructorProfile();
  }, [profileId]);

  const { avatar, name, about } = profile;
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <div className="w-72 p-5 rounded flex flex-col items-center bg-white dark:bg-primary space-y-3">
        <img className="w-28 h-28 rounded-full" src={avatar} alt="" />
        <h1 className="dark:text-white text-primary font-semibold">{name}</h1>
        <p className="dark:text-dark-subtle text-light-subtle">{about}</p>
      </div>
    </ModalContainer>
  );
}
