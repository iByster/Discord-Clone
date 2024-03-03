"use client";
import Image from "next/image";
import React from "react";
import ActionTooltip from "../action-tooltip";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";

interface INavigationItem {
  name: string;
  imageUrl: string;
  id: string;
}

export default function NavigationItem({
  id,
  name,
  imageUrl,
}: INavigationItem) {
  const params = useParams();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip label={name} side="right" align="center">
      <button
        onClick={handleClick}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            "absolute left-0 w-[4px] rounded-full bg-primary transition-all",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[4px]"
          )}
        ></div>
        <div
          className={cn(
            "mx-4 w-[54px] h-[54px] group flex relative rounded-[27px] group-hover:rounded-[16px] overflow-hidden transition-all",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image src={imageUrl} alt={name} fill />
        </div>
      </button>
    </ActionTooltip>
  );
}
