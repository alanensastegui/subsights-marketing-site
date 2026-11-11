import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { getFreeTrialUrl } from "./plans";

// Every signup button must use the shared helpers in ./plans. A hand-written
// signup path drifts: app.subsights.com/signup has returned 404 since Sept 2025.
const ROOTS = ["app", "components"];
const SIGNUP_LITERAL = /["'`]([^"'`\n]*\/(?:auth\/)?sign-?up\b[^"'`\n]*)["'`]/gi;

const sourceFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(tsx?|jsx?|mdx)$/.test(name) && !/\.test\./.test(name) ? [path] : [];
  });

const hardcodedSignupLinks = (text: string) =>
  [...text.matchAll(SIGNUP_LITERAL)].map((m) => m[1]);

describe("signup links", () => {
  it("finds hand-written signup paths", () => {
    expect(hardcodedSignupLinks(`href: "https://app.subsights.com/signup" }`)).toEqual([
      "https://app.subsights.com/signup",
    ]);
    expect(hardcodedSignupLinks("href={`${APP_URL}/auth/signup?is_free_trial=true`}")).toHaveLength(1);
    expect(hardcodedSignupLinks(`href: getFreeTrialUrl() }`)).toEqual([]);
    expect(hardcodedSignupLinks(`data-analytics-id="demo_signup"`)).toEqual([]);
  });

  it("the shared free trial link is the app's signup page with the trial price", () => {
    const url = new URL(getFreeTrialUrl());
    expect(url.pathname).toBe("/auth/signup");
    expect(url.searchParams.get("is_free_trial")).toBe("true");
    expect(url.searchParams.get("price_id")).toBeTruthy();
  });

  it("no page or component hand-writes a signup path", () => {
    const found = ROOTS.flatMap((root) =>
      sourceFiles(join(process.cwd(), root)).flatMap((file) =>
        hardcodedSignupLinks(readFileSync(file, "utf8")).map(
          (link) => `${relative(process.cwd(), file)}: ${link}`,
        ),
      ),
    );
    expect(found).toEqual([]);
  });
});
