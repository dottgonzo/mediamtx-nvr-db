import type { ConnectOptions } from "mongoose";

import initMongo from "nodemongooselib";
import mediaedges from "./db/mediaedges";

export let db: {
  mediaedges: typeof mediaedges;
};

export async function initDb(config: {
  uri?: string;
  options?: ConnectOptions;
}) {
  await initMongo(config);
  if (!db)
    db = {
      mediaedges: mediaedges,
    };
}
