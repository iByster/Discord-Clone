import InitialModal from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initiateProfile } from "@/lib/initial-setup";
import { redirect } from "next/navigation";

export default async function Home() {
  const profile = await initiateProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    redirect(`/servers/${server.id}`);
  }

  return (
    <>
      <InitialModal />
    </>
  );
}
