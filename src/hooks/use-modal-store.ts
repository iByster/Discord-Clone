import { Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createServer"
  | "initial"
  | "invitePeople"
  | "editServer"
  | "manageMembers"
  | "createChannel"
  | "leaveServer"
  | "deleteServer";

interface ModalData {
  server?: Server;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onClose: () => set({ isOpen: false, type: null }),
  onOpen: (type: ModalType, data = {}) => set({ type, isOpen: true, data }),
}));
