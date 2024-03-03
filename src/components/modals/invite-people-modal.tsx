"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useModal } from "@/hooks/use-modal-store";
import useOrigin from "@/hooks/use-origin";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function InvitePeople() {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const origin = useOrigin();
  const isModalOpen = isOpen && type === "invitePeople";
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const onNew = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );
      onOpen("invitePeople", { server: response.data });
    } catch (error) {
      toast.error("Someting went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-3xl mb-4">
            Invite friends to the server! 🐥
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={loading}
              className="bg-zinc-300/50 dark:bg-zinc-800 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button onClick={onCopy} disabled={loading} size="icon">
              {copied ? (
                <Check className="h-4 w-4" color="green" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            variant="link"
            size="sm"
            className="text-sm text-zinc-500 mt-4"
            disabled={loading}
            onClick={onNew}
          >
            Generate a new link
            <RefreshCcw
              className={cn("w-4 h-4 ml-2", loading && "animate-spin")}
            />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
