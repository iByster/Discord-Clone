"use client";
import { useEffect, useState } from "react";
import CreateServer from "@/components/modals/create-server-modal";
import InvitePeople from "@/components/modals/invite-people-modal";
import EditServer from "@/components/modals/edit-server-modal";
import ManageMembers from "../modals/manage-members-modal";
import CreateChannel from "../modals/create-channel-modal";
import LeaveServer from "../modals/leave-server-modal";
import DeleteServer from "../modals/delete-server-modal";
import { EditChannelModal } from "../modals/edit-channel-modal";
import { DeleteChannelModal } from "../modals/delete-channel-modal";

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
      <DeleteChannelModal />
      <EditChannelModal />
      <DeleteServer />
      <LeaveServer />
      <CreateChannel />
      <EditServer />
      <CreateServer />
      <InvitePeople />
      <ManageMembers />
    </>
  );
};
