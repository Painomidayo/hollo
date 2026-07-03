import { describe, expect, it } from "vitest";

import { fetchPreviewCard } from "./previewcard";

describe("fetchPreviewCard", () => {
  it("rejects private/loopback addresses without fetching", async () => {
    expect.assertions(4);
    await expect(fetchPreviewCard("http://127.0.0.1/")).resolves.toBeNull();
    await expect(fetchPreviewCard("http://localhost/")).resolves.toBeNull();
    await expect(
      fetchPreviewCard("http://169.254.169.254/latest/meta-data/"),
    ).resolves.toBeNull();
    await expect(fetchPreviewCard("http://10.0.0.1/")).resolves.toBeNull();
  });

  it("rejects non-http(s) schemes", async () => {
    expect.assertions(2);
    await expect(fetchPreviewCard("file:///etc/passwd")).resolves.toBeNull();
    await expect(fetchPreviewCard("gopher://example.com/")).resolves.toBeNull();
  });

  it("rejects malformed URLs", async () => {
    expect.assertions(1);
    await expect(fetchPreviewCard("not a url")).resolves.toBeNull();
  });
});
