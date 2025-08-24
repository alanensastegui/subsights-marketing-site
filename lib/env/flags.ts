import { RUNTIME } from "./runtime";

export const isPreview = RUNTIME === "preview";
export const isProd = RUNTIME === "prod";
export const isDevelopment = RUNTIME === "development";
