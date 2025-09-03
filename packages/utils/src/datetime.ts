import { DateTime, Duration, Effect, Match } from "effect";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/**
 * Formats a DateTime relative to the current time according to the specification:
 * - <1s: "Just now"
 * - 1-59s: "Ns ago"
 * - 1-59m: "Nm ago"
 * - 1-23h: "Nh ago"
 * - 1-30d: "Nd ago"
 * - >24h: "May 30" for current year dates, "Dec 12, 2024" for non-current year dates
 */
export const formatRelativeTime = Effect.fn("formatRelativeTime")(function* (
  target: DateTime.DateTime,
) {
  // Get current time
  const now = yield* DateTime.now;
  const delta = DateTime.distance(now, target);

  return Match.value(delta).pipe(
    // Less than 1 second
    Match.when(Duration.lessThan(Duration.seconds(1)), () => {
      return "Just now";
    }),
    // 1-59 seconds
    Match.when(Duration.lessThan(Duration.minutes(1)), (d) => {
      const seconds = Math.floor(Duration.toMillis(d) / 1000);
      return `${seconds}s ago`;
    }),
    // 1-59 minutes
    Match.when(Duration.lessThan(Duration.hours(1)), (d) => {
      const minutes = Math.floor(Duration.toMillis(d) / (1000 * 60));
      return `${minutes}m ago`;
    }),
    // 1-23 hours
    Match.when(Duration.lessThan(Duration.hours(24)), (d) => {
      const hours = Math.floor(Duration.toMillis(d) / (1000 * 60 * 60));
      return `${hours}h ago`;
    }),
    Match.when(Duration.lessThan("24 day"), (d) => {
      const hours = Math.floor(Duration.toMillis(d) / (1000 * 60 * 60));
      return `${hours}h ago`;
    }),
    // More than 24 hours - format as date
    Match.orElse(() => {
      const targetParts = DateTime.toPartsUtc(target);
      const currentParts = DateTime.toPartsUtc(now);

      const month = MONTHS[targetParts.month - 1]; // months are 1-indexed

      // Same year - show "May 30" format
      if (targetParts.year === currentParts.year) {
        return `${month} ${targetParts.day}`;
      }

      // Different year - show "Dec 12, 2024" format
      return `${month} ${targetParts.day}, ${targetParts.year}`;
    }),
  );
});
