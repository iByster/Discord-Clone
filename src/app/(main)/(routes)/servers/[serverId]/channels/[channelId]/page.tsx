import ChatHeader from "@/components/chat/chat-header";
import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

interface IChannelIdPage {
  params: {
    channelId: string;
    serverId: string;
  };
}

export default async function ChannelIdPage({
  params: { channelId, serverId },
}: IChannelIdPage) {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId,
      profileId: profile.id,
    },
  });

  if (!member || !channel) {
    redirect("/");
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader name={channel.name} serverId={serverId} type="channel" />
    </div>
  );
}
