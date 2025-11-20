import * as Schema from "effect/Schema";

export type Page = typeof Page.Type;

export const Page = Schema.Number.pipe(
  Schema.int(),
  Schema.greaterThanOrEqualTo(1),
  Schema.brand("Page"),
).annotations({ identifier: "Page" });

// Schema.propertySignature,
// Schema.withConstructorDefault(() => Brand.nominal<Page>()(1)),

export const PageFromString = Schema.compose(Schema.NumberFromString, Page);

interface PaginatedResult<A> {
  data: A[];
  pagination: {
    currentPage: Page;
    totalPages: number;
    totalItems: number;
    limit: number;
    hasMore: boolean;
    previousPage: Page | undefined;
    nextPage: Page | undefined;
  };
}
