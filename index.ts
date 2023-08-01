import type { ConnectOptions } from "mongoose";

import initMongo from "nodemongooselib";
import mediaedges from "./db/mediaedges";
import mediamanagers from "./db/mediamanagers";
import members from "./db/members";
export let db: {
  mediaedges: typeof mediaedges;
  members: typeof members;
  mediamanagers: typeof mediamanagers;
};

export async function initDb(config: {
  uri?: string;
  options?: ConnectOptions;
}) {
  await initMongo(config);
  if (!db)
    db = {
      mediaedges,
      members,
      mediamanagers,
    };
}
