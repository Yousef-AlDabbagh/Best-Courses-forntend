import React, { useState } from "react";
import { updateInstructor } from "../../api/instructor";
import { useNotification } from "../../hooks";
import InstructorForm from "../form/InstructorForm";
import ModalContainer from "./ModalContainer";

export default function UpdateInstructor({
  visible,
  initialState,
  onSuccess,
  onClose,
}) {
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, instructor } = await updateInstructor(initialState.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);

    onSuccess(instructor);
    updateNotification("success", "Instructor updated successfully.");
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <InstructorForm
        onSubmit={!busy ? handleSubmit : null}
        title="Update Instructor"
        btnTitle="Update"
        busy={busy}
        initialState={initialState}
      />
    </ModalContainer>
  );
}
