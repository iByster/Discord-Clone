import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import { NavigationAction } from "./navigation-action";
import { Separator } from "@/components/ui/separator";
import NavigationItem from "./navigation-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "../ui/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default async function NavigationSidebar() {
  const profile = await currentProfile();

  if (!profile) {
    redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full bg-zinc-300 dark:bg-[#121213] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-400 dark:bg-zinc-700 rounded-md w-14 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox:
                "h-[54px] w-[54px] hover:rounded-[16px] transition-all",
            },
          }}
        />
      </div>
    </div>
  );
}
