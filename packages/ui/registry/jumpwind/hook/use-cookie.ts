import { type CookieSerializeOptions, parse, serialize } from "cookie-es";
import { isServer } from "solid-js/web";

export function useCookie(name: string) {
  const cookie = () => {
    if (isServer) return undefined;
    const parsed = parse(document.cookie, { filter: (key) => name === key });
    return parsed[name];
  };

  const setCookie = (value: string, options?: CookieSerializeOptions): void => {
    if (isServer) return;
    const serialized = serialize(name, value, options);
    document.cookie = serialized;
  };

  return [cookie, setCookie] as const;
}
