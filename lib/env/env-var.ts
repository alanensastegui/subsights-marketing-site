import { isProd } from "./flags";

export const getEnvVar = (name: string): string | undefined => {
  return process.env[name];
};

export const requireEnvVar = (name: string /*, opts?: { redact?: boolean }*/): string => {
  const value = process.env[name];
  if (!value) {
    const msg = `Missing required env var: ${name}`;
    if (isProd) {
      throw new Error(msg);
    } else {
      console.warn(msg);
      return "";
    }
  }
  return value;
};
