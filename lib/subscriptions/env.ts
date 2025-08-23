import type { Environment } from "./types";

export const getEnvironment = (): Environment => {
  const explicit = process.env.NEXT_PUBLIC_ENV as Environment | undefined;
  if (explicit === "development" || explicit === "preview" || explicit === "production") {
    return explicit;
  }
  switch (process.env.NODE_ENV) {
    case "development":
      return "development";
    case "production":
      return "production";
    default:
      return "preview";
  }
};


