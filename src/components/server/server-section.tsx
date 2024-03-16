"use client";
import { ServerWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import React from "react";
import ActionTooltip from "@/components/action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface IServerSection {
  label: string;
  memberRole?: MemberRole;
  channelType?: ChannelType;
  sectionType: "channels" | "members";
  server?: ServerWithMembersWithProfiles;
}

export default function ServerSection({
  label,
  memberRole,
  channelType,
  sectionType,
  server,
}: IServerSection) {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between py-2">
      <div className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </div>
      {memberRole !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip side="top" label={`Create ${channelType} channel`}>
          <button
            onClick={() => onOpen("createChannel", { server, channelType })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </ActionTooltip>
      )}
      {memberRole !== MemberRole.GUEST && sectionType === "members" && (
        <ActionTooltip side="top" label={`Manage members`}>
          <button
            onClick={() => onOpen("manageMembers", { server })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Settings className="w-4 h-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
}
