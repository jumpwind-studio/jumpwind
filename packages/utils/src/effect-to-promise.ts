import { Cause, type Effect, Exit, Runtime } from "effect";

const PromiseSettledResult = {
  /**
   * Creates a fulfilled 'PromiseSettledResult.
   */
  succeed<A>(value: A): Promise<PromiseSettledResult<A>> {
    return Promise.resolve({ status: "fulfilled", value });
  },
  /**
   * Creates a rejected 'PromiseSettledResult.
   */
  fail(reason: unknown): Promise<PromiseRejectedResult> {
    return Promise.resolve({ status: "rejected", reason });
  },
};

/**
 * Converts an Effect into a 'PromiseSettledResult'.
 * Runs the provided Effect using the given runtime and converts the result
 * into a settled promise result. If the effect succeeds, it returns a fulfilled
 * result. If it fails, the error is squashed and returned as a rejected result.
 */
export function effectToPromiseSettledResult<R>(
  runtime: Runtime.Runtime<R>,
  options?: { readonly signal?: AbortSignal | undefined },
) {
  return async <A>(
    effect: Effect.Effect<A>,
    overrideOptions?: { readonly signal?: AbortSignal | undefined },
  ): Promise<PromiseSettledResult<A>> => {
    return Runtime.runPromiseExit(runtime, effect, {
      ...options,
      ...overrideOptions,
    }).then((exit) =>
      Exit.isSuccess(exit)
        ? PromiseSettledResult.succeed<A>(exit.value)
        : PromiseSettledResult.fail(Cause.squash(exit.cause)),
    );
  };
}
