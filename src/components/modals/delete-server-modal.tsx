"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteServer() {
  const router = useRouter();
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const isModalOpen = isOpen && type === "deleteServer";
  const { server } = data;
  const [isLoading, setIsLoading] = useState(false);

  const handleYes = async () => {
    try {
      setIsLoading(true);
      const url = `/api/servers/${server?.id}`;
      await axios.delete(url);
      toast.success("Have a nice day!");
      onClose();
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNo = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-3xl mb-4">
            Delete server 💀💀
          </DialogTitle>
          <DialogDescription>
            <p>
              Are you sure you want to delete{" "}
              <span className="font-bold uppercase underline text-purple-800">
                {server?.name}
              </span>
              ?
            </p>
            <br />
            <p className="text-rose-500 font-semibold">
              All the server data including members, channels and messages will
              be permanently deleted!
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-8 flex items-center justify-center gap-x-4">
          <Button
            className="px-8"
            variant={"ghost"}
            onClick={handleNo}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            className="px-8"
            variant={"primary"}
            onClick={handleYes}
            disabled={isLoading}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
