import { BigDecimal as BD, DateTime, Schema } from "effect";

export const BigDecimal = Schema.declare(BD.isBigDecimal);

export const BigDecimalFromNumber = Schema.Number.pipe(
  Schema.transform(BigDecimal, {
    decode: BD.unsafeFromNumber,
    encode: BD.unsafeToNumber,
  }),
);

export const DateTimeZoned = Schema.declare(
  (u) => DateTime.isDateTime(u) && DateTime.isZoned(u),
);

export const DateTimeZonedFromString = Schema.String.pipe(
  Schema.transform(DateTimeZoned, {
    decode: DateTime.unsafeMakeZoned,
    encode: DateTime.formatIsoZoned,
  }),
);
