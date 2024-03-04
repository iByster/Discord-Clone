"use client";
import { useEffect, useState } from "react";
import CreateServer from "@/components/modals/create-server-modal";
import InvitePeople from "@/components/modals/invite-people-modal";
import EditServer from "@/components/modals/edit-server-modal";
import ManageMembers from "../modals/manage-members-modal";
import CreateChannel from "../modals/create-channel-modal";

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
      <CreateChannel />
      <EditServer />
      <CreateServer />
      <InvitePeople />
      <ManageMembers />
    </>
  );
};
