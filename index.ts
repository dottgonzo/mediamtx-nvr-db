import type { ConnectOptions } from "mongoose";

import initMongo from "nodemongooselib";
import NVRs from "./db/NVRs";

export let db: {
  NVRs: typeof NVRs;
};

export async function initDb(config: {
  uri?: string;
  options?: ConnectOptions;
}) {
  await initMongo(config);
  if (!db)
    db = {
      NVRs: NVRs,
    };
}
