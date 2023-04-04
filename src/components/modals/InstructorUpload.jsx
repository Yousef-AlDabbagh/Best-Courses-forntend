import React, { useState } from "react";
import { createInstructor } from "../../api/instructor";
import { useNotification } from "../../hooks";
import InstructorForm from "../form/InstructorForm";
import ModalContainer from "./ModalContainer";

export default function InstructorUpload({ visible, onClose }) {
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error } = await createInstructor(data);
    
    setBusy(false);
    if (error) return updateNotification("error", error);

    updateNotification("success", "Instructor created successfully.");
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <InstructorForm
        onSubmit={!busy ? handleSubmit : null}
        title="Create New Instructor"
        btnTitle="Create"
        busy={busy}
      />
    </ModalContainer>
  );
}
