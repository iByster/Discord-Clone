import { Hash } from "lucide-react";
import MobileToggle from "../mobile-toggle";

interface IChatHeader {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

export default function ChatHeader({
  name,
  serverId,
  type,
  imageUrl,
}: IChatHeader) {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="w-5 h-5 mr-2 text-zinc-500 dark:text-zinc-400" />
      )}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
    </div>
  );
}
