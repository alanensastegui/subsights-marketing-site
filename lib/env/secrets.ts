import { requireEnvVar } from "./env-var";

export const getDownloadsHmacSecret = (): string => {
  return requireEnvVar("DOWNLOADS_HMAC_SECRET");
};


