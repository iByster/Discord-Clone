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

export default function LeaveServer() {
  const router = useRouter();
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const isModalOpen = isOpen && type === "leaveServer";
  const { server } = data;
  const [isLoading, setIsLoading] = useState(false);

  const handleYes = async () => {
    try {
      setIsLoading(true);
      const url = `/api/servers/${server?.id}/leave`;
      await axios.patch(url);
      router.refresh();
      onClose();
      toast.success("Have a nice day!");
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
            Leave the server 🚶‍♀️
          </DialogTitle>
          <DialogDescription>
            Are you sure you wanna{" "}
            <span className="font-bold uppercase underline text-purple-800">
              {server?.name}
            </span>{" "}
            leave so soon?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 flex items-center justify-center gap-x-4 py-4 border-t-2">
          <Button
            className="px-8"
            variant={"ghost"}
            onClick={handleNo}
            disabled={isLoading}
          >
            No
          </Button>
          <Button
            className="px-8"
            variant={"primary"}
            onClick={handleYes}
            disabled={isLoading}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
