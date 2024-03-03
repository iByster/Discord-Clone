import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const profile = await currentProfile();

    if (!profile) {
      return new Response("No access", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        inviteCode: uuidv4(),
        name: data.name,
        imageUrl: data.imageUrl,
        channels: {
          create: [
            {
              name: "General",
              type: "AUDIO",
              profileId: profile.id,
            },
            {
              name: "general",
              type: "TEXT",
              profileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              memberRole: MemberRole.ADMIN,
            },
          ],
        },
      },
    });
    return Response.json(server);
  } catch (err) {
    console.log("[SERVERS_POST]", err);
    return new Response("Internal Error", { status: 500 });
  }
}
