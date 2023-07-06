import type { ConnectOptions } from "mongoose";

import initMongo from "nodemongooselib";
import MediaEdges from "./db/MediaEdges";

export let db: {
  MediaEdges: typeof MediaEdges;
};

export async function initDb(config: {
  uri?: string;
  options?: ConnectOptions;
}) {
  await initMongo(config);
  if (!db)
    db = {
      MediaEdges: MediaEdges,
    };
}
