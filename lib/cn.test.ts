import { describe, expect, it } from "vitest"

import { cn } from "./cn"

describe("cn", () => {
  it("merges multiple class names", () => {
    expect(cn("foo", "bar", "baz")).toBe("foo bar baz")
  })

  it("filters out falsy values", () => {
    expect(cn("foo", false, undefined, null, 0, "", "bar")).toBe("foo bar")
  })

  it("merges conditional class names from objects", () => {
    expect(cn("foo", { bar: true, baz: false, qux: 1 })).toBe("foo bar qux")
  })

  it("resolves conflicting Tailwind classes using twMerge", () => {
    expect(cn("px-2", "px-4")).toBe("px-4")
    expect(cn("text-left", "text-center")).toBe("text-center")
  })
})

