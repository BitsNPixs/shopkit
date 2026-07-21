// Tiny classNames joiner. Falsy entries are dropped so conditional classes read
// cleanly: cx(cls.btn, size && cls.btnSize[size], className).
export type ClassValue = string | false | null | undefined;

export function cx(...parts: ClassValue[]): string {
  let out = "";
  for (const part of parts) {
    if (!part) continue;
    out = out ? `${out} ${part}` : part;
  }
  return out;
}
