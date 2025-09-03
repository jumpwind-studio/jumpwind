import { describe, expect, it } from "@effect/vitest";
import { DateTime, Effect, Exit, TestClock } from "effect";
import { formatRelativeTime } from "./datetime.js";

const expectRelativeTime = (
  testDateTime: DateTime.DateTime.Input,
  expected: string,
  currentTime = "2024-05-15T12:00:00.000Z",
) =>
  Effect.gen(function* () {
    const currentTimeMs = DateTime.unsafeMake(currentTime);
    yield* TestClock.setTime(currentTimeMs);

    const testTime = DateTime.unsafeMake(testDateTime);
    const result = yield* Effect.exit(formatRelativeTime(testTime));
    expect(result).toStrictEqual(Exit.succeed(expected));
  });

describe("formatRelativeTime", () => {
  it.effect("formats times less than 1 second as 'Just now'", () =>
    expectRelativeTime("2024-05-15T11:59:59.500Z", "Just now"),
  );

  it.effect("formats future times as 'Just now'", () =>
    expectRelativeTime("2024-05-15T12:00:30.000Z", "Just now"),
  );

  it.effect("formats 5 seconds ago correctly", () =>
    expectRelativeTime("2024-05-15T11:59:55.000Z", "5s ago"),
  );

  it.effect("formats 59 seconds ago correctly", () =>
    expectRelativeTime("2024-05-15T11:59:01.000Z", "59s ago"),
  );

  it.effect("formats 1 minute ago correctly", () =>
    expectRelativeTime("2024-05-15T11:59:00.000Z", "1m ago"),
  );

  it.effect("formats 30 minutes ago correctly", () =>
    expectRelativeTime("2024-05-15T11:30:00.000Z", "30m ago"),
  );

  it.effect("formats 59 minutes ago correctly", () =>
    expectRelativeTime("2024-05-15T11:01:00.000Z", "59m ago"),
  );

  it.effect("formats 1 hour ago correctly", () =>
    expectRelativeTime("2024-05-15T11:00:00.000Z", "1h ago"),
  );

  it.effect("formats 12 hours ago correctly", () =>
    expectRelativeTime("2024-05-15T00:00:00.000Z", "12h ago"),
  );

  it.effect("formats 23 hours ago correctly", () =>
    expectRelativeTime("2024-05-14T13:00:00.000Z", "23h ago"),
  );

  it.effect("formats 25 hours ago (same year) as date", () =>
    expectRelativeTime("2024-05-14T11:00:00.000Z", "May 14"),
  );

  it.effect("formats date from different year correctly", () =>
    expectRelativeTime("2023-12-25T12:00:00.000Z", "Dec 25, 2023"),
  );

  it.effect("formats January date correctly", () =>
    expectRelativeTime("2024-01-30T12:00:00.000Z", "Jan 30"),
  );
});
