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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import FileUpload from "../file-upload";

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Server name must be at least 3 characters",
    })
    .max(30, {
      message: "Server name cannot exceed 30 characters",
    }),
  imageUrl: z.string().min(1, {
    message: "Server image is required",
  }),
});

export default function InvitePeople() {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === "invitePeople";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-3xl mb-4">
            Invite friends to the server! 🐥
          </DialogTitle>
          <DialogDescription className="text-center">
            Give your server a personality with a name and an image. You can
            always come back to change it!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
