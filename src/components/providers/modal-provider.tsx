"use client";
import { useEffect, useState } from "react";
import CreateServer from "../modals/create-server-modal";
import InvitePeople from "../modals/invite-people-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServer />
      <InvitePeople />
    </>
  );
};
