import type { RuntimeEnvironment } from "./types";

export const getRuntimeEnv = (): RuntimeEnvironment => {
  const explicit = process.env.NEXT_PUBLIC_ENV as RuntimeEnvironment | undefined;
  if (explicit === "development" || explicit === "preview" || explicit === "prod") {
    return explicit;
  }

  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv === "development") return "development";
  if (nodeEnv === "production") return "prod";

  return "preview";
};

export const RUNTIME: RuntimeEnvironment = getRuntimeEnv();
